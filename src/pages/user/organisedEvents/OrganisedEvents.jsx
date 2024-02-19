import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Loading from "../../loader/loading.svg";
import { Typography } from "@material-tailwind/react";
import EventsList from "../../../components/events/EventsList";

const OrganisedEvents = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const { token } = useAuthContext();
  useEffect(() => {
    axios
      .get("/api/users/events-organised", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return (
      <div className="container d-block mx-auto">
        <h1 className="display-5 mt-5">Events</h1>
        <div className="row mt-5 mb-5">
          <div className="col d-flex justify-content-center">
            <img src={Loading} alt="..." />
          </div>
        </div>
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
