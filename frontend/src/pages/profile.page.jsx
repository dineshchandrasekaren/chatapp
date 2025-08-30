import { Camera, User, Mail } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

const ProfilePage = () => {
  const { updateProfile, profileLoading, user } = useAuthStore();
  console.log(user);
  const [uploadedImage, setUploadedImage] = useState(user?.profilePic);
  const [changes, setChanges] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setUploadedImage(base64Image);
      await updateProfile(base64Image);
    };
  };
  const handleChange = (e) => {
    setChanges((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = () => {};
  return (
    <>
      <div className="card w-[90%]  md:max-w-xl gap-2.5  bg-base-300 card-lg shadow-sm text-base-content/80 m-auto text-center mt-16 mb-8 p-8">
        <h2 className="text-2xl font-extrabold mt-1">Profile</h2>
        <p className="font-medium mb-4 ">Your Profile information</p>

        <div className="avatar m-auto ">
          <div className="ring-base-content/80 relative ring-offset-base-100 w-24 rounded-full ring-4 ring-offset-0">
            <img src={uploadedImage || "./avatar.png"} />
          </div>
          <label
            htmlFor="file-upload"
            className={`absolute bg-base-content cursor-pointer p-2 rounded-full -bottom-1 -right-1 hover:scale-105 transition-all duration-200 ${
              profileLoading ? "animate-pulse" : ""
            }`}
          >
            <Camera className="w-5 h-5 text-base-200" size={30} />
            <input
              id="file-upload"
              type="file"
              hidden
              accept="images/*"
              onChange={handleFileChange}
              disabled={profileLoading}
            />
          </label>
        </div>
        <p
          className={`text-xs mt-4 text-base-content/60 ${
            profileLoading ? "animate-pulse" : ""
          }`}
        >
          {profileLoading
            ? "Updating..."
            : "Click the camera icon to update your photo."}
        </p>
        <fieldset className="fieldset w-full gap-4 ">
          <div>
            <legend className="fieldset-legend mb-0.5 ml-1  justify-start">
              {" "}
              <User size={15} />
              Full Name
            </legend>
            <label className="w-full input input-md ">
              <input
                type="text"
                className="text-base-content  font-bold pl-1"
                placeholder="John Doe"
                name="fullName"
                value={changes.fullName}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <legend className="fieldset-legend mb-0.5 ml-1 justify-start">
              <Mail size={15} />
              Email
            </legend>
            <label className="w-full input input-md">
              <input
                type="email"
                className="text-base-content  font-bold pl-1"
                placeholder="you@example.com"
                name="email"
                value={changes.email}
                onChange={handleChange}
              />
            </label>
          </div>
          <button
            className={`btn btn-primary mt-2 w-full ${
              profileLoading ? "animate-pulse" : ""
            }`}
            onClick={handleSubmit}
          >
            {profileLoading ? "Saving..." : "Save"}
          </button>
        </fieldset>
      </div>
      <div className="card w-[90%]  md:max-w-xl gap-2.5  bg-base-300 card-lg shadow-sm text-base-content/80 m-auto mb-16 ">
        <div className="card-body">
          <h2 className="card-title mb-2">Account Information</h2>
          <div className="overflow-x-auto">
            <table className="table">
              <tbody>
                {/* row 1 */}
                <tr>
                  <th className="text-left">Member Since</th>
                  <td className="text-right">11/12/2025</td>
                </tr>
                {/* row 2 */}
                <tr>
                  <th className="text-left">Account Status</th>
                  <td className="text-right">
                    <div className="inline-grid *:[grid-area:1/1] mr-1">
                      <div
                        className={`status ${
                          profileLoading ? "bg-red-500" : "bg-green-500"
                        } animate-ping`}
                      ></div>
                      <div
                        className={`status ${
                          profileLoading ? "bg-red-500" : "bg-green-500"
                        }`}
                      ></div>
                    </div>{" "}
                    {!profileLoading ? "Online" : "Offline"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
