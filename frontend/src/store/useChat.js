import { create } from "zustand";
import { http } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

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
      const message = error.response.data.message;
      toast.error(message);
      if (
        message === "jwt expired" ||
        message === "Unauthorized - Invalid Token"
      ) {
        window.location.reload();
      }
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
      const message = error.response.data.message;
      toast.error(message);
      if (
        message === "jwt expired" ||
        message === "Unauthorized - Invalid Token"
      ) {
        window.location.reload();
      }
    } finally {
      set({ buddyLoading: false });
    }
  },
  subscribeToMessage: async () => {
    const { selectedBuddy } = get();
    if (!selectedBuddy) return;
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedBuddy =
        newMessage.senderId === selectedBuddy._id;

      if (!isMessageSentFromSelectedBuddy) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
  sendMessage: async (data) => {
    const { selectedBuddy, messages } = get();
    try {
      const response = await http.post(
        `/messages/send/${selectedBuddy._id}`,
        data
      );

      set({ messages: [...messages, response.data] });
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
      if (
        message === "jwt expired" ||
        message === "Unauthorized - Invalid Token"
      ) {
        window.location.reload();
      }
    }
  },
}));

export default useChat;
