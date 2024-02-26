import { Typography } from "@material-tailwind/react";
import WorkshopCard from "./Workshopcard";

const ComboTickets = ({ comboTickets }) => {
  return (
    <div className="mt-5">
      <Typography variant="h2">Combo Tickets</Typography>
      <div className="flex gap-5 flex-wrap items-center">
        {comboTickets.map((ticket, index) => (
          <WorkshopCard
            key={index}
            title={ticket.ticketName}
            description={ticket.ticketDescription}
            price={ticket.ticketPrice["$numberDecimal"]}
            checkoutId={ticket.checkoutId}
          />
        ))}
      </div>
    </div>
  );
};
export default ComboTickets;
