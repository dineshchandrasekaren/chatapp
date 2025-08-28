import { Settings } from "lucide-react";
import Logo from "./logo.component";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <Logo />
        <p className="text-base-content text-lg font-extrabold">Chatty</p>
      </div>
      <div className="navbar-end mr-2">
        <button className="btn btn-ghost">
          <Settings className="p-0.5" />
          Settings
        </button>
      </div>
    </div>
  );
};

export default Navbar;
