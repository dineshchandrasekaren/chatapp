import { X } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const Buddy = ({ user, containerClass = "", onClose, onBuddyClick = "" }) => {
  // "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
  const { onlineBuddies } = useAuthStore();
  console.log(onlineBuddies, user);

  return (
    <>
      <button
        onClick={() => {
          onBuddyClick(user);
        }}
        className={`flex gap-4 p-4 relative w-full items-center  ${
          onBuddyClick
            ? "hover:bg-base-200 cursor-pointer"
            : "shadow shadow-success-content/60 border-b  border-base-300/50 "
        } ${containerClass}`}
      >
        <div>
          <div
            className={`avatar ${
              onlineBuddies.includes(user._id)
                ? "avatar-online before:top-[unset] before:-bottom-0.5 before:bg-green-500 before:p-1.5 before:-right-0.5"
                : ""
            }`}
          >
            <div className="w-12 rounded-full ring-primary ring-offset-base-100 ring-2 ring-offset-2">
              <img src={user?.profilePic || "/avatar.png"} />
            </div>
          </div>
        </div>
        <div className={`${onClose ? "" : "hidden"} md:block`}>
          <h3 className="text-base-content text-md font-extrabold mb-1">
            {user?.fullName || "No name"}
          </h3>
          <p className="text-zinc-400 text-sm text-left">
            {onlineBuddies.includes(user._id) ? "Online" : "Offline"}
          </p>
        </div>
        {onClose && (
          // <button>
          <X
            className="absolute right-2 cursor-pointer p-3 top-3"
            size={45}
            onClick={onClose}
          />
          // </button>
        )}
      </button>
    </>
  );
};

export default Buddy;
