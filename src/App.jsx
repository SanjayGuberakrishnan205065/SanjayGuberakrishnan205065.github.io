import { RouterProvider, createHashRouter } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/navbar/Navbar";
import Loading from "./pages/loader/loading.svg";
import Router from "./Router";
import Footer from "./components/footer/Footer";
import Layout from "./layouts/Layout";
import Home from "./pages/home/Home";

function App() {
  const authContext = useAuthContext();
  const { loading } = authContext;

  if (loading) {
    return <div>Loading...</div>;
  }

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
      ],
    },
  ]);

  return (
    <>
      <ReactNotifications />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
