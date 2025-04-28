import { create } from 'zustand';
import { Album } from './types';
import { albumService } from '../api/album.service';
import { CreateAlbumDto } from '../api/dto/create.dto';

interface AlbumStore {
  albums: Album[];
  selectedAlbums: Set<number | string>;
  setSelectedAlbums: (selected: Set<number | string>) => void;
  loadAlbums: () => Promise<void>;
  createAlbum: (dto: CreateAlbumDto) => Promise<void>;
  updateAlbum: (id: number, dto: Partial<Album>) => Promise<void>;
  deleteAlbum: (id: number) => Promise<void>;
}

export const useAlbumStore = create<AlbumStore>()((set) => ({
  albums: [],
  selectedAlbums: new Set(),
  setSelectedAlbums: (selected: Set<number | string>) => {
    set({ selectedAlbums: selected });
  },
  loadAlbums: async () => {
    const albums = await albumService.getAll();

    set({ albums });
  },
  createAlbum: async (dto: CreateAlbumDto) => {
    const newAlbum = await albumService.create(dto);

    set((store) => ({
      albums: [...store.albums, newAlbum],
    }));
  },
  updateAlbum: async (id: number, dto: Partial<Album>) => {
    const updatedAlbum = await albumService.update(id, dto);

    set((store) => ({
      albums: store.albums.map((album) => {
        if (album.id === id) return updatedAlbum;
        return album;
      }),
    }));
  },
  deleteAlbum: async (id: number) => {
    set((store) => ({
      albums: store.albums.filter((album) => album.id !== id),
    }));
    await albumService.delete(id);
  },
}));
