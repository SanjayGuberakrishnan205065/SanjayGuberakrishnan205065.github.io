import { Typography } from "@material-tailwind/react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventTickets from "./components/eventTickets/EventTickets";
import MegaEventTickets from "./components/megaEventTickets/MegaEventTickets";
import WorkshopTickets from "./components/workshopTickets/WorkshopTickets";

const BuyTickets = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <div className="page-view container mx-auto">
      <Typography variant="h1">Buy Tickets</Typography>
      <EventTickets />
      <MegaEventTickets />
      <WorkshopTickets />
    </div>
  );
};
export default BuyTickets;
