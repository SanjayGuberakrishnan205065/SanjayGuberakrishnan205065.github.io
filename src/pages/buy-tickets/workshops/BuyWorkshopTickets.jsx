import { Typography } from "@material-tailwind/react";
import IndividualTickets from "./components/IndividualTickets";
import ComboTickets from "./components/ComboTickets";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../loader/Loader";
import CheckoutPopup from "../components/CheckoutPopup";

const BuyWorkshopTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/tickets")
      .then((response) => {
        setLoading(false);
        setTickets(response.data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  if (loading) {
    return (
      <div className="page-view container mx-auto">
        <Loader />
      </div>
    );
  }

  return (
    <div className="page-view container mx-auto">
      <Typography variant="h1">Workshop Tickets</Typography>
      <IndividualTickets
        individualTickets={tickets.filter(
          (ticket) => ticket.type === "workshop"
        )}
      />
      <ComboTickets
        comboTickets={tickets.filter(
          (ticket) => ticket.type === "workshop-combo"
        )}
      />
      <CheckoutPopup />
    </div>
  );
};
export default BuyWorkshopTickets;
