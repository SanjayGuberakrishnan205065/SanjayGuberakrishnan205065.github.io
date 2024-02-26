import { Typography } from "@material-tailwind/react";
import EventTickets from "./components/eventTickets/EventTickets";
import MegaEventTickets from "./components/megaEventTickets/MegaEventTickets";
import WorkshopTickets from "./components/workshopTickets/WorkshopTickets";
import CheckoutPopup from "./components/CheckoutPopup";

const BuyTickets = () => {
  return (
    <div className="page-view container mx-auto">
      <Typography variant="h1">Buy Tickets</Typography>
      <EventTickets />
      <MegaEventTickets />
      <WorkshopTickets />
      <CheckoutPopup />
    </div>
  );
};
export default BuyTickets;
