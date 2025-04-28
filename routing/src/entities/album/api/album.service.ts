import axios from 'axios';
import { CreateAlbumDto } from './dto/create.dto';
import { Album } from '../model/types';

class AlbumService {
  public async create(dto: CreateAlbumDto) {
    const response = await axios.post<Album>('https://jsonplaceholder.typicode.com/albums', dto);

    return response.data;
  }

  public async getAll() {
    const response = await axios.get<Album[]>('https://jsonplaceholder.typicode.com/albums');

    return response.data;
  }

  public async update(id: number, dto: Partial<Album>) {
    const response = await axios.patch<Album>(
      `https://jsonplaceholder.typicode.com/albums/${id}`,
      dto,
    );

    return response.data;
  }

  public async delete(id: number) {
    await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);

    return true;
  }
}

export const albumService = new AlbumService();
