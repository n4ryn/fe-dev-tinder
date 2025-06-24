// context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { getUser } from "../utils/utilFunctions";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const publicPaths = ["/login", "/signup"];
  const isPublicPath = publicPaths.includes(location.pathname);
  const knownPaths = [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/connections",
    "/requests",
    "/chat",
    "/pricing",
  ];
  const isKnownPath = knownPaths.includes(location.pathname);

  const requireAuth = () => {
    if (!isKnownPath) return true;

    if (user?.firstName && isPublicPath) {
      navigate("/");
      return false;
    }

    if (!user?.firstName && !isPublicPath) {
      navigate("/login");
      return false;
    }

    return true;
  };

  const refreshUser = () => setUser(getUser());

  return (
    <AuthContext.Provider value={{ user, setUser, requireAuth, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
