import { create } from "zustand";
import { http } from "../lib/axios";
import toast from "react-hot-toast";

const useChat = create((set, get) => ({
  messages: [],
  buddies: [],
  selectedBuddy: null,
  buddyLoading: false,
  messageLoading: false,
  setBuddy: (selectedBuddy) => {
    set({ selectedBuddy });
  },
  getMessages: async (receiverId) => {
    set({ messageLoading: true });
    try {
      const response = await http.get(`/messages/${receiverId}`);
      set({ messages: response.data.data });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ messageLoading: false });
    }
  },
  getAllBuddies: async () => {
    set({ buddyLoading: true });
    try {
      const response = await http.get(`/messages/users`);
      set({ buddies: response.data.data });
    } catch (error) {
      set({ selectedBuddy: null });
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ buddyLoading: false });
    }
  },
  sendMessage: async (data) => {
    const { selectedBuddy, messages } = get();
    try {
      const response = await http.post(
        `/messages/send/${selectedBuddy._id}`,
        data
      );
      console.log(response);

      set({ messages: [...messages, response.data] });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  },
}));

export default useChat;
