import useChat from "../../store/useChat";
import Buddy from "../buddy/buddy.component";
import MessageSkeleton from "../skeletons/message-skeleton.component";
import SendMessage from "./send-message.component";
import ChatBubble from "./chat-bubble.component";
import { useAuthStore } from "../../store/useAuthStore";
const ChatContainer = () => {
  const { user } = useAuthStore();
  const { setBuddy, selectedBuddy, messages, messageLoading } = useChat();
  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <Buddy
        user={selectedBuddy}
        onClose={() => {
          setBuddy(null);
        }}
      />
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 scroll-smooth">
        {messageLoading ? (
          <MessageSkeleton />
        ) : (
          messages.map((message) => (
            <ChatBubble
              key={message._id} // ✅ use _id instead of id
              sender={message.senderId === user?._id}
              messages={message}
            />
          ))
        )}
      </div>
      {/* Message Input */}
      <SendMessage />
    </div>
  );
};

export default ChatContainer;
