import Layout from "@/components/user/Layout";
import Navbar from "@/components/user/Navbar";

const About = () => {
  return (
    <div>
      <Navbar />
      <Layout>
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold mb-4">About Us</h1>
          <p className="text-lg mb-8">
            Welcome to Market Sentience, your one-stop shop for all your
            marketing analysis needs. Our platform is designed to provide you
            with the tools and insights you need to make informed decisions and
            drive your business forward.
          </p>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg mb-8">
            At Market Sentience, our mission is to empower businesses with
            actionable insights derived from data. We believe that informed
            decisions lead to better outcomes, and we are committed to providing
            you with the best tools to achieve that.
          </p>
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-lg mb-8">
            Our team is composed of experienced professionals from various
            fields, including data science, marketing, and software development.
            We are passionate about what we do and are dedicated to helping you
            succeed.
          </p>
        </div>
      </Layout>
    </div>
  );
};

export default About;
