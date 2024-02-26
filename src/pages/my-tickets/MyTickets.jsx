import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import MyTicketsTable from "./components/MyTicketsTable";

const MyTickets = () => {
  const { token } = useAuthContext();
  const [myTickets, setMyTickets] = useState([]);
  useEffect(() => {
    const fetchTickets = () => {
      axios
        .get("/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          console.log(response.data.transactions);
          setMyTickets(response.data.transactions);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchTickets();
  }, []);
  return (
    <div className="mx-auto container page-view">
      <Typography variant="h1">My Tickets</Typography>
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
