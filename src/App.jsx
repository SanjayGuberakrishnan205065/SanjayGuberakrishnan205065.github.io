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
          element: user ? <Navigate to="/events" /> : <Login />,
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
          path: "schedule",
          element: <Schedule />,
        },
        {
          path: "profile",
          element: user ? <Profile /> : <Navigate to="/login" />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
