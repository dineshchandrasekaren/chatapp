import { useState } from "react";
import BuddyHeader from "../components/buddy/buddy-header.component";
import BuddyList from "../components/buddy/buddy-list.component";
import ChatContainer from "../components/chat/chat-container.component";
import NoMessage from "../components/chat/no-message.component";
import useChat from "../store/useChat";

const ChatPage = () => {
  const { selectedBuddy } = useChat();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const showOnlineHandler = () => {
    setShowOnlineOnly((prev) => !prev);
  };
  return (
    <div className="h-dvh  bg-base-100  md:p-6 ">
      <div className="max-w-6xl m-auto rounded-lg overflow-hidden bg-base-100/80 h-dvh md:h-[90dvh] border flex  border-base-300/50 w-full  ">
        <div className="w-20 md:w-72  border-r  border-base-300/50 flex flex-col  ">
          <BuddyHeader onChange={showOnlineHandler} checked={showOnlineOnly} />
          <BuddyList isOnlineOnly={showOnlineOnly} />
        </div>
        <div className="flex-3 ">
          {selectedBuddy ? <ChatContainer /> : <NoMessage />}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
