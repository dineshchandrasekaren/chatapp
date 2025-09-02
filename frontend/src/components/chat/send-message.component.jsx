import { Camera, Send, X } from "lucide-react";
import { useState } from "react";
import useChat from "../../store/useChat";
// import { useAuthStore } from "../../store/useAuthStore";

const SendMessage = () => {
  // const { user}=useAuthStore();
  const { sendMessage } = useChat();
  const [previewImage, setPreviewImage] = useState(null);
  const [text, setText] = useState("");

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleClick = async () => {
    await sendMessage({ text, image: previewImage }).then(() => {
      setPreviewImage(null);
      setText("");
    });
  };
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setPreviewImage(base64Image);
    };

    e.target.value = "";
  };

  const deleteImage = () => {
    setPreviewImage(null);
  };
  return (
    <div className="flex gap-4 relative items-center p-4 border-t border-base-300/50 backdrop-blur-lg">
      {previewImage && (
        <div className="absolute w-40 h-40 -top-48 left-8   transition transform hover:translate-y-[-5px] duration-300">
          <div className="relative group">
            {/* Close Icon */}
            <svg
              className="absolute bg-error text-white rounded-full p-1 z-20 -top-3 -right-3 hidden group-hover:block cursor-pointer"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              height="1.5rem"
              onClick={deleteImage}
              width="1.5rem"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>

            {/* Profile Image */}
            <img
              className="w-full h-full opacity-60 rounded-md  group-hover:opacity-100"
              src={previewImage}
              alt="profile"
            />
          </div>
        </div>
      )}

      <textarea
        placeholder="Type a message..."
        className="textarea flex-1 resize-none overflow-y-auto max-h-20"
        onChange={handleChange}
        value={text}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (previewImage || text) {
              handleClick();
            }
          }
        }}
      />

      <label
        htmlFor="file-upload"
        className={`p-2 rounded-full transition-all duration-200
    ${
      previewImage
        ? "bg-base-content cursor-not-allowed" // keep same bg
        : "bg-base-content cursor-pointer hover:scale-105"
    } 
  `}
      >
        <Camera
          className={`w-5 h-5 text-base-200 
      ${previewImage ? "opacity-70" : ""}   // only dim the icon
    `}
          size={22}
        />
        <input
          id="file-upload"
          type="file"
          hidden
          accept="image/*"
          onChange={handleImage}
          disabled={!!previewImage}
        />
      </label>

      <button
        className="cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
        onClick={handleClick}
        disabled={!previewImage && !text}
      >
        <Send />
      </button>
    </div>
  );
};

export default SendMessage;
