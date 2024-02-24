import axios from "axios";
import { useState, useEffect } from "react";
import EventsList from "../../../components/events/EventsList";
import Loader from "../../loader/Loader";
import { Typography } from "@material-tailwind/react";

const ViewWorkshops = () => {
  const fetchUrl = "/api/events/upcoming-events";
  const [loading, setLoading] = useState(true);
  const [workshopEvents, setWorkshopEvents] = useState([]);

  useEffect(() => {
    const fetchDetail = () => {
      axios.get(fetchUrl).then((response) => {
        response.data.forEach((event) => {
          event.imageLoading = true;
        });
        setWorkshopEvents(
          response.data.filter((x) => {
            return x.eventType === "Workshop";
          })
        );
        setLoading(false);
      });
    };
    fetchDetail();
  }, [fetchUrl]);

  if (loading) {
    return (
      <div className="container mx-auto page-view">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto page-view">
      <Typography color="white" variant="h1">
        Workshops
      </Typography>
      <EventsList events={workshopEvents} />,
    </div>
  );
};

export default ViewWorkshops;
