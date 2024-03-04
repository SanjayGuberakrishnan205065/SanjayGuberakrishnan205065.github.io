import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { TicketCard } from "../../../components/TicketCard";

const SamhitaId = () => {
  const [samhitaId, setSamhitaId] = useState("");
  const [participantInfo, setParticipantInfo] = useState({});
  const [verifiedTickets, setVerifiedTickets] = useState([]);
  const { token } = useAuthContext();
  const handleSearch = () => {
    if (samhitaId.length !== 4) {
      toast.error("Samhita ID should be 4 digits long");
      return;
    }
    axios
      .get("/api/tickets/verified/" + samhitaId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.verifiedTransactions) {
          toast.error("No participant found with this Samhita ID");
          return;
        }
        setParticipantInfo(res.data.verifiedTransactions.user);
        const tempVerifiedTickets = [];
        res.data.verifiedTransactions.transactions.forEach((transaction) => {
          transaction.purchasedTickets.forEach((ticket) => {
            tempVerifiedTickets.push(ticket);
          });
        });
        setVerifiedTickets(tempVerifiedTickets);
      });
  };
  return (
    <div className="mt-5">
      <Typography variant="h3">
        Find a participant with their Samhita ID
      </Typography>
      <div className="my-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <Input
            label="Samhita ID"
            color="white"
            placeholder="Enter a 4 digit Samhita ID"
            value={samhitaId}
            onChange={(e) => setSamhitaId(e.target.value)}
          />
          <Button
            color="deep-purple"
            variant="gradient"
            className="my-3"
            type="submit"
            onClick={handleSearch}
          >
            Search
          </Button>
        </form>
      </div>
      <div className="my-3">
        <Typography variant="h4">Participant Info</Typography>
        <div className="flex flex-col">
          <Typography variant="h6">Name: {participantInfo.userName}</Typography>
          <Typography variant="h6">Email: {participantInfo.email}</Typography>
          <Typography variant="h6">
            Phone Number: {participantInfo.mobile}
          </Typography>
          <Typography variant="h6">
            College: {participantInfo.college}
          </Typography>
          <Typography variant="h6">
            Department: {participantInfo.dept}
          </Typography>
          <Typography variant="h6">
            College Registration Number: {participantInfo.regNo}
          </Typography>
        </div>
        <div className="flex gap-5 flex-wrap">
          {verifiedTickets.map((ticket, index) => (
            <TicketCard ticket={ticket} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default SamhitaId;
