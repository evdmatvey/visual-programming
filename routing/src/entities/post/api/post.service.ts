import axios from 'axios';
import { CreatePostDto } from './dto/create.dto';
import { Post } from '../model/types';

class PostService {
  public async create(dto: CreatePostDto) {
    const response = await axios.post<Post>('https://jsonplaceholder.typicode.com/posts', dto);

    return response.data;
  }

  public async getAll() {
    const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');

    return response.data;
  }

  public async update(id: number, dto: Partial<Post>) {
    const response = await axios.patch<Post>(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      dto,
    );

    return response.data;
  }

  public async delete(id: number) {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);

    return true;
  }
}

export const postService = new PostService();
