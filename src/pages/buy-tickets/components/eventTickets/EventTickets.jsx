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
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-2 justify-evenly items-center">
        <PricingCard
          title="Tech Pass"
          checkoutId="tech_pass"
          price={200}
          cardBody={<TechCardBody />}
        />
        <PricingCard
          title="General Event Pass"
          price={300}
          checkoutId="general_event_pass"
          cardBody={<GeneralCardBody />}
          savings={17}
        />
        <PricingCard
          title="Non-Tech Pass"
          price={150}
          checkoutId="non_tech_pass"
          cardBody={<NonTechCardBody />}
        />
      </div>
    </div>
  );
};
export default EventTickets;
