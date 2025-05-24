import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import UserCard from "./UserCard";

// Slice
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const dispatch = useDispatch();

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!feed) {
      getFeed();
    }
  }, [feed]);

  return (
    <div>
      {user && (
        <h1 className="text-2xl font-light">
          Welcome <span className="font-bold">{user.firstName}</span>
        </h1>
      )}

      <div className="flex gap-4 justify-center items-center">
        {feed && (
          <div className="stack w-96">
            {feed.map((row) => (
              <UserCard key={row._id} data={row} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
