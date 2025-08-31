import { X } from "lucide-react";

const Buddy = ({
  user,
  status = "Offline",
  containerClass = "",
  onClose,
  onBuddyClick = "",
}) => {
  // "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
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
          <div className="avatar avatar-online before:top-[unset] before:bottom-0 before:animate-pulse before:right-0">
            <div className="w-12 rounded-full ring-primary ring-offset-base-100 ring-2 ring-offset-2">
              <img src={user?.profilePic || "/avatar.png"} />
            </div>
          </div>
        </div>
        <div className={`${onClose ? "" : "hidden"} md:block`}>
          <h3 className="text-base-content text-md font-extrabold mb-1">
            {user?.fullName || "No name"}
          </h3>
          <p className="text-zinc-400 text-sm text-left">{status}</p>
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
