import { Typography, Button, IconButton } from "@material-tailwind/react";
import { FaInstagram } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { set } from "date-fns";

function Footer() {
  const { user, userInfo } = useAuthContext();
  const location = useLocation();
  const [links, setLinks] = useState([]);
  function getCurrentDateTime() {
    // Get current date and time
    const currentDate = new Date();

    // Extract hours, minutes, seconds, and AM/PM
    const hours = currentDate.getHours() % 12 || 12; // Convert 0 to 12
    const minutes = addLeadingZero(currentDate.getMinutes());
    const seconds = addLeadingZero(currentDate.getSeconds());
    const ampm = currentDate.getHours() >= 12 ? "PM" : "AM";

    // Extract date components
    const day = addLeadingZero(currentDate.getDate());
    const month = addLeadingZero(currentDate.getMonth() + 1); // Months are zero-based
    const year = currentDate.getFullYear();

    // Format into a single string
    const dateTimeString = `${hours}:${minutes}:${seconds} ${ampm} - ${day}/${month}/${year}`;

    return dateTimeString;
  }

  function addLeadingZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  useEffect(() => {
    const updateLinks = () => {
      const newLinks = [
        {
          name: "About ITA",
          href: "https://it.mitindia.edu/ita",
          external: true,
        },
        { name: "Contact Us", href: "/contact" },
      ];
      if (userInfo && userInfo.organizedEvents.length != 0) {
        newLinks.push({ name: "Organized Events", href: "/organized-events" });
      }
      if (userInfo && userInfo.isAdmin) {
        newLinks.push({
          name: "Participants Info",
          href: "/participants-info",
        });
      }
      setLinks(newLinks);
    };
    function sendLog() {
      axios.post("/api/logs/", {
        path: location.pathname,
        user,
        localTime: getCurrentDateTime(),
      });
    }
    sendLog();
    updateLinks();
  }, [location]);
  return (
    <footer className="pb-5 p-10 md:pt-10">
      <div className="container flex flex-col mx-auto">
        <div className="flex flex-col md:flex-row items-center !justify-between">
          <Typography as="a" href="#" variant="h6" className="text-gray-400">
            SAMHITA 2024
          </Typography>
          <div className="flex justify-evenly md:justify-center my-4 md:my-0 items-center gap-2 flex-wrap">
            {links.map((link, index) => (
              <div key={index} className="block mx-4">
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal !text-gray-400 hover:!text-gray-100 transition-colors cursor-pointer"
                >
                  {link.external ? (
                    <a href={link.href} target="_blank">
                      {link.name}
                    </a>
                  ) : (
                    <Link to={link.href}>{link.name}</Link>
                  )}
                </Typography>
              </div>
            ))}
          </div>
          <div className="flex w-fit justify-center gap-2">
            <IconButton size="sm" color="blue" variant="text">
              <a href="https://www.instagram.com/samhita_mit" target="_blank">
                <FaInstagram className="text-white" />
              </a>
            </IconButton>
          </div>
        </div>
        <Typography
          color="blue-gray"
          className="text-center mt-12 font-normal !text-gray-700"
        >
          Made with ❤️ by the{" "}
          <a
            href="https://github.com/PragadeshBS/samhita24-frontend"
            target="_blank"
            className="underline"
          >
            SAMHITA team
          </a>{" "}
        </Typography>
      </div>
    </footer>
  );
}

export default Footer;
