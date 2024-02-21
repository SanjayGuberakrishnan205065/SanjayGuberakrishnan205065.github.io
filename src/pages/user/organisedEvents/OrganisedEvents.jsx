import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Typography } from "@material-tailwind/react";
import EventsList from "../../../components/events/EventsList";
import Loader from "../../loader/Loader";

const OrganisedEvents = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const { token, userInfo } = useAuthContext();
  useEffect(() => {
    axios
      .get("/api/users/events-organised", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const organizedEvents = res.data.filter((event) =>
          event.organisers.includes(userInfo._id)
        );
        setEvents(organizedEvents);
        // setEvents(res.data);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="container mx-auto page-view">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container page-view mx-auto">
      <Typography variant="h1" color="white">
        Organized Events
      </Typography>
      {events.length ? (
        <EventsList events={events} />
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
            Events that you organize appear here
          </div>
        </div>
      )}
    </div>
  );
};
export default OrganisedEvents;
