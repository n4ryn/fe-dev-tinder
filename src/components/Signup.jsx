import { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [emailId, setEmailId] = useState("john.doe@email.com");
  const [password, setPassword] = useState("Password@123");
  const [errorMessage, setErrorMessage] = useState("");

  // // Handle User Signup
  const handleSignup = async () => {
    setErrorMessage("");

    if (!firstName || !lastName || !emailId || !password) {
      setErrorMessage("Please fill required fields");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );

      navigate("/login");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Something went wrong");
      console.log(error);
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
