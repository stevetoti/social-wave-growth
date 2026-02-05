'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/logo';
import {
  Calendar,
  BarChart3,
  Sparkles,
  Share2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Target,
  FileText,
  Globe,
  Inbox,
  Upload,
  Settings,
  Zap,
  TrendingUp,
  Clock,
  Users,
  Layers,
  Bot,
  Wand2,
  Brain,
  //MessageSquare,
  PieChart,
  LineChart,
  Image as ImageIcon,
  //Video,
  Hash,
  Bell,
  Filter,
  Download,
  Lock,
  Paintbrush,
  Gauge,
  Workflow,
  LayoutGrid,
  MousePointer,
  Eye,
  RefreshCw,
  Mail,
  Heart,
  //ThumbsUp,
  Activity,
  Award,
  ChevronRight,
  X,
  Menu,
} from 'lucide-react';
import { useState } from 'react';

// All 9 features with comprehensive details
const features = [
  {
    id: 'ai-studio',
    icon: Sparkles,
    title: 'AI Studio',
    tagline: 'Your AI-Powered Creative Partner',
    description: 'Transform your content creation with cutting-edge AI that understands your brand voice, audience, and industry trends. Generate engaging captions, hashtags, and full posts in seconds.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconColor: 'text-purple-600',
    path: '/dashboard/ai-studio',
    benefits: [
      {
        icon: Brain,
        title: 'Smart Caption Generation',
        description: 'AI analyzes your image, brand voice, and audience preferences to generate perfectly tailored captions.',
      },
      {
        icon: Hash,
        title: 'Intelligent Hashtag Recommendations',
        description: 'Get data-driven hashtag suggestions based on reach potential, competition, and relevance.',
      },
      {
        icon: Wand2,
        title: 'Content Idea Brainstorming',
        description: 'Never run out of ideas. AI generates content concepts based on trends and your niche.',
      },
      {
        icon: Paintbrush,
        title: 'Tone & Style Customization',
        description: 'Choose from professional, casual, witty, inspirational, and more. Your brand, your voice.',
      },
      {
        icon: Globe,
        title: 'Multi-Language Support',
        description: 'Generate content in 50+ languages. Perfect for global brands and diverse audiences.',
      },
      {
        icon: Bot,
        title: 'Brand Voice Learning',
        description: 'The more you use it, the smarter it gets. AI learns your unique style over time.',
      },
    ],
    useCases: [
      'Generate 10 Instagram caption variations in 30 seconds',
      'Create week-long content calendars with AI suggestions',
      'Repurpose blog posts into social media content',
      'Generate platform-specific versions of the same message',
    ],
    stats: [
      { value: '2M+', label: 'Captions generated' },
      { value: '85%', label: 'Time saved on content' },
      { value: '50+', label: 'Languages supported' },
    ],
  },
  {
    id: 'compose',
    icon: Share2,
    title: 'Compose',
    tagline: 'Write Once, Publish Everywhere',
    description: 'Create beautiful posts for all your social platforms from one intelligent composer. Platform-specific formatting, media optimization, and preview ensure your content looks perfect everywhere.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconColor: 'text-blue-600',
    path: '/dashboard/compose',
    benefits: [
      {
        icon: LayoutGrid,
        title: 'Multi-Platform Creation',
        description: 'Compose once and adapt for Instagram, Facebook, X, LinkedIn, and TikTok simultaneously.',
      },
      {
        icon: ImageIcon,
        title: 'Media Library Integration',
        description: 'Access your entire media library, Canva designs, and stock photos from within the composer.',
      },
      {
        icon: Eye,
        title: 'Live Preview',
        description: 'See exactly how your post will look on each platform before publishing.',
      },
      {
        icon: Layers,
        title: 'Platform-Specific Formatting',
        description: 'Automatic character limits, hashtag counts, and media optimization per platform.',
      },
      {
        icon: Users,
        title: 'Draft & Collaboration',
        description: 'Save drafts, share with team members, and collaborate with approval workflows.',
      },
      {
        icon: Gauge,
        title: 'Character & Limit Tracking',
        description: 'Real-time counters for characters, hashtags, and mentions to stay within limits.',
      },
    ],
    useCases: [
      'Create a product launch post for 5 platforms at once',
      'Collaborate with team on content with approval workflow',
      'Schedule carousel posts with multiple images',
      'Save templates for recurring content types',
    ],
    stats: [
      { value: '5M+', label: 'Posts created' },
      { value: '5', label: 'Platforms supported' },
      { value: '60%', label: 'Faster than manual' },
    ],
  },
  {
    id: 'calendar',
    icon: Calendar,
    title: 'Calendar',
    tagline: 'Your Visual Content Command Center',
    description: 'Plan and visualize your entire content strategy with our intuitive drag-and-drop calendar. See posts across all platforms, spot gaps, and ensure consistent publishing.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconColor: 'text-green-600',
    path: '/dashboard/calendar',
    benefits: [
      {
        icon: MousePointer,
        title: 'Drag-and-Drop Scheduling',
        description: 'Effortlessly reschedule posts by dragging them to new dates and times.',
      },
      {
        icon: Paintbrush,
        title: 'Color-Coded by Platform',
        description: 'Instantly identify which platforms have content scheduled with visual color coding.',
      },
      {
        icon: LayoutGrid,
        title: 'Multiple View Options',
        description: 'Switch between day, week, month, and quarter views to plan at any scale.',
      },
      {
        icon: Clock,
        title: 'Best Time Recommendations',
        description: 'AI suggests optimal posting times based on your audience activity patterns.',
      },
      {
        icon: Workflow,
        title: 'Content Queue Management',
        description: 'Organize posts in queues that auto-publish at your preferred intervals.',
      },
      {
        icon: Bell,
        title: 'Holiday & Event Reminders',
        description: 'Never miss important dates with built-in holiday calendars and custom reminders.',
      },
    ],
    useCases: [
      'Plan entire month of content in one session',
      'Visualize campaign schedules across platforms',
      'Identify content gaps and opportunities',
      'Coordinate team content with shared calendar',
    ],
    stats: [
      { value: '10M+', label: 'Posts scheduled' },
      { value: '99.9%', label: 'On-time delivery' },
      { value: '4', label: 'View modes' },
    ],
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics',
    tagline: 'Data-Driven Social Success',
    description: 'Understand what works with comprehensive analytics across all platforms. Track growth, engagement, reach, and ROI with beautiful, actionable dashboards.',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconColor: 'text-orange-600',
    path: '/dashboard/analytics',
    benefits: [
      {
        icon: Activity,
        title: 'Real-Time Performance',
        description: 'Watch your metrics update in real-time as engagement rolls in.',
      },
      {
        icon: Heart,
        title: 'Engagement Analysis',
        description: 'Deep dive into likes, comments, shares, and saves to understand what resonates.',
      },
      {
        icon: TrendingUp,
        title: 'Follower Growth Trends',
        description: 'Track follower growth over time and identify what drives increases or decreases.',
      },
      {
        icon: Award,
        title: 'Top Performing Content',
        description: 'Instantly see your best posts and understand why they performed well.',
      },
      {
        icon: Users,
        title: 'Audience Demographics',
        description: 'Know your audience: age, gender, location, and active hours.',
      },
      {
        icon: Calendar,
        title: 'Custom Date Ranges',
        description: 'Analyze any time period with flexible date range selection.',
      },
    ],
    useCases: [
      'Track campaign ROI with before/after comparison',
      'Identify best posting times from historical data',
      'Compare performance across platforms',
      'Report on KPIs to stakeholders or clients',
    ],
    stats: [
      { value: '100M+', label: 'Data points analyzed' },
      { value: '15+', label: 'Metrics tracked' },
      { value: '24/7', label: 'Real-time updates' },
    ],
  },
  {
    id: 'inbox',
    icon: Inbox,
    title: 'Inbox',
    tagline: 'Never Miss a Conversation',
    description: 'Manage all your social media messages, comments, and mentions from one unified inbox. Smart filtering and team collaboration make engagement effortless.',
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    iconColor: 'text-indigo-600',
    path: '/dashboard/inbox',
    benefits: [
      {
        icon: Layers,
        title: 'Unified Message Center',
        description: 'All DMs, comments, and mentions from every platform in one streamlined inbox.',
      },
      {
        icon: Filter,
        title: 'Smart Priority Filtering',
        description: 'AI identifies important messages and filters spam, so you focus on what matters.',
      },
      {
        icon: Zap,
        title: 'Quick Reply Templates',
        description: 'Save time with customizable templates for common questions and responses.',
      },
      {
        icon: Users,
        title: 'Team Assignment & Notes',
        description: 'Assign conversations to team members and add internal notes for context.',
      },
      {
        icon: Heart,
        title: 'Sentiment Detection',
        description: 'AI detects positive, negative, and neutral messages to prioritize responses.',
      },
      {
        icon: Clock,
        title: 'Response Time Tracking',
        description: 'Monitor and improve your average response time with built-in metrics.',
      },
    ],
    useCases: [
      'Respond to customer inquiries across all platforms',
      'Manage crisis communications efficiently',
      'Track and improve customer service metrics',
      'Collaborate with team on community management',
    ],
    stats: [
      { value: '50M+', label: 'Messages managed' },
      { value: '70%', label: 'Faster response time' },
      { value: '5', label: 'Platforms unified' },
    ],
  },
  {
    id: 'competitors',
    icon: Target,
    title: 'Competitors',
    tagline: 'Stay Ahead of the Competition',
    description: 'Monitor competitor strategies, benchmark your performance, and discover winning tactics. Know what works in your industry before your competitors do.',
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconColor: 'text-red-600',
    path: '/dashboard/competitors',
    benefits: [
      {
        icon: Eye,
        title: 'Competitor Account Monitoring',
        description: 'Track unlimited competitor accounts and see all their public activity.',
      },
      {
        icon: PieChart,
        title: 'Performance Benchmarking',
        description: 'Compare your metrics against competitors to understand where you stand.',
      },
      {
        icon: LineChart,
        title: 'Content Strategy Analysis',
        description: 'See what types of content perform best for competitors and industry leaders.',
      },
      {
        icon: TrendingUp,
        title: 'Growth Rate Comparison',
        description: 'Track how fast competitors are growing compared to your accounts.',
      },
      {
        icon: Award,
        title: 'Top Performing Posts',
        description: 'Discover competitors\' most engaging content for inspiration.',
      },
      {
        icon: Bell,
        title: 'Industry Trend Alerts',
        description: 'Get notified when competitors launch campaigns or trends emerge.',
      },
    ],
    useCases: [
      'Benchmark against top 5 competitors monthly',
      'Discover successful content strategies in your niche',
      'Track competitor campaign launches',
      'Identify gaps in competitor strategies to exploit',
    ],
    stats: [
      { value: '500K+', label: 'Competitors tracked' },
      { value: '10+', label: 'Comparison metrics' },
      { value: 'Real-time', label: 'Monitoring' },
    ],
  },
  {
    id: 'bulk-upload',
    icon: Upload,
    title: 'Bulk Upload',
    tagline: 'Scale Your Content Operations',
    description: 'Upload and schedule hundreds of posts at once with our powerful bulk tools. Perfect for agencies, franchises, and high-volume content operations.',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    iconColor: 'text-teal-600',
    path: '/dashboard/bulk-upload',
    benefits: [
      {
        icon: FileText,
        title: 'CSV/Excel Import',
        description: 'Upload content from spreadsheets with our simple import format.',
      },
      {
        icon: ImageIcon,
        title: 'Batch Media Upload',
        description: 'Upload hundreds of images and videos at once with automatic organization.',
      },
      {
        icon: Calendar,
        title: 'Schedule Mapping',
        description: 'Map content to dates and times automatically based on your preferences.',
      },
      {
        icon: CheckCircle2,
        title: 'Error Validation',
        description: 'Automatic checks for character limits, format issues, and missing media.',
      },
      {
        icon: Activity,
        title: 'Progress Tracking',
        description: 'Monitor upload progress and get notified when processing completes.',
      },
      {
        icon: Layers,
        title: 'Template Support',
        description: 'Use templates to standardize bulk uploads across your team.',
      },
    ],
    useCases: [
      'Schedule entire month of content in one upload',
      'Migrate content from another tool easily',
      'Manage content for multiple franchise locations',
      'Upload evergreen content libraries',
    ],
    stats: [
      { value: '1M+', label: 'Bulk posts uploaded' },
      { value: '1000', label: 'Posts per upload' },
      { value: '95%', label: 'Time saved' },
    ],
  },
  {
    id: 'reports',
    icon: FileText,
    title: 'Reports',
    tagline: 'Beautiful Reports, Zero Effort',
    description: 'Generate stunning, comprehensive reports for clients or stakeholders. White-label branding, automated delivery, and multiple export formats make reporting effortless.',
    color: 'from-slate-500 to-gray-600',
    bgColor: 'bg-slate-50',
    borderColor: 'border-slate-200',
    iconColor: 'text-slate-600',
    path: '/dashboard/reports',
    benefits: [
      {
        icon: Zap,
        title: 'Automated Generation',
        description: 'Schedule reports to generate automatically at your preferred intervals.',
      },
      {
        icon: Paintbrush,
        title: 'White-Label Branding',
        description: 'Add your logo, colors, and branding for professional client deliverables.',
      },
      {
        icon: Download,
        title: 'Multiple Export Formats',
        description: 'Export as PDF, Excel, PowerPoint, or share via link.',
      },
      {
        icon: Mail,
        title: 'Scheduled Delivery',
        description: 'Automatically email reports to clients on a weekly or monthly basis.',
      },
      {
        icon: Users,
        title: 'Client-Friendly Format',
        description: 'Clear visualizations and executive summaries anyone can understand.',
      },
      {
        icon: LineChart,
        title: 'Performance Summaries',
        description: 'Highlight wins, insights, and recommendations in every report.',
      },
    ],
    useCases: [
      'Send weekly performance reports to clients',
      'Create executive summaries for stakeholders',
      'Track campaign ROI with custom reports',
      'Compare performance across accounts',
    ],
    stats: [
      { value: '2M+', label: 'Reports generated' },
      { value: '4', label: 'Export formats' },
      { value: '100%', label: 'Customizable' },
    ],
  },
  {
    id: 'settings',
    icon: Settings,
    title: 'Settings',
    tagline: 'Full Control at Your Fingertips',
    description: 'Complete control over your account, team permissions, connected platforms, notifications, and security. Customize Social Wave Growth to work exactly how you need it.',
    color: 'from-gray-500 to-zinc-600',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200',
    iconColor: 'text-gray-600',
    path: '/dashboard/settings',
    benefits: [
      {
        icon: Users,
        title: 'Account & Profile',
        description: 'Manage your profile, preferences, and account information.',
      },
      {
        icon: Lock,
        title: 'Team Permissions',
        description: 'Control exactly what each team member can access and modify.',
      },
      {
        icon: Layers,
        title: 'Platform Connections',
        description: 'Connect, disconnect, and manage all your social account connections.',
      },
      {
        icon: Bell,
        title: 'Notification Preferences',
        description: 'Customize which notifications you receive and how.',
      },
      {
        icon: RefreshCw,
        title: 'Billing & Subscription',
        description: 'Manage your plan, view invoices, and update payment methods.',
      },
      {
        icon: Lock,
        title: 'Security Settings',
        description: 'Two-factor authentication, session management, and activity logs.',
      },
    ],
    useCases: [
      'Onboard new team members with correct permissions',
      'Connect new social accounts as you grow',
      'Customize notifications for your workflow',
      'Manage subscription and billing',
    ],
    stats: [
      { value: '50K+', label: 'Active accounts' },
      { value: '5', label: 'User roles' },
      { value: '2FA', label: 'Security included' },
    ],
  },
];

