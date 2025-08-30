import Navbar from "./navbar.component";
import { Navigate, Outlet } from "react-router-dom";

const AuthCheck = ({ condition, navigate }) =>
  condition ? (
    <Navigate to={navigate} replace />
  ) : (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );

export default AuthCheck;
