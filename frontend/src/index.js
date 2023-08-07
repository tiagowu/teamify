import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { LoadingProvider } from "./context/LoadingContext";
import { MessageProvider } from "./context/MessageContext";
import { TeamProvider } from "./context/TeamContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <TeamProvider>
      <LoadingProvider>
        <MessageProvider>
          <App />
        </MessageProvider>
      </LoadingProvider>
    </TeamProvider>
  </AuthProvider>
);
