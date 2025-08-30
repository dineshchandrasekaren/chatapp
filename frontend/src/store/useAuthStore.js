import { create } from "zustand";
import { http } from "../lib/axios";
import toast from "react-hot-toast";
import { devtools } from "zustand/middleware";

const store = function (set) {
  return {
    user: null,
    authLoading: false,
    authCheckLoading: false,
    profileLoading: false,
    authCheck: async () => {
      set({ authCheckLoading: true });
      try {
        const response = await http.get("/auth/authCheck");
        console.log(response);

        set({ user: response.data.data, authCheckLoading: false });
      } catch (error) {
        console.log(error);
        set({ user: null, authCheckLoading: false });
      }
    },

    login: async ({ email, password }, next) => {
      set({ authLoading: true });
      try {
        const response = await http.post("/auth/login", { email, password });
        console.log(response);

        set({ user: response.data.data, authLoading: false });
        if (next) next();
      } catch (error) {
        toast.error(error.response.data.message);
        set({ authLoading: false });
      }
    },
    signup: async (credential, next) => {
      set({ authLoading: true });
      try {
        const response = await http.post("/auth/signup", credential);
        set({ user: response.data.data });
        if (next) next();
      } catch (error) {
        toast.error(error.response.data.message);
      } finally {
        set({ authLoading: false });
      }
    },
    logout: async () => {
      try {
        await http.post("/auth/logout");
        set({ user: null });
        toast.success("Logout successfully.");
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
    updateProfile: async (profilePic) => {
      set({ profileLoading: true });

      try {
        const response = await http.put("/auth/updateProfile", { profilePic });
        set({ user: response.data.data });
        toast.success("Profile updated successfully.");
      } catch (error) {
        console.log(error);

        toast.error(error.response.data.message);
      } finally {
        set({ profileLoading: false });
      }
    },
  };
};

export const useAuthStore = create(devtools(store, { name: "AuthStore" }));
