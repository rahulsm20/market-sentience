import {
  Bar,
  BarChart,
  Label,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Product {
  productName: string;
  price: string;
  ratingsNumber: number;
  cardURL: string;
  reviews: string[];
  rating: number;
}

interface AnalyticsProps {
  sentiments: string[];
  productData: Product[];
}

/**
 * Analytics component for displaying product data and sentiment analysis.
 * @param props - The props for the component.
 * @param props.sentiments - An array of sentiment strings (e.g., "Positive", "Negative").
 * @param props.productData - An array of product data objects.
 * @returns The rendered component.
 */
const Analytics = ({ sentiments, productData }: AnalyticsProps) => {
  let productsByPrice = productData.map((product) => {
    return {
      name: product.productName,
      price: parseInt(product.price.split(",").join("")),
      ratingsCount: product.ratingsNumber,
      fill: "#0088FE",
    };
  });
  productsByPrice = productsByPrice.sort((a, b) => b.price - a.price);

  let productsByRatingCount = productData.some(
    (product) => product.ratingsNumber
  )
    ? productData.map((product) => {
        return {
          name: product.productName,
          ratingsCount: product.ratingsNumber,
          fill: "#FF8042",
        };
      })
    : [];
  if (productsByRatingCount) {
    productsByRatingCount = productsByRatingCount.sort(
      (a, b) => b.ratingsCount - a.ratingsCount
    );
  }

  const PriceTooltip = ({ ...props }) => {
    if (
      props.active &&
      props.payload &&
      props.payload.length &&
      props.payload[0].payload.name
    ) {
      return (
        <div className="custom-tooltip backdrop-blur-xl text-xs p-2 rounded-xl border max-w-40 gap-3 flex flex-col">
          <p className="desc">
            {`${props.payload[0].payload.name.split("|")[0]}`.length > 40
              ? `${props.payload[0].payload.name.split("|")[0].slice(0, 40)}...`
              : props.payload[0].payload.name.split("|")[0]}
          </p>
          <p className="label">{`${new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "INR",
          }).format(props.payload[0].value)}`}</p>
        </div>
      );
    }

    return null;
  };

  const SentimentTooltip = ({ ...props }) => {
    if (
      props.active &&
      props.payload &&
      props.payload.length &&
      props.payload[0].payload.name
    ) {
      return (
        <div className="custom-tooltip backdrop-blur-xl text-xs p-2 rounded-xl border max-w-40 gap-3 flex flex-col">
          <p className="desc">
            {`${props.payload[0].payload.name.split("|")[0]}`.length > 40
              ? `${props.payload[0].payload.name.split("|")[0].slice(0, 40)}...`
              : props.payload[0].payload.name.split("|")[0]}
          </p>
          <p className="label">{`${props.payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  // const RatingsTooltip = ({ ...props }) => {
  //   if (props.active && props.payload && props.payload.length) {
  //     return (
  //       <div className="custom-tooltip backdrop-blur-xl text-xs p-2 rounded-xl border ">
  //         <p className="label">{`No. of Ratings : ${props.payload[0].value}`}</p>
  //         <p className="desc">{`Name: ${
  //           props.payload[0].payload.name.split("|")[0]
  //         }`}</p>
  //       </div>
  //     );
  //   }

  //   return null;
  // };

  function countSentiments(sentiments: string[]) {
    const counts = [
      { name: "Positive", value: 0, fill: "#0088FE" },
      { name: "Negative", value: 0, fill: "red" },
      { name: "Mediocre", value: 0, fill: "#FF8042" },
    ];

    sentiments.forEach((sentiment) => {
      if (sentiment === "Positive") {
        counts[0].value++;
      } else if (sentiment === "Negative") {
        counts[1].value++;
      } else if (sentiment === "Mediocre") {
        counts[2].value++;
      }
    });

    return counts;
  }
  const renderColorfulLegendText = (value: string) => {
    return <span style={{ fontWeight: 500, padding: "10px" }}>{value}</span>;
  };
  const sentimentCount = countSentiments(sentiments);
  return (
    <div className="flex flex-col gap-3 w-full">
      <h1 className="text-2xl underline-offset-8 underline">Analytics</h1>
      <div className="flex flex-col my-5 gap-5 border p-5">
        <div className="w-full">
          <span>Products by Price</span>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productsByPrice}>
              <Tooltip content={<PriceTooltip />} />
              <Bar dataKey="price" data={productsByPrice} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <p className="flex flex-col gap-2">
            <span>Most Expensive Product in this query</span>
            <span className="flex gap-2">
              <span>Name:</span>
              <span>{productsByPrice[0].name}</span>
            </span>
            <span className="flex gap-2">
              <span>Price:</span>
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "INR",
                }).format(productsByPrice[0].price)}
              </span>
            </span>
          </p>
        </div>
        <div className="flex w-full lg:border-t sm:border-b lg:border-b-0 pt-2 flex-col lg:flex-row gap-2">
          <div className="w-full border-r">
            <span>Composition of Sentiment</span>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart width={100} height={50}>
                <Tooltip content={<SentimentTooltip />} />
                <Legend
                  layout="horizontal"
                  verticalAlign="top"
                  align="center"
                  wrapperStyle={{
                    top: 0,
                    left: 0,
                    padding: 10,
                  }}
                  formatter={renderColorfulLegendText}
                />
                <Label value="Composition of Sentiment" position="top" />
                <Pie
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={0}
                  data={sentimentCount}
                  dataKey={"value"}
                />
              </PieChart>
            </ResponsiveContainer>
            <p>
              <span>Composition by Percentage</span>
              <p className="flex gap-2">
                <span>Positive:</span>
                <span>
                  {(
                    ((sentimentCount[0].value || 0) /
                      (sentimentCount[0].value + sentimentCount[1].value ||
                        1)) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </p>
              <p className="flex gap-2">
                <span>Negative:</span>
                <span>
                  {(
                    ((sentimentCount[1].value || 0) /
                      (sentimentCount[0].value + sentimentCount[1].value ||
                        1)) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </p>
              <p className="flex gap-2">
                <span>Mediocre:</span>
                <span>
                  {(
                    ((sentimentCount[2].value || 0) /
                      (sentimentCount[0].value +
                        sentimentCount[1].value +
                        sentimentCount[2].value || 1)) *
                    100
                  ).toFixed(2)}
                  %
                </span>
              </p>
            </p>
          </div>
          {/* <div className="w-full lg:mt-0 ml-2">
            <span>Products by Rating Count</span>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={productsByRatingCount}>
                <YAxis domain={["auto", "auto"]} />
                <Tooltip content={<RatingsTooltip />} />
                <Bar
                  dataKey="ratingsCount"
                  data={productsByRatingCount}
                  fill="#8884d8"
                />
              </BarChart>
            </ResponsiveContainer>
            <p className="flex flex-col gap-2">
              <span>Product with most ratings in this query</span>
              <span className="flex gap-2">
                <span>Name:</span>
                <span>
                  {productsByRatingCount.length > 0
                    ? productsByRatingCount?.[0].name
                    : "N/A"}
                </span>
              </span>
              <p className="flex gap-2">
                <span>Ratings Count:</span>
                <span>
                  {new Intl.NumberFormat("en-US").format(
                    productsByRatingCount.length > 0
                      ? productsByRatingCount?.[0].ratingsCount
                      : 0
                  )}
                </span>
              </p>
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
