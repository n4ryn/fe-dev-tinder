import io from "socket.io-client";

export const createSocketConnection = () => {
  const token = document?.cookie?.split("=")[1];

  if (location.hostname === "localhost") {
    const socket = io(import.meta.env.VITE_BASE_URL, {
      reconnectionDelayMax: 10000,
      auth: {
        token,
      },
    });
    return socket;
  } else {
    const socket = io("/", {
      path: "/api/socket.io",
      reconnectionDelayMax: 10000,
      auth: {
        token,
      },
    });
    return socket;
  }
};
