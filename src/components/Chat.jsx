import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";

// Components
import MessageBubble from "./MessageBubble";

// Utils
import { useToast } from "../utils/ToastProvider";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { showToast } = useToast();
  const { receiverId } = useParams();
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);

  const senderId = user?._id;

  // Fetch Messages
  const fetchMessages = async () => {
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
  };

  useEffect(() => {
    fetchMessages();
  }, []);

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
  }, [senderId, receiverId, messages]);

  // Scroll to Bottom on New Message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  // Send Message
  const handleSendMessage = () => {
    if (newMessage) {
      const socket = createSocketConnection();

      socket.emit("sendMessage", { message: newMessage, senderId, receiverId });

      setNewMessage("");
    }
  };

  return (
    <div className="m-auto bg-base-200 max-w-4xl min-h-[calc(100vh-164px)] w-full flex flex-col justify-between">
      <div className="bg-base-300 h-16 flex items-center justify-center">
        Chat
      </div>

      <div className="flex flex-col justify-end p-4 h-[calc(100vh-304px)]">
        <div className="overflow-y-auto" ref={messagesEndRef}>
          {messages.map((message, index) => (
            <MessageBubble key={index} userId={user?._id} {...message} />
          ))}
        </div>
      </div>

      <fieldset className="fieldset border-base-300 w-full border p-4">
        <div className="join">
          <input
            value={newMessage}
            type="text"
            className="input join-item w-full"
            placeholder="Type here"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="btn btn-accent join-item w-24"
            onClick={handleSendMessage}
          >
            Send ↗
          </button>
        </div>
      </fieldset>
    </div>
  );
};

export default Chat;
