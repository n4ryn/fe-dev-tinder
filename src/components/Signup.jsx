import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import axios from "axios";

// Slices
import { addUser } from "../utils/userSlice";

// Utils
import { useToast } from "../utils/ToastProvider";

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
    <fieldset className="fieldset bg-base-300 border-base-300 rounded-box w-xs border p-4 mx-auto">
      <legend className="fieldset-legend">Signup</legend>

      <label className="label">First Name</label>
      <input
        type="text"
        value={firstName}
        required
        className="input focus:border-none"
        placeholder="Type here"
        onChange={(e) => setFirstName(e.target.value)}
      />

      <label className="label">Last Name</label>
      <input
        type="text"
        value={lastName}
        required
        className="input focus:border-none"
        placeholder="Type here"
        onChange={(e) => setLastName(e.target.value)}
      />

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
