import Logo from "../logo.component";

const NoMessage = () => {
  return (
    <div className="w-full h-full flex justify-center text-center items-center flex-col gap-5">
      {" "}
      <div className="animate-bounce ">
        <Logo size={30} extraClass="shadow" />
      </div>
      <h2 className="text-2xl font-extrabold text-shadow-xs">
        Welcome to Chatty!
      </h2>
      <p className="font-medium   text-center mb-4 text-base-content/80 text-shadow-xs">
        Pick a buddy from your list to start chatting.
      </p>
    </div>
  );
};

export default NoMessage;
