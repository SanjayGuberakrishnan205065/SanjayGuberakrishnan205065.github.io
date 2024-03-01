import { Button, Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const ParticipantsInfo = () => {
  const quickLinks = [
    { name: "Completed Transactions", href: "transactions-completed" },
    { name: "Pending Transactions", href: "transactions-pending" },
    { name: "All Transactions", href: "transactions-all" },
    { name: "Non MIT Users", href: "non-mit-users" },
    { name: "All Users", href: "all-users" },
  ];
  return (
    <div className="mx-auto container page-view">
      <Typography variant="h1">Participants Info</Typography>
      <div className="flex flex-wrap">
        {quickLinks.map((link, index) => (
          <div key={index} className="m-2">
            <Button variant="gradient" color="deep-purple" size="lg">
              <Link to={`${link.href}`}>{link.name}</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ParticipantsInfo;
