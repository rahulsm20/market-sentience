import Body from "@/components/user/Body";
import Navbar from "@/components/user/Navbar";
import Sidebar from "@/components/user/Sidebar";

const Home = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-col md:flex-row overflow-hidden">
        <div className="w-64 shrink-0">
          <Sidebar />
        </div>
        <div className="w-full overflow-y-scroll custom-scroll ">
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Home;
