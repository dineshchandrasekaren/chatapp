import { Users } from "lucide-react";
import { useAuthStore } from "../../store/useAuthStore";

const BuddyHeader = ({ onChange, checked }) => {
  const { onlineBuddies } = useAuthStore();

  return (
    <>
      {/* Mobile */}
      <div className="border-b border-base-200 py-3 md:hidden">
        <label htmlFor="onlinesm" className="text-xs cursor-pointer">
          <input
            type="checkbox"
            id="onlinesm"
            className="checkbox checkbox-sm checkbox-success my-2 block mx-auto"
            checked={checked}
            onChange={onChange}
          />
          <h6 className="text-center">Online Buddies</h6>
        </label>
      </div>

      {/* Desktop */}
      <div className="border-b border-base-200 p-6 hidden md:block">
        <h2 className="text-base-content text-lg font-extrabold mb-4 flex gap-2">
          <Users />
          Buddies
        </h2>
        <label
          htmlFor="online"
          className="flex gap-2 items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="online"
            className="checkbox checkbox-sm checkbox-success"
            checked={checked}
            onChange={onChange}
          />
          <p className="text-sm">Show online only</p>
          <span className="text-xs text-zinc-500">
            (
            {onlineBuddies.length === 1
              ? "no buddy online"
              : `you + ${onlineBuddies.length - 1} online`}
            )
          </span>
        </label>
      </div>
    </>
  );
};

export default BuddyHeader;
