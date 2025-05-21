const puppeteer = require("puppeteer");
const { Product } = require("../models/product.model");
const { Conversation } = require("../models/conversation.model");

async function handleCookiesPopup(page) {
  const cookiesButton = await page.$("#sp-cc-accept");
  if (cookiesButton) {
    await cookiesButton.click();
  }
}

async function scrapeProducts(req, res) {
  let browser;
  const { company, category, conversationId } = req.query;

  if (!company || !category) {
    return res
      .status(400)
      .json({ error: "Please provide both company and category parameters." });
  }

  const query = `${company.toLowerCase()}+${category}`;
  const items = await Product.find({
    query,
  });

  if (items.length > 0) {
    return res.status(200).json({ products: items, conversationId });
  }

  try {
    if (process.env.NODE_ENV === "development") {
      browser = await puppeteer.launch({
        executablePath: "",
        headless: false,
        defaultViewport: null,
      });
    } else {
      browser = await puppeteer.launch({
        executablePath: process.env.CHROME_BIN || "/usr/bin/chromium-browser",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
    }
    const page = await browser.newPage();

    const searchPhrase = company + " " + category;
    const scrapeToPage = 1;

    const homeUrl = "https://www.amazon.in/gp/cart/view.html";
    await page.goto(homeUrl);

    await handleCookiesPopup(page);
    await page.waitForSelector("#twotabsearchtextbox");
    await page.type("#twotabsearchtextbox", searchPhrase);
    await page.click("#nav-search-submit-button");

    await page.waitForSelector(".s-widget-container");

    const url = page.url();

    const cardData = [];
    const scrapePage = async (url, currentPage = 1, scrapeToPage = null) => {
      // console.log("Scraping page " + currentPage, url, { query });
      if (!url || (scrapeToPage !== null && currentPage > scrapeToPage)) {
        return;
      }
      await page.goto(url);
      // console.log("Navigated to: ", url);
      await handleCookiesPopup(page);

      await page.waitForSelector(".s-widget-container");
      let pageCardData = await page.evaluate((query) => {
        const cards = Array.from(
          document.querySelectorAll(".s-widget-container")
        );

        const cardInfo = cards
          .map((card) => {
            const productName = card.querySelector("h2")?.textContent.trim();

            const anchorTag = card.querySelector(
              "a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style.a-text-normal"
            );
            const cardURL = anchorTag
              ? anchorTag.getAttribute("href").includes("https")
                ? anchorTag.getAttribute("href")
                : "https://www.amazon.in" + anchorTag.getAttribute("href")
              : "N/A";

            const sponsoredTag = card.querySelector(
              ".puis-sponsored-label-text"
            );
            const sponsored = sponsoredTag ? "yes" : "no";

            const badgeElement = card.querySelector("span.a-badge-label-inner");
            const badge = badgeElement ? badgeElement.textContent : "N/A";

            const priceElement = card.querySelector(".a-price .a-offscreen");
            const price = priceElement
              ? priceElement.textContent.split("₹")[1]
              : "N/A";

            const basePriceElement = card.querySelector(
              "span.a-price.a-text-price > span.a-offscreen"
            );
            const basePrice = basePriceElement
              ? basePriceElement.textContent
              : "N/A";

            const ratingElement = card.querySelector(
              ".a-row > span:nth-child(1)[aria-label]"
            );
            const decimalRegex = /^\d+([,.]\d+)?$/;
            const ariaLabel = ratingElement
              ? ratingElement.getAttribute("aria-label")
              : "N/A";
            const firstThreeCharacters = ariaLabel.substring(0, 3);
            const rating = decimalRegex.test(firstThreeCharacters)
              ? firstThreeCharacters.replace(",", ".")
              : "N/A";

            const ratingsNumberElement = card.querySelector(
              ".a-row > span:nth-child(2)[aria-label]"
            );
            const numberRegex = /^-?\d+(\.\d+)?$/;
            const numberFormated = ratingsNumberElement
              ? ratingsNumberElement
                  .getAttribute("aria-label")
                  .replace(/[\s.,]+/g, "")
              : "N/A";
            const ratingsNumber = numberRegex.test(numberFormated)
              ? numberFormated
              : "N/A";

            const boughtPastMonthElement = card.querySelector(
              ".a-row.a-size-base > .a-size-base.a-color-secondary"
            );
            const textContent = boughtPastMonthElement
              ? boughtPastMonthElement.textContent
              : "N/A";
            const plusSignRegex = /\b.*?\+/;
            const plusSignText = textContent.match(plusSignRegex);
            const boughtPastMonth = plusSignRegex.test(plusSignText)
              ? plusSignText[0]
              : "N/A";
            // const query = "${query}";
            if (productName) {
              return {
                cardURL,
                productName,
                sponsored,
                badge,
                price,
                basePrice,
                rating,
                ratingsNumber,
                boughtPastMonth,
                query,
              };
            } else {
              return null;
            }
          })
          .filter((card) => card !== null);

        return cardInfo;
      }, query);
      console.log("outside: ", { company, category });
      pageCardData = pageCardData.filter(
        (card) =>
          card.productName &&
          card.productName.toLowerCase().includes(company.toLowerCase()) &&
          card.cardURL !== "N/A"
      );

      for (const card of pageCardData) {
        if (card.productName.toLowerCase().includes(company.toLowerCase())) {
          await page.goto(card.cardURL);
          try {
            await page.waitForSelector("#acrCustomerReviewText", {
              timeout: 5000,
            });
          } catch (error) {
            console.log(
              "Element #acrCustomerReviewText not found. Moving to the next card."
            );
            continue;
          }
          await page.waitForSelector("span.a-size-base.a-color-base");
          await page.waitForSelector('[data-hook="review-collapsed"]');

          // extract ratings count
          const ratingsCountText = await page.$eval(
            "#acrCustomerReviewText",
            (element) => element.textContent
          );
          card.ratingsCount = parseInt(
            ratingsCountText.split(" ")[0].replace(",", ""),
            10
          );

          // extract rating
          const ratingText = await page.$eval(
            "span.a-size-base.a-color-base",
            (element) => element.textContent
          );
          card.rating = parseFloat(ratingText);

          // Extract reviews
          const reviewElements = await page.$$(
            "div[data-hook='review-collapsed'] > span"
          );
          // // console.log("reviews: ", reviewElements);
          const extractedReviews = [];
          for (const element of reviewElements) {
            const reviewText = await page.evaluate(
              (el) => el.textContent.trim(),
              element
            );
            extractedReviews.push(reviewText);
          }
          card.reviews = extractedReviews;
        }
      }
      cardData.push(...pageCardData);

      if (scrapeToPage === null || currentPage < scrapeToPage) {
        const nextPageButton = await page.$(".s-pagination-next");
        if (nextPageButton) {
          const isDisabled = await page.evaluate(
            (btn) => btn.hasAttribute("aria-disabled"),
            nextPageButton
          );
          if (!isDisabled) {
            const nextPageUrl = encodeURI(
              await page.evaluate((nextBtn) => nextBtn.href, nextPageButton)
            );
            // console.log({ nextPageUrl });
            console.log({ company, category });
            await scrapePage(nextPageUrl, currentPage + 1, scrapeToPage, query);
          } else {
            // // console.log("All available pages scraped:", currentPage);
          }
        } else if (!scrapeToPage || currentPage < scrapeToPage) {
          // // console.log("All available pages scraped:", currentPage);
        }
      }
    };
    await scrapePage(url, 1, scrapeToPage, query);

    for (const product of cardData) {
      try {
        const newProduct = new Product(product);
        await newProduct.save();
      } catch (err) {
        console.log(err);
        return res.status(400).json(err);
      }
    }
    if (cardData.length === 0) {
      return res.status(404).json({ message: "No products found." });
    }
    return res.status(200).json({ products: cardData, conversationId });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err.message || "An error occurred." });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

module.exports = scrapeProducts;
