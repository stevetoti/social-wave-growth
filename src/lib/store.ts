import { create } from 'zustand';
import { Post, SocialAccount, ContentIdea, Platform } from './types';

interface AppState {
  // User state
  user: {
    id: string;
    email: string;
    fullName: string;
    businessName: string;
    avatarUrl: string;
  } | null;
  setUser: (user: AppState['user']) => void;
  
  // Social accounts
  socialAccounts: SocialAccount[];
  setSocialAccounts: (accounts: SocialAccount[]) => void;
  
  // Posts
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  addPost: (post: Post) => void;
  updatePost: (id: string, updates: Partial<Post>) => void;
  deletePost: (id: string) => void;
  
  // Content ideas
  contentIdeas: ContentIdea[];
  setContentIdeas: (ideas: ContentIdea[]) => void;
  
  // UI state
  selectedPlatforms: Platform[];
  setSelectedPlatforms: (platforms: Platform[]) => void;
  
  // Calendar view
  calendarView: 'week' | 'month';
  setCalendarView: (view: 'week' | 'month') => void;
}

export const useAppStore = create<AppState>((set) => ({
  // User
  user: null,
  setUser: (user) => set({ user }),
  
  // Social accounts
  socialAccounts: [],
  setSocialAccounts: (socialAccounts) => set({ socialAccounts }),
  
  // Posts
  posts: [],
  setPosts: (posts) => set({ posts }),
  addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),
  updatePost: (id, updates) => set((state) => ({
    posts: state.posts.map((p) => (p.id === id ? { ...p, ...updates } : p)),
  })),
  deletePost: (id) => set((state) => ({
    posts: state.posts.filter((p) => p.id !== id),
  })),
  
  // Content ideas
  contentIdeas: [],
  setContentIdeas: (contentIdeas) => set({ contentIdeas }),
  
  // UI state
  selectedPlatforms: ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'],
  setSelectedPlatforms: (selectedPlatforms) => set({ selectedPlatforms }),
  
  // Calendar view
  calendarView: 'week',
  setCalendarView: (calendarView) => set({ calendarView }),
}));
