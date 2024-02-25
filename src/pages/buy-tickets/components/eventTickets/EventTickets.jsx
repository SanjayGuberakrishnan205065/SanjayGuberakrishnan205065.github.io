import { Typography } from "@material-tailwind/react";
import GeneralCardBody from "./GeneralCardBody";
import NonTechCardBody from "./NonTechCardBody";
import PricingCard from "../PricingCard";
import TechCardBody from "./TechCardBody";

const EventTickets = () => {
  return (
    <div>
      <Typography variant="h3" className="my-3">
        Event Passes
      </Typography>
      <div className="flex gap-2 justify-evenly">
        <PricingCard
          title="Tech Pass"
          price={350}
          cardBody={<TechCardBody />}
        />
        <PricingCard
          title="General Event Pass"
          price={500}
          cardBody={<GeneralCardBody />}
          savings={17}
        />
        <PricingCard
          title="Non-Tech Pass"
          price={250}
          cardBody={<NonTechCardBody />}
        />
      </div>
    </div>
  );
};
export default EventTickets;
