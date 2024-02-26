import { Typography } from "@material-tailwind/react";
import PricingCard from "../PricingCard";
import WorkshopCardBody from "./WorkshopCardBody";

const WorkshopTickets = () => {
  return (
    <div>
      <Typography variant="h3" className="my-3">
        Workshop Passes
      </Typography>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-2 justify-evenly items-center">
        <PricingCard
          title="Workshop Passes"
          startingFrom={true}
          price={500}
          cardBody={<WorkshopCardBody />}
        />
      </div>
    </div>
  );
};
export default WorkshopTickets;
