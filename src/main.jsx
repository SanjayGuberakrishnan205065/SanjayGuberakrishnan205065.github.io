import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContextProvider } from "./contexts/AuthContext";
import "./index.css";
import App from "./App";
import axios from "axios";
import config from "./config";
import { ThemeProvider } from "@material-tailwind/react";
import { ReactNotifications } from "react-notifications-component";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "react-hot-toast";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

axios.defaults.baseURL = config.apiUrl;
const reCaptchaKey = "6LeO0ZcpAAAAADpsqiBeTxj5tVAvnlzL3fFAIKWm";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey}>
      <ThemeProvider>
        <AuthContextProvider>
          <CartProvider>
            <ReactNotifications />
            <App />
            <Toaster />
          </CartProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </GoogleReCaptchaProvider>
  </React.StrictMode>
);
