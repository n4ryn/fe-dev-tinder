import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useToast } from "../context/ToastProvider";

import { addFeed, updateFeed } from "../utils/feedSlice";
import { UserCardSkeleton } from "../utils/Shimmer";

import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const user = useSelector(store => store.user);
  const feed = useSelector(store => store.feed);
  let currentPage = useRef(1);

  // Fetch feed
  const getFeed = async page => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/feed`,
        {
          withCredentials: true,
          params: {
            page,
            limit: 10,
            ignored: feed?.map(row => row?._id),
          },
        },
      );

      const data = res?.data?.data.users || [];
      if (page === 1) {
        showToast(res?.data?.message, "success");
        dispatch(addFeed(data));
      } else if (data.length > 0) {
        dispatch(updateFeed(data));
      }
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  useEffect(() => {
    if (user && (!feed || feed.length === 0)) {
      getFeed(currentPage.current);
    }
  }, [user, feed]);

  useEffect(() => {
    if (feed && feed.length === 3) {
      currentPage.current += 1;
      getFeed(currentPage.current);
    }
  }, [feed]);

  // Render empty placeholder
  const renderEmptyPlaceholder = children => (
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

      {!feed && <UserCardSkeleton />}
      {feed &&
        feed.length === 0 &&
        renderEmptyPlaceholder("No new user found!")}

      <div className="flex">
        {feed && feed.length > 0 && (
          <div className="stack w-96">
            {feed.map(row => (
              <UserCard key={row._id} data={row} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
