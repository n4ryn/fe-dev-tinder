import axios from "axios";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router";

import { useAuth } from "../context/AuthProvider";
// Utils
import { useToast } from "../context/ToastProvider";

import { Logo } from "../utils/Icon";
import { getUser } from "../utils/utilFunctions";

// Components
import ThemeToggle from "./ThemeToggle";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { setUser } = useAuth();

  const user = getUser();

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/logout`,
        {},
        { withCredentials: true },
      );

      dispatch({ type: "RESET_STORE" });
      setUser(null);
      navigate("/login");
      showToast(res?.data?.message, "success");
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <NavLink
          to={"/"}
          className="btn btn-ghost text-xl hover:bg-base-300 hover:border-base-300"
        >
          <Logo />
          PairPro
        </NavLink>
      </div>

      <ThemeToggle />

      {user && (
        <div className="flex gap-5 mx-5">
          {/* TODO: Add Notification */}
          {/* <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <BellIcon />
              <span className="badge badge-xs badge-secondary indicator-item">
                8
              </span>
            </div>
          </button> */}

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="User photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink to="/profile" className="justify-between">
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink to="/pricing" className="justify-between">
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink to="/connections" className="justify-between">
                  Connections
                </NavLink>
              </li>
              <li>
                <NavLink to="/requests" className="justify-between">
                  Requests
                </NavLink>
              </li>
              <li>
                <p onClick={handleLogout}>Logout</p>
              </li>
            </ul>
          </div>
        </div>
      )}

      {!user && (
        <div className="flex gap-4 mx-5">
          {location.pathname !== "/login" && (
            <NavLink to="/login" className="btn btn-outline btn-primary">
              Login
            </NavLink>
          )}
          {location.pathname !== "/signup" && (
            <NavLink to="/signup" className="btn btn-outline btn-primary">
              Signup
            </NavLink>
          )}
        </div>
      )}
    </div>
  );
};

export default NavBar;
