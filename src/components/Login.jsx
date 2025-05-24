import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";

// Slices
import { addUser } from "../utils/userSlice";

// Utils
import { useToast } from "../utils/ToastProvider";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [emailId, setEmailId] = useState("john.doe@email.com");
  const [password, setPassword] = useState("Password@123");
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
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data?.user));
      showToast(res?.data?.message, "success");
      navigate("/");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto">
      <legend className="fieldset-legend">Login</legend>

      <label className="label">Email</label>
      <input
        type="email"
        value={emailId}
        required
        className="input focus:border-none"
        placeholder="Email"
        onChange={(e) => setEmailId(e.target.value)}
      />

      <label className="label">Password</label>
      <input
        type="password"
        value={password}
        required
        className="input focus:border-none"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
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
    </fieldset>
  );
};

export default Login;
