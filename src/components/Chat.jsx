import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Components
import MessageBubble from "./MessageBubble";
import Input from "./ui/Input";

// Utils
import { useToast } from "../utils/ToastProvider";
import { createSocketConnection } from "../utils/socket";
import { addConnection } from "../utils/connectionSlice";

const Chat = () => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  // const { receiverId } = useParams();

  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [receiverId, setReceiverId] = useState("");
  const user = useSelector((store) => store.user);
  const connections = useSelector((store) => store.connection);
  const [loading, setLoading] = useState(false);

  const senderId = user?._id;

  // Fetch Connections
  const fetchConnections = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/user/connections`,
        { withCredentials: true }
      );

      dispatch(addConnection(res?.data?.data));
      showToast(res?.data?.message, "success");
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
  };

  // Fetch Messages
  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/chat/${receiverId}`,
        { withCredentials: true }
      );

      setMessages(res.data.data.messages);
    } catch (error) {
      showToast(
        error?.response?.data?.message || "Something went wrong",
        "error"
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    if (receiverId) fetchMessages();
  }, [receiverId]);

  useEffect(() => {
    if (!connections) fetchConnections();
  }, [connections]);

  // Scroll to Bottom on New Message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  // Join Chat Room on Page Load
  useEffect(() => {
    if (!senderId) {
      return;
    }
    const socket = createSocketConnection();

    socket.emit("join", { receiverId, senderId });

    socket.on("messageReceived", (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on("error", (error) => {
      showToast(error, "error");
    });

    return () => {
      socket.disconnect();
    };
  }, [senderId, receiverId, messages, showToast]);

  // Send Message
  const handleSendMessage = () => {
    if (newMessage) {
      const socket = createSocketConnection();

      socket.emit("sendMessage", { message: newMessage, senderId, receiverId });
      setNewMessage("");
    }
  };

  console.log(messages);

  return (
    <div className="flex items-start gap-1">
      <div className="w-sm">
        <div className="p-3 bg-base-300 mb-1">
          <Input type="search" placeholder="Search" />
        </div>

        <ul className="list bg-base-200 shadow-md h-[calc(100vh-232px)] overflow-auto">
          {connections?.map((user) => (
            <li
              key={user._id}
              className={`list-row hover:bg-base-100 cursor-pointer ${
                user._id === receiverId && "bg-base-300"
              }`}
              onClick={() => setReceiverId(user._id)}
            >
              <div>
                <img className="size-10 rounded-box" src={user.photoUrl} />
              </div>
              <div>
                <div>{user.firstName}</div>
                <div className="text-xs font-light line-clamp-1 opacity-60">
                  {user?.lastMessage}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="m-auto bg-base-200 min-h-[calc(100vh-164px)] w-full flex flex-col justify-between">
        <div className="bg-base-300 h-16 flex items-center justify-center">
          Chat
        </div>

        <div
          className={`flex flex-col ${
            !receiverId || loading
              ? "justify-center items-center"
              : "justify-end"
          } p-4 h-[calc(100vh-304px)]`}
        >
          {receiverId && (
            <div className="overflow-y-auto" ref={messagesEndRef}>
              {loading && (
                <span className="loading loading-dots loading-xl"></span>
              )}

              {messages.map((message, index) => (
                <MessageBubble key={index} userId={user?._id} {...message} />
              ))}
            </div>
          )}
          {!receiverId && <div className="text-center">Select a user</div>}
        </div>

        <fieldset className="fieldset border-base-300 w-full border p-4">
          <div className="join">
            <input
              value={newMessage}
              disabled={!receiverId}
              type="text"
              className="input join-item w-full focus:outline-none"
              placeholder="Type here"
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              disabled={!receiverId}
              className="btn btn-accent join-item w-24"
              onClick={handleSendMessage}
            >
              Send ↗
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default Chat;
