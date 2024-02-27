import { Alert, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import MyTicketsTable from "./components/MyTicketsTable";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";

const MyTickets = () => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [myTickets, setMyTickets] = useState([]);
  useEffect(() => {
    const fetchTickets = () => {
      axios
        .get("/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setLoading(false);
          setMyTickets(response.data.transactions);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Failed to fetch tickets");
        });
    };
    fetchTickets();
  }, []);
  if (loading) {
    return (
      <div className="mx-auto container page-view">
        <Loader />
      </div>
    );
  }
  return (
    <div className="mx-auto container page-view">
      <Typography variant="h1">My Tickets</Typography>
      <Alert variant="outlined" color="yellow" className="my-3">
        It may take upto 24 hours for the transaction verification process.
        Please contact us if you have any queries.
      </Alert>
      {myTickets.length > 0 ? (
        <MyTicketsTable myTickets={myTickets} />
      ) : (
        <div style={{ position: "relative", height: "50vh" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "100%",
              transform: "translate(-50%, -50%)",
            }}
            className="text-3xl text-center"
          >
            Tickets that you buy appear here
          </div>
        </div>
      )}
    </div>
  );
};
export default MyTickets;
