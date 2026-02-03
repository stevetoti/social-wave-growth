import { Post, SocialAccount, ContentIdea, AnalyticsData, HeatmapData, PricingPlan, Platform } from './types';

export const mockSocialAccounts: SocialAccount[] = [
  {
    id: '1',
    user_id: 'user-1',
    platform: 'instagram',
    account_name: 'Social Wave Growth',
    account_handle: '@socialwavegrowth',
    avatar_url: null,
    is_connected: true,
    follower_count: 15420,
    following_count: 892,
    post_count: 234,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'user-1',
    platform: 'facebook',
    account_name: 'Social Wave Growth',
    account_handle: 'socialwavegrowth',
    avatar_url: null,
    is_connected: true,
    follower_count: 8932,
    following_count: 156,
    post_count: 189,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: 'user-1',
    platform: 'twitter',
    account_name: 'Social Wave Growth',
    account_handle: '@swgrowth',
    avatar_url: null,
    is_connected: true,
    follower_count: 5621,
    following_count: 423,
    post_count: 567,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    user_id: 'user-1',
    platform: 'linkedin',
    account_name: 'Social Wave Growth',
    account_handle: 'social-wave-growth',
    avatar_url: null,
    is_connected: false,
    follower_count: 2341,
    following_count: 89,
    post_count: 78,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    user_id: 'user-1',
    platform: 'tiktok',
    account_name: 'Social Wave Growth',
    account_handle: '@socialwavegrowth',
    avatar_url: null,
    is_connected: false,
    follower_count: 12890,
    following_count: 234,
    post_count: 89,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockPosts: Post[] = [
  {
    id: '1',
    user_id: 'user-1',
    content: '🚀 Exciting news! We just launched our new AI-powered content suggestions feature. Try it out and let us know what you think! #SocialMedia #AI #Marketing',
    media_urls: [],
    platforms: ['instagram', 'facebook', 'twitter'],
    status: 'published',
    scheduled_at: null,
    published_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    user_id: 'user-1',
    content: '📊 Did you know? The best time to post on Instagram is between 11am-1pm on weekdays. Our analytics help you find YOUR best times! #SocialMediaTips',
    media_urls: [],
    platforms: ['instagram', 'linkedin'],
    status: 'scheduled',
    scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    published_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: 'user-1',
    content: 'Content creation doesn\'t have to be hard. Let AI do the heavy lifting while you focus on what matters - connecting with your audience. 💡',
    media_urls: [],
    platforms: ['twitter', 'facebook'],
    status: 'scheduled',
    scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    published_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    user_id: 'user-1',
    content: '🎯 5 Tips for Growing Your Social Media Presence:\n\n1. Post consistently\n2. Engage with your audience\n3. Use relevant hashtags\n4. Analyze your performance\n5. Adapt and improve\n\nWhich tip do you find most challenging? 👇',
    media_urls: [],
    platforms: ['instagram', 'facebook', 'twitter', 'linkedin'],
    status: 'draft',
    scheduled_at: null,
    published_at: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const mockContentIdeas: ContentIdea[] = [
  {
    id: '1',
    user_id: 'user-1',
    title: 'Behind the Scenes Monday',
    description: 'Show your audience what goes on behind the scenes at your company. This builds trust and humanizes your brand.',
    category: 'Engagement',
    hashtags: ['#BehindTheScenes', '#MondayMotivation', '#TeamWork', '#CompanyCulture'],
    is_saved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    user_id: 'user-1',
    title: 'Customer Success Story',
    description: 'Share a testimonial or case study from a happy customer. Social proof is incredibly powerful for conversions.',
    category: 'Social Proof',
    hashtags: ['#CustomerSuccess', '#Testimonial', '#HappyCustomers', '#Results'],
    is_saved: false,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    user_id: 'user-1',
    title: 'Industry Tip Tuesday',
    description: 'Share a valuable tip related to your industry. Position yourself as an expert and provide value to your followers.',
    category: 'Educational',
    hashtags: ['#TipTuesday', '#ProTips', '#SocialMediaTips', '#MarketingAdvice'],
    is_saved: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    user_id: 'user-1',
    title: 'Poll or Question Post',
    description: 'Ask your audience a question to boost engagement. Polls are great for understanding your audience better.',
    category: 'Engagement',
    hashtags: ['#Poll', '#Question', '#WeWantToKnow', '#CommunityVoice'],
    is_saved: false,
    created_at: new Date().toISOString(),
  },
];

export const mockAnalyticsData: AnalyticsData[] = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toISOString().split('T')[0],
    followers: 15000 + Math.floor(Math.random() * 500) + i * 15,
    engagement: 2.5 + Math.random() * 2,
    impressions: 50000 + Math.floor(Math.random() * 20000),
    reach: 30000 + Math.floor(Math.random() * 15000),
  };
});

export const mockHeatmapData: HeatmapData[] = [];
for (let day = 0; day < 7; day++) {
  for (let hour = 0; hour < 24; hour++) {
    let value = Math.random() * 50;
    // Higher engagement during work hours
    if (hour >= 9 && hour <= 17) value += 30;
    // Higher on weekdays
    if (day >= 1 && day <= 5) value += 20;
    // Peak times
    if ((hour === 12 || hour === 18) && day >= 1 && day <= 5) value += 25;
    mockHeatmapData.push({ day, hour, value: Math.min(100, Math.round(value)) });
  }
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter',
    price: 19,
    period: 'month',
    description: 'Perfect for individuals and small businesses getting started',
    features: [
      '3 social accounts',
      '30 scheduled posts/month',
      'Basic analytics',
      'Content calendar',
      'Email support',
    ],
    cta: 'Start Free Trial',
  },
  {
    name: 'Pro',
    price: 49,
    period: 'month',
    description: 'For growing businesses that need more power',
    features: [
      '10 social accounts',
      'Unlimited scheduled posts',
      'Advanced analytics',
      'AI content suggestions',
      'Team collaboration (3 users)',
      'Priority support',
      'Custom posting times',
    ],
    highlighted: true,
    cta: 'Start Free Trial',
  },
  {
    name: 'Business',
    price: 99,
    period: 'month',
    description: 'For agencies and enterprises with advanced needs',
    features: [
      'Unlimited social accounts',
      'Unlimited scheduled posts',
      'White-label reports',
      'AI content studio',
      'Unlimited team members',
      'Dedicated account manager',
      'API access',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
  },
];

export const platformColors: Record<Platform, string> = {
  instagram: 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400',
  facebook: 'bg-blue-600',
  twitter: 'bg-black',
  linkedin: 'bg-blue-700',
  tiktok: 'bg-gradient-to-br from-cyan-400 to-pink-500',
};

export const platformNames: Record<Platform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  twitter: 'X (Twitter)',
  linkedin: 'LinkedIn',
  tiktok: 'TikTok',
};

export const trendingTopics = [
  { topic: '#AIMarketing', posts: '125K posts', trending: '+45%' },
  { topic: '#SocialMediaTips', posts: '89K posts', trending: '+32%' },
  { topic: '#ContentCreation', posts: '67K posts', trending: '+28%' },
  { topic: '#DigitalMarketing', posts: '234K posts', trending: '+18%' },
  { topic: '#Entrepreneurship', posts: '156K posts', trending: '+15%' },
];
