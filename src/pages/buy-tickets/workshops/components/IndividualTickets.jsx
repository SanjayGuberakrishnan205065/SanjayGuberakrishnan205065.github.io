import { Typography } from "@material-tailwind/react";
import WorkshopCard from "./Workshopcard";

const IndividualTickets = ({ individualTickets }) => {
  return (
    <>
      <Typography variant="h2">Individual Tickets</Typography>
      <div className="flex gap-5 flex-wrap items-center">
        {individualTickets.map((ticket, index) => (
          <WorkshopCard
            key={index}
            title={ticket.ticketName}
            description={ticket.ticketDescription}
            price={ticket.ticketPrice["$numberDecimal"]}
            checkoutId={ticket.checkoutId}
          />
        ))}
      </div>
    </>
  );
};
export default IndividualTickets;
