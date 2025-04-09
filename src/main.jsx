import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Pomodoro from "./Pomodoro.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Pomodoro />
  </StrictMode>
);
