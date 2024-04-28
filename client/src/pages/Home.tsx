import Body from "@/components/user/Body";
import Navbar from "@/components/user/Navbar";
// import { RegistrationForm } from "@/components/user/RegistrationForm";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <Body />
      </div>
    </div>
  );
};

export default Home;
