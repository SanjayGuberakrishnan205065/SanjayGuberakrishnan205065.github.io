import { Button, Typography } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";

const Organizers = () => {
  const quickLinks = [
    { name: "Organized Events", href: "organized-events" },
    { name: "Participants Info", href: "participants-info" },
    { name: "Verify Participant", href: "verify-participant" },
  ];
  return (
    <div className="mx-auto container page-view">
      <Typography variant="h1">Organizers Dashboard</Typography>
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
export default Organizers;
