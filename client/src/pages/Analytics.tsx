import ChartAdder from "@/components/user/ChartAdder";
import ChartContainer from "@/components/user/charts/ChartContainer";
import Navbar from "@/components/user/Navbar";

const Analytics = () => {
  const charts = [
    { id: 1, title: "Chart 1" },
    { id: 2, title: "Chart 2" },
    { id: 3, title: "Chart 3" },
  ];
  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-10 gap-5">
        <div className="flex-1 flex items-center justify-end w-full">
          <ChartAdder />
        </div>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {charts.map((chart) => (
            <ChartContainer key={chart.id} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Analytics;
