import { Outlet } from "react-router";

// Components
import NavBar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
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
