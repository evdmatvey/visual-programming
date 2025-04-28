import { create } from 'zustand';
import { Post } from './types';
import { postService } from '../api/post.service';
import { CreatePostDto } from '../api/dto/create.dto';

interface PostStore {
  posts: Post[];
  selectedPosts: Set<number | string>;
  setSelectedPosts: (selected: Set<number | string>) => void;
  loadPosts: () => Promise<void>;
  createPost: (dto: CreatePostDto) => Promise<void>;
  updatePost: (id: number, dto: Partial<Post>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

export const usePostStore = create<PostStore>()((set) => ({
  posts: [],
  selectedPosts: new Set(),
  setSelectedPosts: (selected: Set<number | string>) => {
    set({ selectedPosts: selected });
  },
  loadPosts: async () => {
    const posts = await postService.getAll();

    set({ posts });
  },
  createPost: async (dto: CreatePostDto) => {
    const newPost = await postService.create(dto);

    set((store) => ({
      posts: [...store.posts, newPost],
    }));
  },
  updatePost: async (id: number, dto: Partial<Post>) => {
    const updatedPost = await postService.update(id, dto);

    set((store) => ({
      posts: store.posts.map((post) => {
        if (post.id === id) return updatedPost;
        return post;
      }),
    }));
  },
  deletePost: async (id: number) => {
    set((store) => ({
      posts: store.posts.filter((post) => post.id !== id),
    }));
    await postService.delete(id);
  },
}));
