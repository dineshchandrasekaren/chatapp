import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth.pages";
import Navbar from "./components/navbar.component";

import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
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
