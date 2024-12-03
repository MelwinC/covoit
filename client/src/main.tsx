import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./components/Auth.tsx";
import Navigation from "./components/Navigation.tsx";
import Contact from "./pages/Contact.tsx";
import Profil from "./pages/Profil.tsx";
import MesTrajets from "./pages/MesTrajets.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/mes-trajets" element={<MesTrajets />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/profil" element={<Profil />} />
    </Routes>
  </BrowserRouter>
);
