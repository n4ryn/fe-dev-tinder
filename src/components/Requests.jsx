import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import ConnectionCard from "./ConnectionCard";

// Slices
import { addRequest, removeRequest } from "../utils/requestSlice";
import { updateConnection } from "../utils/connectionSlice";

const Requests = () => {
  const dispatch = useDispatch();

  const requestsData = useSelector((store) => store.request);

  // Handle Review Request
  const handleReviewRequest = async (status, requestId, user) => {
    try {
      await axios.post(
        `${
          import.meta.env.VITE_BASE_URL
        }/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );

      dispatch(removeRequest(requestId));
      if (user) dispatch(updateConnection(user));
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch connection requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/requests`,
        { withCredentials: true }
      );

      dispatch(addRequest(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!requestsData) {
      fetchRequests();
    }
  }, [requestsData]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Connection Requests</h1>

      {!requestsData && <p>Loading...</p>}

      {requestsData && requestsData.length === 0 && <p>No connection found</p>}

      {requestsData &&
        requestsData.map((row) => (
          <ConnectionCard
            key={row._id}
            user={row.fromUserId}
            request={true}
            handleReviewRequest={handleReviewRequest}
            requestId={row._id}
          />
        ))}
    </div>
  );
};

export default Requests;
