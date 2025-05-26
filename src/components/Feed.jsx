import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import UserCard from "./UserCard";

// Slice
import { addFeed } from "../utils/feedSlice";

// Utils
import { useToast } from "../utils/ToastProvider";

const Feed = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const user = useSelector((store) => store.user);
  const feed = useSelector((store) => store.feed);

  // Fetch feed
  const getFeed = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/feed`,
        { withCredentials: true }
      );

      dispatch(addFeed(res?.data?.data));
      showToast(res?.data?.message, "success");
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Render empty placeholder
  const renderEmptyPlaceholder = (children) => (
    <div className="h-[calc(100vh-300px)] flex justify-center items-center">
      <p className="text-gray-500">{children}</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 justify-center items-center">
      <div className="h-6">
        {user && (
          <h1 className="text-2xl font-light">
            Welcome <span className="font-bold">{user.firstName}</span>
          </h1>
        )}
      </div>

      {!feed && renderEmptyPlaceholder("Loading...")}
      {feed &&
        feed.length === 0 &&
        renderEmptyPlaceholder("No new user found!")}

      {feed && (
        <div className="stack w-96">
          {feed.map((row) => (
            <UserCard key={row._id} data={row} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
