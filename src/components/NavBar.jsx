import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import axios from "axios";

// Utils
import { useToast } from "../utils/ToastProvider";

const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const user = useSelector((store) => store.user);

  // Handle Logout
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/logout`,
        {},
        { withCredentials: true }
      );

      dispatch({ type: "RESET_STORE" });
      showToast(res?.data?.message, "success");
      navigate("/login");
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1">
        <NavLink to="/" className="btn btn-ghost text-xl">
          DevTinder🧑‍💻
        </NavLink>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="dropdown dropdown-end mx-5">
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
        <div className="flex gap-4">
          <NavLink to="/login" className="btn btn-outline btn-primary">
            Login
          </NavLink>
          <NavLink to="/signup" className="btn btn-outline btn-primary">
            Signup
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;
