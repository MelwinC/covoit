import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth.tsx";
import Navigation from "./components/Navigation.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  </BrowserRouter>
);
