import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    config.baseURL =
      import.meta.env.MODE === "development"
        ? "http://localhost:5000"
        : "https://tasktracker-1-m5or.onrender.com"; // replace with your actual backend Render URL
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="593502111278-ti9h2lahg7dqk3o1uk15d2kdtb1l1bpg.apps.googleusercontent.com">
      <RecoilRoot>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Toaster />
      </RecoilRoot>
    </GoogleOAuthProvider>
  </StrictMode>
);
