import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";

import { useAuth } from "../context/AuthProvider";
// Utils
import { useToast } from "../context/ToastProvider";

// Slices
import { addUser } from "../utils/userSlice";

import { Input } from "./ui";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setUser } = useAuth();

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Handle User Login
  const handleLogin = async () => {
    setErrorMessage("");

    if (!emailId || !password) {
      setErrorMessage("Please fill required fields");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        { emailId: emailId.trim(), password: password.trim() },
        { withCredentials: true },
      );

      dispatch(addUser(res?.data?.data?.user));
      showToast(res?.data?.message, "success");
      setUser(res?.data?.data?.user);
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  const handleGuestLoginCred = async () => {
    setEmailId("dummy@email.com");
    setPassword("Password@123");
  };

  return (
    <fieldset
      className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto"
      onKeyDown={e => e.key === "Enter" && handleLogin()}
    >
      <legend className="fieldset-legend">Login</legend>

      <Input
        type="email"
        label="Email"
        value={emailId}
        onChange={e => setEmailId(e.target.value)}
      />
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {errorMessage && (
        <p className="mt-3 text-red-300">Error: {errorMessage}</p>
      )}

      <button className="btn btn-primary mt-4" onClick={handleLogin}>
        Login
      </button>

      <p className="text-sm mt-4 card-actions justify-center">
        Don't have an account?
        <NavLink to="/signup" className="text-warning">
          Signup
        </NavLink>
      </p>

      <p
        className="text-xs mt-4 card-actions justify-center cursor-pointer hover:text-primary"
        onClick={handleGuestLoginCred}
      >
        Login as Guest
      </p>
    </fieldset>
  );
};

export default Login;
