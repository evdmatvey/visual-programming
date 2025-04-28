import axios from 'axios';
import { CreateUserDto } from './dto/create.dto';
import { User } from '../model/types';

class UserService {
  public async create(dto: CreateUserDto) {
    return {
      ...dto,
      id: 43,
    } as User;
  }

  public async getAll() {
    const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');

    return response.data;
  }

  public async update(id: number, dto: Partial<User>) {
    const response = await axios.patch<User>(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      dto,
    );

    return response.data;
  }

  public async delete(id: number) {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

    return true;
  }
}

export const userService = new UserService();
