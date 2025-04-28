import axios from 'axios';
import { CreateTodoDto } from './dto/create.dto';
import { Todo } from '../model/types';

class TodoService {
  public async create(dto: CreateTodoDto) {
    const response = await axios.post<Todo>('https://jsonplaceholder.typicode.com/todos', dto);

    return response.data;
  }

  public async getAll() {
    const response = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos');

    return response.data;
  }

  public async update(id: number, dto: Partial<Todo>) {
    const response = await axios.patch<Todo>(
      `https://jsonplaceholder.typicode.com/todos/${id}`,
      dto,
    );

    return response.data;
  }

  public async delete(id: number) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    return true;
  }
}

export const todoService = new TodoService();
