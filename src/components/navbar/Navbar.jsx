import {
  Navbar as MTNavbar,
  Collapse,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import HotelIcon from "@mui/icons-material/Hotel";
import {
  RectangleStackIcon,
  XMarkIcon,
  Bars3Icon,
  PresentationChartBarIcon,
  GiftIcon,
  MapPinIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import MyMarquee from "./MyMarquee";

function NavItem({ children, routeFn }) {
  return (
    <li>
      <Typography
        as="a"
        onClick={routeFn}
        variant="paragraph"
        className="flex items-center gap-2 font-medium"
      >
        {children}
      </Typography>
    </li>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const NAV_MENU = [
    {
      name: "Home",
      icon: HomeIcon,
      routeFn: () => {
        setOpen(false);
        navigate("/");
      },
    },
    {
      name: "Events",
      icon: RectangleStackIcon,
      routeFn: () => {
        setOpen(false);
        navigate("/events");
      },
    },
    {
      name: "Workshops",
      icon: PresentationChartBarIcon,
      routeFn: () => {
        setOpen(false);
        navigate("/workshops");
      },
    },
    {
      name: "Mega Events",
      icon: GiftIcon,
      routeFn: () => {
        setOpen(false);
        navigate("/mega-events");
      },
    },
    {
      name: "Location",
      icon: MapPinIcon,
      routeFn: () => {
        setOpen(false);
        navigate("/location");
      },
    },
  ];

  const handleOpen = () => setOpen((cur) => !cur);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpen(false)
    );
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = () => {
    setOpen(false);
    navigate("login");
  };

  const handleProfile = () => {
    setOpen(false);
    navigate("profile");
  };

  const handleHome = () => {
    setOpen(false);
    navigate("/");
  };

  const handleBuyTickets = () => {
    setOpen(false);
    navigate("buy-tickets");
  };

  return (
    <MTNavbar
      shadow={false}
      fullWidth
      blurred={false}
      className={`${
        isScrolling ? "bg-primary" : "bg-transparent"
      } fixed top-0 z-50 border-0`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Typography
          color="white"
          className="text-2xl samhita-font cursor-pointer"
          onClick={handleHome}
        >
          SAMHITA '24
        </Typography>
        <ul className={`ml-10 hidden items-center gap-6 lg:flex text-white`}>
          {NAV_MENU.map(({ name, icon: Icon, routeFn }) => (
            <NavItem key={name} routeFn={routeFn}>
              <Icon className="h-5 w-5" />
              <span>{name}</span>
            </NavItem>
          ))}
        </ul>
        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <Button color="white" variant="text" onClick={handleProfile}>
              Profile
            </Button>
          ) : (
            <Button color="white" variant="text" onClick={handleLogin}>
              Log in
            </Button>
          )}
          <span>
            <Button color="white" onClick={handleBuyTickets}>
              Buy Tickets
            </Button>
          </span>
        </div>
        <IconButton
          variant="text"
          color="white"
          onClick={handleOpen}
          className="ml-auto inline-block lg:hidden"
        >
          {open ? (
            <XMarkIcon strokeWidth={2} className="h-6 w-6" />
          ) : (
            <Bars3Icon strokeWidth={2} className="h-6 w-6" />
          )}
        </IconButton>
      </div>
      <Collapse open={open}>
        <div className="container mx-auto mt-4 rounded-lg bg-white px-6 py-5">
          <ul className="flex flex-col gap-4 text-gray-900">
            {NAV_MENU.map(({ name, icon: Icon, routeFn }) => (
              <NavItem key={name} routeFn={routeFn}>
                <Icon className="h-5 w-5" />
                {name}
              </NavItem>
            ))}
          </ul>
          <div className="mt-6 flex items-center gap-4">
            {user ? (
              <Button color="gray" variant="text" onClick={handleProfile}>
                Profile
              </Button>
            ) : (
              <Button color="gray" variant="text" onClick={handleLogin}>
                Log in
              </Button>
            )}
            <span>
              <Button color="gray" onClick={handleBuyTickets}>
                Buy Tickets
              </Button>
            </span>
          </div>
        </div>
      </Collapse>
      <div className={`w-100 ${isScrolling ? "bg-primary" : "bg-transparent"}`}>
        <MyMarquee />
      </div>
    </MTNavbar>
  );
}

export default Navbar;
