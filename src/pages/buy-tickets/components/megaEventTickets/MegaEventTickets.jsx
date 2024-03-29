import { Typography } from "@material-tailwind/react";
import PricingCard from "../PricingCard";
import HackathonCardBody from "./HackathonCardBody";
import PaperPresentationCardBody from "./PaperPresetnationCardBody";

const MegaEventTickets = () => {
  return (
    <div className="my-3">
      <Typography variant="h3" className="my-3">
        Mega Event Passes
      </Typography>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-2 justify-evenly items-center">
        <PricingCard
          title={"Hackathon Pass"}
          price={499}
          checkoutId={"hackathon_pass"}
          cardBody={<HackathonCardBody />}
          available={false}
        />
        <PricingCard
          title={"Paper Presentation Pass"}
          price={499}
          available={false}
          checkoutId={"paper_presentation_pass"}
          cardBody={<PaperPresentationCardBody />}
        />
      </div>
    </div>
  );
};
export default MegaEventTickets;
