import { useAuthStore } from "../../store/useAuthStore";
import useChat from "../../store/useChat";

const ChatBubble = ({ sender = false, messages }) => {
  const { user } = useAuthStore();
  const { selectedBuddy } = useChat();
  const time = new Date(messages.updatedAt).toLocaleTimeString("en-US", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  return (
    <div className={`chat  ${sender ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Profile picture"
            src={
              (sender ? user?.profilePic : selectedBuddy?.profilePic) ||
              "/avatar.png"
            }
          />
        </div>
      </div>
      <div className="chat-header">
        {sender ? user?.fullName : selectedBuddy?.fullName}
        <time className="text-xs opacity-50">{time};</time>
      </div>
      <div
        className={`chat-bubble ${
          sender ? "chat-bubble-primary text-primary-content" : "bg-base-200"
        }`}
      >
        {messages?.image ? (
          <img
            src={messages?.image}
            alt="attachment"
            className="w-[200px] rounded-md mb-2"
          />
        ) : (
          ""
        )}
        <p>{messages?.text}</p>
      </div>
      <div className="chat-footer opacity-50">Delivered</div>
    </div>
  );
};

export default ChatBubble;
