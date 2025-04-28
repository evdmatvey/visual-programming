import { create } from 'zustand';
import { User } from './types';
import { userService } from '../api/user.service';
import { CreateUserDto } from '../api/dto/create.dto';

interface UserStore {
  users: User[];
  selectedUsers: Set<number | string>;
  setSelectedUsers: (selected: Set<number | string>) => void;
  loadUsers: () => Promise<void>;
  updateUser: (id: number, dto: Partial<User>) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  createUser: (dto: CreateUserDto) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  users: [],
  selectedUsers: new Set(),
  createUser: (dto: CreateUserDto) => {
    set((store) => ({ users: [...store.users, { ...dto, id: 332 }] }));
  },
  setSelectedUsers: (selected: Set<number | string>) => {
    set({ selectedUsers: selected });
  },
  loadUsers: async () => {
    const users = await userService.getAll();

    set({ users });
  },
  updateUser: async (id: number, dto: Partial<User>) => {
    const updatedUser = await userService.update(id, dto);

    set((store) => ({
      users: store.users.map((user) => {
        if (user.id === id) return updatedUser;
        return user;
      }),
    }));
  },
  deleteUser: async (id: number) => {
    set((store) => ({
      users: store.users.filter((user) => user.id !== id),
    }));
    await userService.delete(id);
  },
}));
