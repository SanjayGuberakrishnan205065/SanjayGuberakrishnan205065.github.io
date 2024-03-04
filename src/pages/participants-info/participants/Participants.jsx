import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Typography } from "@material-tailwind/react";
import EventParticipants from "./components/EventParticipants";
import {
  checkoutIdEventMap,
  comboEventCheckoutIdsMap,
} from "../../../constants";
import Loader from "../../loader/Loader";

const Participants = () => {
  const { token } = useAuthContext();
  const [eventParticipants, setEventParticipants] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = () => {
      axios
        .get("/api/tickets/verified/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const tempParticipants = {};
          res.data.verifiedTransactions.forEach((verifiedTransaction) => {
            const includedTransactions = verifiedTransaction.transactions;
            includedTransactions.forEach((transaction) => {
              transaction.purchasedTickets.forEach((ticket) => {
                const checkoutIdsToPopulate = [];
                if (comboEventCheckoutIdsMap[ticket.checkoutId]) {
                  comboEventCheckoutIdsMap[ticket.checkoutId].forEach(
                    (comboEventCheckoutId) => {
                      checkoutIdsToPopulate.push(comboEventCheckoutId);
                    }
                  );
                } else {
                  checkoutIdsToPopulate.push(ticket.checkoutId);
                }
                checkoutIdsToPopulate.forEach((checkoutId) => {
                  if (tempParticipants[checkoutId]) {
                    tempParticipants[checkoutId].push({
                      ...verifiedTransaction.user,
                      id: verifiedTransaction.user._id,
                    });
                  } else {
                    tempParticipants[checkoutId] = [
                      {
                        ...verifiedTransaction.user,
                        id: verifiedTransaction.user._id,
                      },
                    ];
                  }
                });
              });
            });
            setEventParticipants(tempParticipants);
            setLoading(false);
          });
        });
    };
    fetchParticipants();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Typography variant="h3">Verified Participants</Typography>
      {Object.keys(checkoutIdEventMap).map(
        (checkoutId, index) =>
          eventParticipants[checkoutId] && (
            <EventParticipants
              key={index}
              eventName={checkoutIdEventMap[checkoutId]}
              eventParticipants={eventParticipants[checkoutId] || []}
            />
          )
      )}
    </div>
  );
};
export default Participants;
