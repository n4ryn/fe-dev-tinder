import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useToast } from "../context/ToastProvider";

// Slices
import { addRequest } from "../utils/requestSlice";
import { ConnectionCardSkeleton } from "../utils/Shimmer";

import ConnectionCard from "./ConnectionCard";

const Requests = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const requestsData = useSelector(store => store.request);

  // Fetch connection requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/requests`,
        { withCredentials: true },
      );

      dispatch(addRequest(res?.data?.data));
      showToast(res?.data?.message, "success");
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  useEffect(() => {
    if (!requestsData) fetchRequests();
  }, [requestsData]);

  // Render empty placeholder
  const renderEmptyPlaceholder = children => (
    <div className="h-[calc(100vh-300px)] flex justify-center items-center">
      <p className="text-gray-500">{children}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Connection Requests</h1>

      {!requestsData && (
        <>
          <ConnectionCardSkeleton request={true} />
          <ConnectionCardSkeleton request={true} />
          <ConnectionCardSkeleton request={true} />
          <ConnectionCardSkeleton request={true} />
        </>
      )}
      {requestsData &&
        requestsData.length === 0 &&
        renderEmptyPlaceholder("No new connection request found!")}

      {requestsData &&
        requestsData.map(row => (
          <ConnectionCard
            key={row._id}
            user={row.fromUserId}
            request={true}
            requestId={row._id}
          />
        ))}
    </div>
  );
};

export default Requests;
