import { Alert, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import toast from "react-hot-toast";
import Loader from "../loader/Loader";
import { TicketCard } from "../../components/TicketCard";

const MyTickets = () => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [verifiedTickets, setVerifiedTickets] = useState([]);
  const [samhitaId, setSamhitaId] = useState("");
  useEffect(() => {
    const fetchVerifiedTickets = () => {
      axios
        .get("/api/tickets/verified", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setLoading(false);
          setVerifiedTickets(response.data.verifiedTickets);
          setSamhitaId(response.data.samhitaId);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Failed to fetch tickets");
        });
    };
    fetchVerifiedTickets();
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
      <Alert variant="gradient" color="deep-purple" className="my-3">
        <div>
          Only the tickets from the successfully verified transactions will
          appear here.
          <br />
          It may take upto 24 hours for the transaction verification process.
          For any queries, please contact:
        </div>
        <div>
          Pradesh GV{" "}
          <a href="tel:+918838644172" className="underline">
            +91 88386 44172
          </a>{" "}
        </div>
      </Alert>
      {verifiedTickets.length > 0 ? (
        <div>
          <Typography variant="h4" className="my-3">
            Your Samhita ID: {samhitaId}
          </Typography>
          <div className="flex flex-wrap gap-5">
            {verifiedTickets.map((ticket, index) => (
              <TicketCard ticket={ticket} key={index} />
            ))}
          </div>
        </div>
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
            No tickets found
          </div>
        </div>
      )}
    </div>
  );
};
export default MyTickets;
