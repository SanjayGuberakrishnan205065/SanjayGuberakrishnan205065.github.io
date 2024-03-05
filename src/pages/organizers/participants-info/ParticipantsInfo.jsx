import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loader from "../../loader/Loader";
import { Typography } from "@material-tailwind/react";
import OrganizerEventParticipants from "./components/OrganizerEventParticipants";

const ParticipantsInfo = () => {
  const { token } = useAuthContext();
  const [eventParticipants, setEventParticipants] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = () => {
      axios
        .get("/api/tickets/organizer/verified", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const checkoutIdParticipantsMap =
            res.data.checkoutOutIdParticipantsMap;
          Object.keys(checkoutIdParticipantsMap).forEach((checkoutId) => {
            // add id field to every participant
            checkoutIdParticipantsMap[checkoutId].forEach((participant) => {
              participant.id = participant._id;
            });
          });
          setEventParticipants(checkoutIdParticipantsMap);
          setLoading(false);
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
      {Object.keys(eventParticipants).map(
        (checkoutId, index) =>
          eventParticipants[checkoutId] && (
            <OrganizerEventParticipants
              key={index}
              eventName={
                checkoutId.split("_").join(" ").charAt(0).toUpperCase() +
                checkoutId.split("_").join(" ").slice(1) +
                " Holders"
              }
              eventParticipants={eventParticipants[checkoutId] || []}
            />
          )
      )}
    </div>
  );
};

export default ParticipantsInfo;