// Comparison with competitors
const competitorComparison = [
  { feature: 'AI Content Generation', socialWave: true, competitor1: true, competitor2: false, competitor3: false },
  { feature: 'Unified Social Inbox', socialWave: true, competitor1: true, competitor2: true, competitor3: false },
  { feature: 'Competitor Tracking', socialWave: true, competitor1: false, competitor2: true, competitor3: false },
  { feature: 'White-Label Reports', socialWave: true, competitor1: true, competitor2: false, competitor3: false },
  { feature: 'Bulk Upload (CSV)', socialWave: true, competitor1: true, competitor2: true, competitor3: true },
  { feature: 'Best Time to Post AI', socialWave: true, competitor1: true, competitor2: false, competitor3: false },
  { feature: 'Team Collaboration', socialWave: true, competitor1: true, competitor2: true, competitor3: false },
  { feature: 'Visual Content Calendar', socialWave: true, competitor1: true, competitor2: true, competitor3: true },
  { feature: 'TikTok Support', socialWave: true, competitor1: false, competitor2: true, competitor3: false },
  { feature: 'Affordable Pricing', socialWave: true, competitor1: false, competitor2: false, competitor3: true },
];

export default function FeaturesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Logo />
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <Link href="/pricing">
                <Button variant="ghost">Pricing</Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-secondary-500 hover:bg-secondary-600 text-white">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col gap-2 px-4">
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Pricing</Button>
              </Link>
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Log In</Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-secondary-500 hover:bg-secondary-600 text-white">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-white/10 text-white border border-white/20 px-4 py-1.5">
            All Features
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Every Tool You Need to{' '}
            <span className="text-secondary-400">Dominate Social Media</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
            9 powerful features designed to save you time, boost engagement, and grow your audience across all platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg">
                Start Free 14-Day Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#features-list">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
                Explore Features
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Feature Nav */}
      <section className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto py-4 gap-4 no-scrollbar">
            {features.map((feature) => (
              <a
                key={feature.id}
                href={`#${feature.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 whitespace-nowrap text-sm font-medium transition-colors"
              >
                <feature.icon className="w-4 h-4" />
                {feature.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Individual Feature Sections */}
      <section id="features-list" className="py-20">
        {features.map((feature, index) => (
          <div
            key={feature.id}
            id={feature.id}
            className={`py-20 px-4 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
          >
            <div className="max-w-7xl mx-auto">
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center`}>
                      <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">{feature.title}</h2>
                      <p className={`font-medium bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                        {feature.tagline}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Benefits grid */}
                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {feature.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-xl ${feature.bgColor} flex items-center justify-center shrink-0`}>
                          <benefit.icon className={`w-5 h-5 ${feature.iconColor}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 text-sm">{benefit.title}</h4>
                          <p className="text-gray-600 text-xs leading-relaxed">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Use cases */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-gray-900 mb-3">Common Use Cases:</h4>
                    <ul className="space-y-2">
                      {feature.useCases.map((useCase, i) => (
                        <li key={i} className="flex items-center gap-2 text-gray-600">
                          <CheckCircle2 className="w-4 h-4 text-secondary-500 shrink-0" />
                          <span className="text-sm">{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href="/signup">
                    <Button className="bg-secondary-500 hover:bg-secondary-600 text-white">
                      Try {feature.title} Free
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>

                {/* Visual / Mockup */}
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className={`relative rounded-2xl border-2 ${feature.borderColor} bg-white shadow-2xl overflow-hidden`}>
                    {/* Browser chrome */}
                    <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                      </div>
                      <div className="flex-1 bg-white rounded px-3 py-1 text-xs text-gray-400 text-center">
                        socialwavegrowth.com{feature.path}
                      </div>
                    </div>

                    {/* Feature mockup content */}
                    <div className={`p-6 bg-gradient-to-br ${feature.bgColor} min-h-[300px]`}>
                      {/* Stats bar */}
                      <div className="flex justify-between items-center mb-6">
                        {feature.stats.map((stat, i) => (
                          <div key={i} className="text-center">
                            <p className={`text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                              {stat.value}
                            </p>
                            <p className="text-xs text-gray-500">{stat.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Feature-specific mockup */}
                      <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                          <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                          <span className="font-semibold text-gray-900">{feature.title} Dashboard</span>
                        </div>
                        
                        {/* Generic mockup content based on feature type */}
                        {feature.id === 'calendar' && (
                          <div className="grid grid-cols-7 gap-1">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                              <div key={i} className="text-center text-xs text-gray-400 py-1">{d}</div>
                            ))}
                            {[...Array(28)].map((_, i) => (
                              <div 
                                key={i} 
                                className={`text-center text-xs py-2 rounded ${
                                  [3, 7, 12, 14, 19, 21, 26].includes(i) 
                                    ? 'bg-green-100 text-green-700 font-medium' 
                                    : 'text-gray-600'
                                }`}
                              >
                                {i + 1}
                              </div>
                            ))}
                          </div>
                        )}

                        {feature.id === 'analytics' && (
                          <div className="h-32 flex items-end gap-2 mb-2">
                            {[35, 45, 55, 65, 50, 70, 80, 75, 90, 85, 95, 100].map((h, i) => (
                              <div 
                                key={i} 
                                className="flex-1 bg-gradient-to-t from-orange-500 to-orange-300 rounded-t" 
                                style={{ height: `${h}%` }} 
                              />
                            ))}
                          </div>
                        )}

                        {feature.id === 'ai-studio' && (
                          <div className="space-y-3">
                            <div className="bg-purple-50 rounded-lg p-3">
                              <p className="text-xs text-gray-500 mb-1">Generated Caption:</p>
                              <p className="text-sm text-gray-700">&quot;Ready to transform your mornings? ☀️ Our new blend is crafted for those who dare to dream big. #MorningMotivation #CoffeeLover&quot;</p>
                            </div>
                            <div className="flex gap-2">
                              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">#coffee</span>
                              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">#morning</span>
                              <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">#lifestyle</span>
                            </div>
                          </div>
                        )}

                        {feature.id === 'inbox' && (
                          <div className="space-y-2">
                            {[
                              { name: 'Sarah M.', msg: 'Love your new product! 😍', platform: 'Instagram' },
                              { name: 'John D.', msg: 'When will this be available?', platform: 'Facebook' },
                              { name: 'Emma L.', msg: 'Great content as always!', platform: 'Twitter' },
                            ].map((m, i) => (
                              <div key={i} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-xs font-bold text-indigo-600">
                                  {m.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{m.name}</p>
                                  <p className="text-xs text-gray-500 truncate">{m.msg}</p>
                                </div>
                                <span className="text-xs text-gray-400">{m.platform}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {feature.id === 'compose' && (
                          <div className="space-y-3">
                            <textarea 
                              className="w-full border border-gray-200 rounded-lg p-3 text-sm resize-none"
                              rows={3}
                              placeholder="What's on your mind?"
                              defaultValue="Excited to announce our biggest sale of the year! 🎉 Use code SUMMER20 for 20% off everything."
                            />
                            <div className="flex gap-2">
                              {['instagram', 'facebook', 'twitter'].map((p) => (
                                <div key={p} className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                                  <CheckCircle2 className="w-4 h-4 text-blue-600" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {feature.id === 'competitors' && (
                          <div className="space-y-2">
                            {[
                              { name: 'Competitor A', followers: '125K', growth: '+5.2%' },
                              { name: 'Competitor B', followers: '98K', growth: '+3.1%' },
                              { name: 'Your Account', followers: '145K', growth: '+8.7%', highlight: true },
                            ].map((c, i) => (
                              <div key={i} className={`flex items-center justify-between p-2 rounded-lg ${c.highlight ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
                                <span className={`text-sm ${c.highlight ? 'font-bold text-green-700' : 'text-gray-700'}`}>{c.name}</span>
                                <span className="text-sm text-gray-600">{c.followers}</span>
                                <span className={`text-sm font-medium ${c.highlight ? 'text-green-600' : 'text-gray-500'}`}>{c.growth}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {feature.id === 'bulk-upload' && (
                          <div className="border-2 border-dashed border-teal-300 rounded-lg p-6 text-center bg-teal-50">
                            <Upload className="w-10 h-10 text-teal-500 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Drop your CSV file here or click to browse</p>
                            <p className="text-xs text-gray-400 mt-1">Up to 1,000 posts per upload</p>
                          </div>
                        )}

                        {feature.id === 'reports' && (
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-700">Monthly Report - Jan 2025</span>
                              <Badge className="bg-green-100 text-green-700">Ready</Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {['PDF', 'Excel', 'PowerPoint', 'Link'].map((format) => (
                                <button key={format} className="flex items-center justify-center gap-2 p-2 bg-gray-50 rounded-lg text-xs text-gray-600 hover:bg-gray-100">
                                  <Download className="w-3 h-3" />
                                  {format}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}

                        {feature.id === 'settings' && (
                          <div className="space-y-2">
                            {[
                              { label: 'Profile Settings', icon: Users },
                              { label: 'Connected Accounts', icon: Layers },
                              { label: 'Team Permissions', icon: Lock },
                              { label: 'Notifications', icon: Bell },
                            ].map((item, i) => (
                              <div key={i} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer">
                                <div className="flex items-center gap-2">
                                  <item.icon className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">{item.label}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary-100 text-secondary-700 px-4 py-1.5">
              Why Choose Us
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Compare Social Wave Growth
            </h2>
            <p className="text-lg text-gray-600">
              See how we stack up against other social media management tools.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left py-4 px-6 font-semibold text-gray-600">Feature</th>
                    <th className="text-center py-4 px-6 font-semibold text-primary-600 bg-primary-50">Social Wave Growth</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-500">Hootsuite</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-500">Sprout Social</th>
                    <th className="text-center py-4 px-6 font-medium text-gray-500">Buffer</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorComparison.map((row, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="py-4 px-6 text-gray-700">{row.feature}</td>
                      <td className="py-4 px-6 text-center bg-primary-50">
                        {row.socialWave ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.competitor1 ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.competitor2 ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                      <td className="py-4 px-6 text-center">
                        {row.competitor3 ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary-500 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Experience These Features?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Start your free 14-day trial and unlock all features. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-secondary-600 hover:bg-gray-100 shadow-xl">
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Logo className="[&_span]:text-white" />
            <div className="flex gap-6 text-sm">
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/terms" className="hover:text-white">Terms</Link>
              <a href="mailto:support@socialwavegrowth.com" className="hover:text-white">Support</a>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} Social Wave Growth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
