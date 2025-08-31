import { Settings, LogOut, User } from "lucide-react";
import Logo from "./logo.component";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  return (
    <div
      className="navbar   border-b border-base-300/40 w-full z-40  
   bg-base-100/60"
    >
      <div className="navbar-start">
        <Link to="/">
          <Logo />
        </Link>
        <p className="text-base-content text-lg font-extrabold">Chatty</p>
      </div>
      <div className="navbar-end mr-2">
        <div className="flex grow justify-end px-2">
          <button
            className="btn btn-ghost"
            onClick={() => {
              navigate("/settings");
            }}
          >
            <Settings className="p-0.5" />
            Settings
          </button>{" "}
          {user && (
            <>
              <div className="flex items-stretch">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    className="btn whitespace-nowrap backface-hidden btn-link rounded-field no-underline text-base-content hover:no-underline"
                  >
                    <div className="avatar  m-auto mr-2 ">
                      <div className="ring-base-content/80 relative ring-offset-base-100 w-8 rounded-full ring-2  ring-offset-0">
                        <img src={user?.profilePic || "./avatar.png"} />
                      </div>
                    </div>
                    {user?.fullName || "User"}
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu  backdrop-blur-lg  dropdown-content bg-base-200/80 rounded-box z-40 mt-4 w-52 p-2 shadow-sm"
                  >
                    <li
                      onClick={() => {
                        navigate("/profile");
                      }}
                    >
                      <button>
                        <User className="p-0.5" />
                        Profile
                      </button>
                    </li>
                    <li
                      onClick={() => {
                        logout();
                      }}
                    >
                      <button>
                        <LogOut className="p-0.5" />
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
