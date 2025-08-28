import { create } from "zustand";
import { http } from "../../lib/axios";
import toast from "react-hot-toast";

export const useAuth = create((set) => ({
  user: null,
  authLoading: false,
  authCheckLoading: false,

  authCheck: async () => {
    set({ authCheckLoading: true });
    try {
      const response = await http.get("/auth/authCheck");
      set({ user: response.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);

      set({ user: null });
    } finally {
      set({ authCheckLoading: false });
    }
  },
  login: async (credential, next) => {
    set({ authLoading: true });
    try {
      const response = await http.post("/auth/login", credential);
      set({ user: response.data });
      toast.success("Login successfully.");
      if (next) next();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ authLoading: false });
    }
  },
  signup: async (credential, next) => {
    set({ authLoading: true });
    try {
      const response = await http.post("/auth/signup", credential);
      set({ user: response.data });
      toast.success("Account created successfully.");
      if (next) next();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ authLoading: false });
    }
  },
  logout: async (credential) => {
    try {
      await http.post("/auth/signup", credential);
      set({ user: null });
      toast.success("Logout successfully.");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
