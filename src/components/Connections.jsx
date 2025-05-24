import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Components
import ConnectionCard from "./ConnectionCard";

// Slices
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionsData = useSelector((store) => store.connection);

  // Fetch Connections
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/connections`,
        { withCredentials: true }
      );

      dispatch(addConnection(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!connectionsData) {
      fetchConnections();
    }
  }, [connectionsData]);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Connections</h1>
      {!connectionsData && <p>Loading...</p>}
      {connectionsData && connectionsData.length === 0 && (
        <p>No new connection</p>
      )}
      {connectionsData &&
        connectionsData.map((row) => (
          <ConnectionCard key={row._id} user={row} request={false} />
        ))}
    </div>
  );
};

export default Connections;
