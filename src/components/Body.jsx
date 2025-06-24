import { useEffect } from "react";
import { Outlet } from "react-router";

import { useAuth } from "../context/AuthProvider";

import Footer from "./Footer";
import NavBar from "./NavBar";

const Body = () => {
  const { requireAuth } = useAuth();

  useEffect(() => {
    requireAuth();
  }, [requireAuth]);

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <div className="flex-grow p-6">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
