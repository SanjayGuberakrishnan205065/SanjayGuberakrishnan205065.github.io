import { Button, Typography } from "@material-tailwind/react";
import { Link, Outlet } from "react-router-dom";

const AllStats = () => {
  const quickLinks = [
    { name: "Transactions", href: "transactions" },
    { name: "Users", href: "users" },
    { name: "Referral Codes", href: "referral-codes" },
    { name: "Participants", href: "participants" },
    { name: "Query by Samhita ID", href: "samhita-id" },
    { name: "Accommodation Timings", href: "accommodation-timings" },
    { name: "Add transaction", href: "add-transaction" },
    {
      name: "Add referral to transaction",
      href: "add-referral-to-transaction",
    },
  ];
  return (
    <div className="mx-auto container page-view">
      <Typography variant="h1">All Stats</Typography>
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
export default AllStats;
