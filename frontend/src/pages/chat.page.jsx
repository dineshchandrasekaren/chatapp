import { Users } from "lucide-react";

const ChatPage = () => {
  return (
    <div className="h-full  bg-base-100 p-6 -z-10">
      <div className="max-w-6xl m-auto rounded-lg overflow-hidden bg-base-100/80 h-[85dvh] border flex shadow-success-content/80  border-base-300 w-full shadow-md  backdrop-blur-lg h-36 ">
        <div className="flex-1 shadow-sm shadow-success-content/60 border-r  border-base-200">
          <div className="border-b  border-base-200 p-6 ">
            <h2 className=" text-base-content text-lg font-extrabold mb-4 flex gap-2">
              <Users />
              Contacts
            </h2>
            <label htmlFor="online" className="flex gap-2">
              <input
                type="checkbox"
                id="online"
                className="checkbox checkbox-sm"
              />
              <p className="text-sm ">Show online only</p>{" "}
              <span className="text-sm text-secondary-content/80">
                {" "}
                (0 online)
              </span>
            </label>
          </div>
        </div>
        <div className="flex-3"></div>
      </div>
    </div>
  );
};

export default ChatPage;
