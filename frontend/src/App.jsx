import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth.pages";
import Navbar from "./components/navbar.component";

import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useAuth } from "./store/store";

function App() {
  const { authCheck, authCheckLoading } = useAuth();
  useEffect(() => {
    authCheck();
  }, [authCheck]);
  return (
    <div className="relative">
      {authCheckLoading && (
        <div className="absolute w-dvw h-dvh backdrop-blur-xs z-20 flex justify-center items-center overflow-hidden">
          <span className="loading loading-dots loading-xl w-20"></span>
        </div>
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
