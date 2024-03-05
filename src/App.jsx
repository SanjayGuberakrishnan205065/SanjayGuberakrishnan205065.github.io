import {
  Navigate,
  Outlet,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import "react-notifications-component/dist/theme.css";

import { useAuthContext } from "./hooks/useAuthContext";
import Layout from "./layouts/Layout";
import Home from "./pages/home/Home";
import Login from "./pages/auth/login/Login";
import ForgotPassword from "./pages/auth/passwordReset/ForgotPassword";
import PasswordReset from "./pages/auth/passwordReset/PasswordReset";
import ViewEvents from "./pages/events/viewEvents/viewEvents";
import EventDetails from "./pages/events/eventDetails/eventDetails";
import Signup from "./pages/auth/signup/Signup";
import UpdateEvent from "./pages/events/updateEvent/UpdateEvent";
import ViewWorkshops from "./pages/events/viewWorkshops/viewWorkshops";
import Location from "./pages/location/Location";
import Profile from "./pages/user/profile/Profile";
import Contact from "./pages/contact/Contact";
import MegaEvents from "./pages/events/viewMegaEvents/MegaEvents";
import Accommodation from "./pages/accommodation/Accommodation";
import BuyTickets from "./pages/buy-tickets/BuyTickets";
import BuyWorkshopTickets from "./pages/buy-tickets/workshops/BuyWorkshopTickets";
import Checkout from "./pages/checkout/Checkout";
import AllStats from "./pages/all-stats/AllStats";
import Transactions from "./pages/all-stats/transactions/Transactions";
import Users from "./pages/all-stats/users/Users";
import MyTransactions from "./pages/my-transactions/MyTransactions";
import MyTickets from "./pages/my-tickets/MyTickets";
import Loader from "./pages/loader/Loader";
import ReferralCodes from "./pages/all-stats/referral-codes/ReferralCodes";
import Participants from "./pages/all-stats/participants/Participants";
import SamhitaId from "./pages/all-stats/samhita-id/SamhitaId";
import Organizers from "./pages/organizers/Organizers";
import OrganizedEvents from "./pages/organizers/organized-events/OrganizedEvents";
import ParticipantsInfo from "./pages/organizers/participants-info/ParticipantsInfo";

function App() {
  const authContext = useAuthContext();
  const { user, loading, userInfo } = authContext;

  if (loading) {
    return <Loader />;
  }

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: user ? <Navigate to="/" /> : <Signup />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <PasswordReset />,
        },
        {
          path: "events",
          element: <ViewEvents />,
        },
        {
          path: "workshops",
          element: <ViewWorkshops />,
        },
        {
          path: "mega-events",
          element: <MegaEvents />,
        },
        {
          path: "events/:id",
          element: <EventDetails />,
        },
        {
          path: "events/:id/edit",
          element: user ? <UpdateEvent /> : <Navigate to="/login" />,
        },
        {
          path: "location",
          element: <Location />,
        },
        {
          path: "profile",
          element: user ? <Profile /> : <Navigate to="/login" />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "accommodation",
          element: <Accommodation />,
        },
        {
          path: "checkout",
          element: <Checkout />,
        },
        {
          path: "my-tickets",
          element: user ? <MyTickets /> : <Navigate to="/login" />,
        },
        {
          path: "my-transactions",
          element: user ? <MyTransactions /> : <Navigate to="/login" />,
        },
        {
          path: "buy-tickets",
          element: user ? <Outlet /> : <Navigate to="/login" />,
          children: [
            {
              path: "",
              element: <BuyTickets />,
            },
            {
              path: "workshops",
              element: <BuyWorkshopTickets />,
            },
          ],
        },
        {
          path: "organizers",
          element: user ? <Organizers /> : <Navigate to="/login" />,
          children: [
            { path: "organized-events", element: <OrganizedEvents /> },
            {
              path: "participants-info",
              element: <ParticipantsInfo />,
            },
          ],
        },
        {
          path: "all-stats",
          element:
            userInfo && userInfo.isAdmin ? <AllStats /> : <Navigate to="/" />,
          children: [
            {
              path: "transactions",
              element: <Transactions />,
            },
            {
              path: "users",
              element: <Users />,
            },
            {
              path: "referral-codes",
              element: <ReferralCodes />,
            },
            {
              path: "participants",
              element: <Participants />,
            },
            {
              path: "samhita-id",
              element: <SamhitaId />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
