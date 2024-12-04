import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { isLoggedIn } from "@/services/auth";

const useAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedIn = isLoggedIn();
    if (!loggedIn && location.pathname !== "/auth") {
      navigate("/auth");
    } else if (loggedIn && location.pathname === "/auth") {
      navigate("/");
    }
  }, [navigate, location.pathname]);
};


export default useAuth;