import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

// Slices
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("john.doe@email.com");
  const [password, setPassword] = useState("Password@123");

  // Handle User Login
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/login`,
        {
          emailId: email,
          password: password,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data?.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card card-border bg-base-300 w-96 mx-auto">
      <div className="card-body">
        <h2 className="card-title justify-center">Login</h2>

        <div className="py-4">
          <label className="form-control w-full max-w-xs">
            <div className="label my-2">
              <span className="label-text">Email {email}</span>
            </div>
            <input
              type="email"
              value={email}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="label my-2">
              <span className="label-text">Password {password}</span>
            </div>
            <input
              type="password"
              value={password}
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <div className="card-actions justify-center">
          <button className="btn btn-primary" onClick={handleLogin}>
            login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
