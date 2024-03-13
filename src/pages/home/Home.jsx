import AboutEvent from "../../components/home/AboutEvent";
import Faq from "../../components/home/Faq";
import Sponsors from "../../components/home/Sponsors";
import OurStats from "../../components/home/Stats";
import Hero from "../../components/home/Hero";
import Offer from "../../components/home/Offer";
import GoldJubliee from "../../components/home/GoldJubliee";

const Home = () => {
  return (
    <>
      <Hero />
      <Sponsors />
      <GoldJubliee />
      <AboutEvent />
      <OurStats />
      <Faq />
      <Offer />
    </>
  );
};

export default Home;
