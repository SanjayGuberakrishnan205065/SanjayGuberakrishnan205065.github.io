import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { formatDateTime } from "../../utils";

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const shortenText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  };

  return (
    <Card className="w-full flex-col lg:flex-row my-3 rounded-3xl bg-blue-gray-900 items-center lg:items-stretch">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-full lg:w-2/5 shrink-0 rounded-b-none lg:rounded-e-none lg:rounded-s-3xl"
      >
        <img
          src={event.externalImageLink}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="bg-gray-800 rounded-b-3xl lg:rounded-s-none lg:rounded-e-3xl w-full text-gray-200">
        <Typography variant="h6" className="mb-4">
          {formatDateTime(event.eventStartDate)} to{" "}
          {formatDateTime(event.eventEndDate)}
        </Typography>
        <Typography variant="h4" color="white" className="mb-2">
          {event.eventName}
        </Typography>
        <Typography color="white" className="mb-8 font-normal">
          {shortenText(event.otherInfo, 200).replace("#", "")}
        </Typography>
        <div className="mb-8 font-normal text-white">
          <div>
            <div>
              <b>Organizers</b>
            </div>
            <div>{event.contactName}</div>
            <div>{event.contactPhone}</div>
          </div>
        </div>
        <div className="flex justify-center lg:inline-block w-full">
          <Button
            color="deep-purple"
            size="lg"
            variant="gradient"
            className="flex items-center gap-2 text-white"
            onClick={() => navigate(`/events/${event._id}`)}
          >
            More Info
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
export default EventCard;
