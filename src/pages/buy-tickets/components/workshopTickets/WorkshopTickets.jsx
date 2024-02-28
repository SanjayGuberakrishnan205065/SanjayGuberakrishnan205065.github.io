import { Typography } from "@material-tailwind/react";
import PricingCard from "../PricingCard";
import WorkshopCardBody from "./WorkshopCardBody";
import { useNavigate } from "react-router-dom";

const WorkshopTickets = () => {
  const navigate = useNavigate();
  const handleCardAction = () => {
    navigate("/buy-tickets/workshops");
  };
  return (
    <div>
      <Typography variant="h3" className="my-3">
        Workshop Passes
      </Typography>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-2 justify-evenly items-center">
        <PricingCard
          title="Workshop Passes"
          startingFrom={true}
          price={499}
          cardBody={<WorkshopCardBody />}
          handleCardAction={handleCardAction}
        />
      </div>
    </div>
  );
};
export default WorkshopTickets;
