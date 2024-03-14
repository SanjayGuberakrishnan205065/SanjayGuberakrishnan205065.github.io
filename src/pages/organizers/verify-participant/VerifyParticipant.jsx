import { Alert, Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../loader/Loader";
import { TicketCard } from "../../../components/TicketCard";
import { useAuthContext } from "../../../hooks/useAuthContext";

const VerifyParticipant = () => {
  const [samhitaId, setSamhitaId] = useState("");
  const [participantInfo, setParticipantInfo] = useState({});
  const [verifiedTickets, setVerifiedTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuthContext();
  const handleSearch = () => {
    if (samhitaId.length !== 4) {
      toast.error("Samhita ID should be 4 digits long");
      return;
    }
    setLoading(true);
    axios
      .get("/api/tickets/verified/" + samhitaId, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (!res.data.verifiedTransactions) {
          toast.error("No participant found with this Samhita ID");
          setParticipantInfo({});
          setVerifiedTickets([]);
          setLoading(false);
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
        setLoading(false);
      })
      .catch((err) => {
        toast.error(
          err.response.data.message ||
            err.response.data.error ||
            "Something went wrong"
        );
        setLoading(false);
      });
  };
  return (
    <div className="mt-5">
      <Typography variant="h3">
        Verify a participant with their Samhita ID
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
            placeholder="Enter participant's Samhita ID"
            value={samhitaId}
            onChange={(e) => setSamhitaId(e.target.value)}
          />
          <Button
            color="deep-purple"
            variant="gradient"
            className="my-3"
            type="submit"
            disabled={loading}
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </form>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="my-3">
          {participantInfo && Object.keys(participantInfo).length > 0 && (
            <>
              <Typography variant="h4" className="my-3">
                Participant Info
              </Typography>
              <div className="flex flex-col my-5">
                <div>
                  Name
                  <Typography variant="h5">
                    {participantInfo.userName}
                  </Typography>
                </div>
                <div>
                  College
                  <Typography variant="h5">
                    {participantInfo.college}
                  </Typography>
                </div>
                <div>
                  Department
                  <Typography variant="h5">{participantInfo.dept}</Typography>
                </div>
                <div>
                  College Registration Number
                  <Typography variant="h5">{participantInfo.regNo}</Typography>
                </div>
                <div>
                  Email
                  <Typography variant="h5">{participantInfo.email}</Typography>
                </div>
                <div>
                  Phone Number
                  <Typography variant="h5">{participantInfo.mobile}</Typography>
                </div>
              </div>
              <Alert color="deep-purple">
                REMEMBER TO VERIFY THE ABOVE DETAILS WITH THE PARTICIPANT'S ID
                CARD TO AVOID ANY DISCREPANCIES
              </Alert>
            </>
          )}
          <div className="flex gap-5 flex-wrap">
            {verifiedTickets.map((ticket, index) => (
              <TicketCard ticket={ticket} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default VerifyParticipant;
