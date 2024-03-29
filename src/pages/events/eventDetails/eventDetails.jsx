import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { Button, Typography } from "@material-tailwind/react";
import config from "../../../config";
import Loader from "../../loader/Loader";
import { formatDateTime } from "../../../utils";
import { FaWhatsapp } from "react-icons/fa";
import Markdown from "react-markdown";

const EventDetails = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useAuthContext();
  const [isOrganiser, setIsOrganiser] = useState(false);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [eventDetails, setEventDetails] = useState({});

  useEffect(() => {
    const fetchDetail = () => {
      axios.get(`/api/events/${id}`).then((response) => {
        setData(response.data);
        // check if current user is an organizer
        response.data.organisers.forEach((organiser) => {
          if (organiser.email === user) {
            setIsOrganiser(true);
            return;
          }
        });
        setLoading(false);
      });
    };
    fetchDetail();
  }, [id]);

  useEffect(() => {
    if (!data) return;
    setEventDetails({
      Starts: formatDateTime(data.eventStartDate),
      Ends: formatDateTime(data.eventEndDate),
      Type: data.eventType,
      Venue: data.venue,
      Organizers: data.contactName,
      "First Prize Money": data.firstPrizeMoney
        ? "₹" + data.firstPrizeMoney
        : null,
      "Second Prize Money": data.secondPrizeMoney
        ? "₹" + data.secondPrizeMoney
        : null,
      "Third Prize Money": data.thirdPrizeMoney
        ? "₹" + data.thirdPrizeMoney
        : null,
      "Organizer's Phone": data.contactPhone,
      "WhatsApp Group": data.link,
      "More Info": data.otherInfo,
    });
  }, [data]);

  if (loading) {
    return (
      <div className="container mx-auto page-view">
        <Loader />
      </div>
    );
  }
  return (
    <div className="container mx-auto page-view">
      <Typography variant="h1" color="white">
        {data.eventName}
      </Typography>
      <div className="flex flex-col lg:flex-row gap-2 lg:gap-10">
        <div className="w-full lg:min-w-96 lg:w-8/12">
          <img
            src={data.externalImageLink}
            alt="event"
            className="w-full rounded-lg"
          />
        </div>
        <div className="w-full">
          <div className="relative flex flex-col w-full h-full overflow-auto shadow-md bg-clip-border rounded-xl text-white">
            <table className="w-full text-left table-auto min-w-max">
              <tbody>
                {Object.keys(eventDetails).map((key, index) => {
                  if (!eventDetails[key]) return null;
                  return (
                    <tr key={index}>
                      <td className="px-1 py-4">
                        <p className="block antialiased font-semibold">{key}</p>
                      </td>
                      <td className="px-1 py-4 text-wrap max-w-96">
                        {key === "WhatsApp Group" ? (
                          <a
                            href={eventDetails[key]}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <div className="flex flex-row text-green-400 items-center gap-1">
                              <FaWhatsapp />
                              <p className="block antialiased font-normal leading-normal">
                                {eventDetails[key]}
                              </p>
                            </div>
                          </a>
                        ) : key === "More Info" ? (
                          <div className="block antialiased markdown-text">
                            <Markdown>{eventDetails[key]}</Markdown>
                          </div>
                        ) : (
                          <p className="block antialiased font-normal leading-normal">
                            {eventDetails[key]}
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="text-center">
        {isOrganiser && (
          <div className="mt-5 flex justify-center gap-3">
            <Link to={`/events/${id}/edit`}>
              <Button color="blue" ripple={true}>
                Edit Event
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
