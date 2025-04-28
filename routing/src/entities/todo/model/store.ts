import { create } from 'zustand';
import { Todo } from './types';
import { todoService } from '../api/todo.service';
import { CreateTodoDto } from '../api/dto/create.dto';

interface TodoStore {
  todos: Todo[];
  selectedTodos: Set<number | string>;
  setSelectedTodos: (selected: Set<number | string>) => void;
  loadTodos: () => Promise<void>;
  createTodo: (dto: CreateTodoDto) => Promise<void>;
  updateTodo: (id: number, dto: Partial<Todo>) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

export const useTodoStore = create<TodoStore>()((set) => ({
  todos: [],
  selectedTodos: new Set(),
  setSelectedTodos: (selected: Set<number | string>) => {
    set({ selectedTodos: selected });
  },
  loadTodos: async () => {
    const todos = await todoService.getAll();

    set({ todos });
  },
  createTodo: async (dto: CreateTodoDto) => {
    const newTodo = await todoService.create(dto);

    set((store) => ({
      todos: [...store.todos, newTodo],
    }));
  },
  updateTodo: async (id: number, dto: Partial<Todo>) => {
    const updatedTodo = await todoService.update(id, dto);

    set((store) => ({
      todos: store.todos.map((todo) => {
        if (todo.id === id) return updatedTodo;
        return todo;
      }),
    }));
  },
  deleteTodo: async (id: number) => {
    set((store) => ({
      todos: store.todos.filter((todo) => todo.id !== id),
    }));
    await todoService.delete(id);
  },
}));
