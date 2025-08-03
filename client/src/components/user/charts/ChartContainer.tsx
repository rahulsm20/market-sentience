import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const ChartContainer = () => {
  return (
    <div className="flex flex-col w-full shadow-md rounded-lg p-6 gap-5 border">
      <h1 className="text-xl">Chart Title</h1>
      <ResponsiveContainer width="100%" height={400} className="flex-1">
        <BarChart
          data={[
            { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
            { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
          ]}
        >
          <Bar type="monotone" dataKey="uv" stroke="#8884d8" />
          <XAxis dataKey="name" domain={["auto", "auto"]} />
          <YAxis />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ChartContainer;
