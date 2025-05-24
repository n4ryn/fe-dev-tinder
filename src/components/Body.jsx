import { Outlet, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";

// Components
import NavBar from "./NavBar";
import Footer from "./Footer";

// Slice
import { addUser } from "../utils/userSlice";

// Utils
import { useToast } from "../utils/ToastProvider";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/profile/view`,
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data.data));
      showToast(res?.data?.message, "success");
    } catch (error) {
      if (error.status === 401) {
        navigate("/login");
      }
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  useState(() => {
    if (!user) {
      fetchUser();
    }
  }, [user]);

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
