import { useEffect } from "react";
import useChat from "../../store/useChat";
import BuddiesSkeleton from "../skeletons/buddies-skeleton.component";
import Buddy from "./buddy.component";
const BuddyList = () => {
  const { setBuddy, buddies, getAllBuddies, buddyLoading, getMessages } =
    useChat();
  useEffect(() => {
    getAllBuddies();
  }, []);

  if (buddyLoading) {
    return <BuddiesSkeleton />;
  }
  return (
    <div className="overflow-y-auto ">
      {buddies.map((buddy) => (
        <Buddy
          key={buddy._id}
          user={buddy}
          onBuddyClick={(buddy) => {
            setBuddy(buddy);
            getMessages(buddy._id);
          }}
        />
      ))}
    </div>
  );
};

export default BuddyList;
