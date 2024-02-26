import { Typography } from "@material-tailwind/react";
import PricingCard from "../PricingCard";
import HackthonCardBody from "./HackthonCardBody";
import PaperPresentationCardBody from "./PaperPresetnationCardBody";

const MegaEventTickets = () => {
  return (
    <div className="my-3">
      <Typography variant="h3" className="my-3">
        Mega Event Passes
      </Typography>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-2 justify-evenly items-center">
        <PricingCard
          title={"Hackthon Pass"}
          price={300}
          cardBody={<HackthonCardBody />}
        />
        <PricingCard
          title={"Paper Presentation Pass"}
          price={300}
          cardBody={<PaperPresentationCardBody />}
        />
      </div>
    </div>
  );
};
export default MegaEventTickets;