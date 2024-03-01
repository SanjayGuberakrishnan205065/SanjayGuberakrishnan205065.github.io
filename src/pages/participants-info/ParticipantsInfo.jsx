import { Button, Typography } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";

const ParticipantsInfo = () => {
  const quickLinks = [
    { name: "Transactions", href: "transactions" },
    { name: "Users", href: "users" },
  ];
  return (
    <div className="mx-auto container page-view">
      <Typography variant="h1">Participants Info</Typography>
      <div className="flex flex-wrap justify-center items-center">
        {quickLinks.map((link, index) => (
          <div key={index} className="m-2">
            <Link to={link.href}>
              <Button variant="gradient" color="deep-purple" size="lg">
                {link.name}
              </Button>
            </Link>
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};
export default ParticipantsInfo;
