import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import ChatInterface from "./pages/chatInterface";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChatInterface />
  </StrictMode>,
);
