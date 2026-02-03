export type Platform = 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'tiktok';

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  business_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface SocialAccount {
  id: string;
  user_id: string;
  platform: Platform;
  account_name: string;
  account_handle: string;
  avatar_url: string | null;
  is_connected: boolean;
  follower_count: number;
  following_count: number;
  post_count: number;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  media_urls: string[];
  platforms: Platform[];
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  scheduled_at: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostAnalytics {
  id: string;
  post_id: string;
  platform: Platform;
  likes: number;
  comments: number;
  shares: number;
  impressions: number;
  reach: number;
  engagement_rate: number;
  recorded_at: string;
}

export interface ContentIdea {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  hashtags: string[];
  is_saved: boolean;
  created_at: string;
}

export interface AnalyticsData {
  date: string;
  followers: number;
  engagement: number;
  impressions: number;
  reach: number;
}

export interface HeatmapData {
  day: number;
  hour: number;
  value: number;
}

export interface PricingPlan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}
