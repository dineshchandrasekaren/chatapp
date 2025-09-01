import { useEffect } from "react";
import useChat from "../../store/useChat";
import BuddiesSkeleton from "../skeletons/buddies-skeleton.component";
import Buddy from "./buddy.component";
import { useAuthStore } from "../../store/useAuthStore";
const BuddyList = ({ isOnlineOnly }) => {
  const { setBuddy, buddies, getAllBuddies, buddyLoading } = useChat();
  const { onlineBuddies } = useAuthStore();
  useEffect(() => {
    getAllBuddies();
  }, []);

  if (buddyLoading) {
    return <BuddiesSkeleton />;
  }
  const filteredBuddies =
    isOnlineOnly && onlineBuddies.length
      ? buddies.filter((buddy) => onlineBuddies.includes(buddy._id))
      : buddies;
  return (
    <div className="overflow-y-auto ">
      {filteredBuddies.length > 0 ? (
        filteredBuddies.map((buddy) => (
          <Buddy
            key={buddy._id}
            user={buddy}
            onBuddyClick={() => {
              setBuddy(buddy);
            }}
          />
        ))
      ) : (
        <div className="text-center  text-base-content font-bold pt-20">
          <img src="./smileface.webp" className="w-8 md:w-12 m-auto mb-2.5" />
          <p className="text-xs md:text-base">No Buddies found</p>
        </div>
      )}
    </div>
  );
};

export default BuddyList;
