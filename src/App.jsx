import { Navigate, RouterProvider, createHashRouter } from "react-router-dom";
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
import OrganisedEvents from "./pages/user/organisedEvents/OrganisedEvents";
import UpdateEvent from "./pages/events/updateEvent/UpdateEvent";
import ViewWorkshops from "./pages/events/viewWorkshops/viewWorkshops";
import Schedule from "./pages/schedule/Schedule";
import Profile from "./pages/user/profile/Profile";
import ParticipatedEvents from "./pages/user/participatedEvents/ParticipatedEvents";
import ViewRegistrations from "./pages/events/viewRegistrations/ViewRegistrations";
import Contact from "./pages/contact/Contact";
import MegaEvents from "./pages/events/viewMegaEvents/MegaEvents";
import Accommodation from "./pages/accommodation/Accommodation";
import BuyTickets from "./pages/buy-tickets/BuyTickets";

function App() {
  const authContext = useAuthContext();
  const { user, loading } = authContext;

  if (loading) {
    return <div>Loading...</div>;
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
          path: "organized-events",
          element: user ? <OrganisedEvents /> : <Navigate to="/login" />,
        },
        {
          path: "participated-events",
          element: user ? <ParticipatedEvents /> : <Navigate to="/login" />,
        },
        {
          path: "schedule",
          element: <Schedule />,
        },
        {
          path: "profile",
          element: user ? <Profile /> : <Navigate to="/login" />,
        },
        {
          path: "events/:id/view-registrations",
          element: user ? <ViewRegistrations /> : <Navigate to="/login" />,
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
          path: "buy-tickets",
          element: <BuyTickets />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
