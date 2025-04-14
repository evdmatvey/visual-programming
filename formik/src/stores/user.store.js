import { create } from 'zustand';

export const useUserStore = create((set) => ({
  users: [],
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
}));
