import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

export function TicketCard({ ticket }) {
  return (
    <Card className="mt-6 w-96 purchased-ticket-card">
      <CardBody className="rounded-lg rounded-b-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="white"
          className="w-12 h-12"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"
          />
        </svg>

        <Typography variant="h5" color="white" className="mb-2">
          {ticket.ticketName}
        </Typography>
        <Typography className="text-gray-200">
          {ticket.ticketDescription}
        </Typography>
        <Typography
          variant="h1"
          color="white"
          className="mt-6 flex justify-center items-center gap-1 text-5xl font-normal"
        >
          <span className="mt-2 text-xl">₹</span>
          {ticket.ticketPrice["$numberDecimal"]}
        </Typography>
      </CardBody>
    </Card>
  );
}
