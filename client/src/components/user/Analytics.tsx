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
  ratingsCount: number;
  cardURL: string;
  reviews: string[];
  rating: number;
}

interface AnalyticsProps {
  sentiments: string[];
  productData: Product[];
}
const Analytics = ({ sentiments, productData }: AnalyticsProps) => {
  console.log(productData);
  let productsByPrice = productData.map((product) => {
    return {
      name: product.productName,
      price: parseInt(product.price.split(",").join("")),
      ratingsCount: product.ratingsCount,
      fill: "#0088FE",
    };
  });
  productsByPrice = productsByPrice.sort((a, b) => b.price - a.price);

  let productsByRatingCount = productData.map((product) => {
    return {
      name: product.productName,
      ratingsCount: product.ratingsCount,
      fill: "#FF8042",
    };
  });
  productsByRatingCount = productsByRatingCount.sort(
    (a, b) => b.ratingsCount - a.ratingsCount
  );
  productsByRatingCount = productsByRatingCount.filter(
    (product) => product.ratingsCount
  );

  const PriceTooltip = ({ ...props }) => {
    if (props.active && props.payload && props.payload.length) {
      return (
        <div className="custom-tooltip backdrop-blur-xl text-xs p-2 rounded-xl border ">
          <p className="label">{`Price : ${props.payload[0].value}`}</p>
          <p className="desc">{`Name: ${
            props.payload[0].payload.name.split("|")[0]
          }`}</p>
        </div>
      );
    }

    return null;
  };

  const RatingsTooltip = ({ ...props }) => {
    if (props.active && props.payload && props.payload.length) {
      return (
        <div className="custom-tooltip backdrop-blur-xl text-xs p-2 rounded-xl border ">
          <p className="label">{`No. of Ratings : ${props.payload[0].value}`}</p>
          <p className="desc">{`Name: ${
            props.payload[0].payload.name.split("|")[0]
          }`}</p>
        </div>
      );
    }

    return null;
  };

  console.log(productsByPrice);
  function countSentiments(sentiments: string[]) {
    const counts = [
      { name: "Positive", value: 0, fill: "#0088FE" },
      { name: "Negative", value: 0, fill: "#FF8042" },
    ];

    sentiments.forEach((sentiment) => {
      if (sentiment === "Positive") {
        counts[0].value++;
      } else if (sentiment === "Negative") {
        counts[1].value++;
      }
    });

    return counts;
  }
  const renderColorfulLegendText = (value: string) => {
    return <span style={{ fontWeight: 500, padding: "10px" }}>{value}</span>;
  };
  const sentimentCount = countSentiments(sentiments);
  return (
    <div>
      <h1 className=" text-xl">Analytics</h1>
      <div className="flex flex-col my-5 gap-5">
        <div className="w-full">
          <span>Products by Price</span>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={productsByPrice}>
              <Tooltip content={<PriceTooltip />} />
              <Bar dataKey="price" data={productsByPrice} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <p>
            Most Expensive Product in this query:
            <p>
              Name:
              {/* <a href={productsByPrice[0]?.cardURL}> */}
              {productsByPrice[0].name}
              {/* </a> */}
            </p>
            <p>
              Price:{" "}
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "INR",
              }).format(productsByPrice[0].price)}
            </p>
          </p>
        </div>
        <div className="flex w-full">
          <div className="w-full">
            <span>Composition of Sentiment</span>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart width={100} height={50}>
                <Tooltip cursor={{ stroke: "red", strokeWidth: 2 }} />
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
              Composition by Percentage:
              <p>
                Positive:{" "}
                {(sentimentCount[0].value /
                  (sentimentCount[0].value + sentimentCount[1].value)) *
                  100}
                %
              </p>
              <p>
                Negative:{" "}
                {(sentimentCount[1].value /
                  (sentimentCount[0].value + sentimentCount[1].value)) *
                  100}
                %
              </p>
            </p>
          </div>
          <div className="w-full">
            <span>Products by Rating Count</span>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={productsByRatingCount}>
                <Tooltip content={<RatingsTooltip />} />
                <Bar
                  dataKey="ratingsCount"
                  data={productsByRatingCount}
                  fill="#8884d8"
                />
              </BarChart>
            </ResponsiveContainer>
            <p>
              Product with most ratings in this query:
              <p>Name: {productsByRatingCount[0].name}</p>
              <p>
                Ratings Count:
                {new Intl.NumberFormat("en-US").format(
                  productsByRatingCount[0].ratingsCount
                )}
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
