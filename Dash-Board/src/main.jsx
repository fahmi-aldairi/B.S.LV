import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { MaterialTailwindControllerProvider } from "@/context";
// import "../public/css/tailwind.css";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <div
        style={{
          backgroundImage: `url(https://cdn.discordapp.com/attachments/1106603168823005294/1121492635375378462/body-bg.png)`,
        }}
      >
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
