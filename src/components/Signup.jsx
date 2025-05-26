import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";

// Slices
import { addUser } from "../utils/userSlice";

// Utils
import { useToast } from "../utils/ToastProvider";
import { Input } from "./ui";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // // Handle User Signup
  const handleSignup = async () => {
    setErrorMessage("");

    if (!firstName || !lastName || !emailId || !password) {
      setErrorMessage("Please fill required fields");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
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
    <fieldset
      className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto"
      onKeyDown={(e) => e.key === "Enter" && handleSignup()}
    >
      <legend className="fieldset-legend">Signup</legend>

      <Input
        type="text"
        label="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <Input
        type="text"
        label="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <Input
        type="email"
        label="Email"
        value={emailId}
        onChange={(e) => setEmailId(e.target.value)}
      />

      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMessage && (
        <p className="mt-3 text-red-300">Error: {errorMessage}</p>
      )}

      <button className="btn btn-primary mt-4" onClick={handleSignup}>
        Signup
      </button>

      <p className="text-sm mt-4 card-actions justify-center">
        Already have an account?
        <NavLink to="/login" className="text-warning">
          Login
        </NavLink>
      </p>
    </fieldset>
  );
};

export default Signup;
