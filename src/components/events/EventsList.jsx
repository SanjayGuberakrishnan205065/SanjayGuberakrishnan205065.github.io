import EventCard from "./EventCard";

const EventsList = ({ events }) => {
  return (
    <div>
      {events.map((event) => (
        <div key={event._id} className="card">
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};
export default EventsList;
