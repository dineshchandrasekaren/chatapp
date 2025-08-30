import { Route, Routes } from "react-router-dom";

import AuthPage from "./pages/auth.page";
import ProfilePage from "./pages/profile.page";
import ChatPage from "./pages/chat.page";

import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import AuthCheck from "./components/auth-check.component";
import { useThemeStore } from "./store/useThemeStore";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const { authCheckLoading: loading, authCheck, user } = useAuthStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (loading) {
    return (
      <div data-theme={theme} className="relative">
        <div className="absolute bg-base-100 w-dvw h-dvh backdrop-blur-xs z-20 flex justify-center items-center overflow-hidden">
          <span className="loading loading-dots loading-xl w-20"></span>
        </div>
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
        <Route element={<AuthCheck condition={user !== null} navigate="/" />}>
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/login" element={<AuthPage />} />
        </Route>
        <Route
          element={<AuthCheck condition={user === null} navigate="/login" />}
        >
          <Route path="/" element={<ChatPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            borderRadius: "30px",
            paddingLeft: "16px",
          },

          position: "top-right",
        }}
      />
    </div>
  );
}

export default App;
