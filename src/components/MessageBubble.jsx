const MessageBubble = (prop) => {
  const { userId, senderId, message, createdAt, status } = prop;

  const isLoggedInUser = userId === senderId?._id;

  const date = new Date(createdAt);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  return (
    <div
      className={`chat ${userId === senderId?._id ? "chat-end" : "chat-start"}`}
    >
      {!isLoggedInUser && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={senderId?.photoUrl}
            />
          </div>
        </div>
      )}
      <div className="chat-header">
        {senderId?.firstName}
        <time className="text-xs opacity-50">{formattedTime}</time>
      </div>
      <div
        className={`chat-bubble break-words whitespace-pre-wrap ${
          !isLoggedInUser && "chat-bubble-primary"
        }`}
      >
        {message}
      </div>
      {isLoggedInUser && <div className="chat-footer capitalize">{status}</div>}
    </div>
  );
};

export default MessageBubble;
