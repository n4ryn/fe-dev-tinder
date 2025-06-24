import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useToast } from "../context/ToastProvider";

import { addConnection } from "../utils/connectionSlice";
import { ConnectionCardSkeleton } from "../utils/Shimmer";

import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();

  const connectionsData = useSelector(store => store.connection);

  // Fetch Connections
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/connections`,
        { withCredentials: true },
      );

      dispatch(addConnection(res?.data?.data));
      showToast(res?.data?.message, "success");
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error",
      );
    }
  };

  useEffect(() => {
    if (!connectionsData) fetchConnections();
  }, [connectionsData]);

  // Render empty placeholder
  const renderEmptyPlaceholder = children => (
    <div className="h-[calc(100vh-300px)] flex justify-center items-center">
      <p className="text-gray-500">{children}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Connections</h1>

      {!connectionsData && (
        <>
          <ConnectionCardSkeleton request={false} />
          <ConnectionCardSkeleton request={false} />
          <ConnectionCardSkeleton request={false} />
          <ConnectionCardSkeleton request={false} />
        </>
      )}
      {connectionsData &&
        connectionsData.length === 0 &&
        renderEmptyPlaceholder("No new connection found!")}

      {connectionsData &&
        connectionsData.map(row => (
          <ConnectionCard key={row._id} user={row} request={false} />
        ))}
    </div>
  );
};

export default Connections;
