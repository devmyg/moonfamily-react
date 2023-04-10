import { create } from "zustand";

interface UserStore {
  user: any;
  setUser: (user: any) => void;
  removeUser: () => void;
}

const useStore = create<UserStore>((set) => ({
  user: (() => {
    const user = sessionStorage.getItem("user");
    return user !== null ? JSON.parse(user) : null;
  })(),
  setUser: (user: any) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  removeUser: () => {
    sessionStorage.removeItem("user");
    set({ user: null });
  },
}));
export default useStore;
