'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/logo';
import { PlatformIcon } from '@/components/platform-icon';
import { Platform } from '@/lib/types';
import {
  Calendar,
  BarChart3,
  Sparkles,
  Share2,
  Clock,
  CheckCircle2,
  ArrowRight,
  Menu,
  X,
  Target,
  FileText,
  ChevronDown,
  Globe,
  Building,
  User,
  Briefcase,
  Store,
  Inbox,
  Upload,
  Settings,
  Zap,
  TrendingUp,
  Shield,
  Play,
  Star,
  LayoutDashboard,
  PieChart,
  ChevronRight,
  Layers,
  HeadphonesIcon,
} from 'lucide-react';
import { useState } from 'react';

const platforms: Platform[] = ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'];

// All 9 dashboard features with detailed info
const dashboardFeatures = [
  {
    id: 'ai-studio',
    icon: Sparkles,
    title: 'AI Studio',
    shortDesc: 'AI-powered content generation',
    fullDesc: 'Harness the power of advanced AI to create engaging content that resonates with your audience. Generate captions, hashtags, and full posts in seconds.',
    path: '/dashboard/ai-studio',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    iconColor: 'text-purple-600',
    features: [
      'Generate captions for any platform',
      'Smart hashtag recommendations',
      'Content idea brainstorming',
      'Tone and style customization',
      'Multi-language support',
      'Brand voice learning',
    ],
    stats: { label: 'Content generated', value: '2M+' },
  },
  {
    id: 'compose',
    icon: Share2,
    title: 'Compose',
    shortDesc: 'Create posts for multiple platforms',
    fullDesc: 'Write once, publish everywhere. Our intelligent composer adapts your content for each platform while maintaining your brand voice.',
    path: '/dashboard/compose',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    features: [
      'Multi-platform post creation',
      'Media library integration',
      'Preview before posting',
      'Platform-specific formatting',
      'Draft saving & collaboration',
      'Character count & limits',
    ],
    stats: { label: 'Posts created', value: '5M+' },
  },
  {
    id: 'calendar',
    icon: Calendar,
    title: 'Calendar',
    shortDesc: 'Visual content calendar',
    fullDesc: 'See your entire content strategy at a glance. Drag-and-drop scheduling makes planning effortless across all your channels.',
    path: '/dashboard/calendar',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
    features: [
      'Drag-and-drop scheduling',
      'Color-coded by platform',
      'Week, month & quarter views',
      'Best time recommendations',
      'Content queue management',
      'Holiday & event reminders',
    ],
    stats: { label: 'Posts scheduled', value: '10M+' },
  },
  {
    id: 'analytics',
    icon: BarChart3,
    title: 'Analytics',
    shortDesc: 'Performance metrics & insights',
    fullDesc: 'Understand what works with comprehensive analytics. Track growth, engagement, and ROI across all platforms in one dashboard.',
    path: '/dashboard/analytics',
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-50',
    iconColor: 'text-orange-600',
    features: [
      'Real-time performance tracking',
      'Engagement rate analysis',
      'Follower growth trends',
      'Best performing content',
      'Audience demographics',
      'Custom date ranges',
    ],
    stats: { label: 'Data points analyzed', value: '100M+' },
  },
  {
    id: 'inbox',
    icon: Inbox,
    title: 'Inbox',
    shortDesc: 'Unified social inbox',
    fullDesc: 'Never miss a message or comment. Manage all your social conversations from one unified inbox with smart filtering.',
    path: '/dashboard/inbox',
    color: 'from-indigo-500 to-violet-500',
    bgColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    features: [
      'All messages in one place',
      'Smart priority filtering',
      'Quick reply templates',
      'Team assignment & notes',
      'Sentiment detection',
      'Response time tracking',
    ],
    stats: { label: 'Messages managed', value: '50M+' },
  },
  {
    id: 'competitors',
    icon: Target,
    title: 'Competitors',
    shortDesc: 'Track competitor performance',
    fullDesc: 'Stay ahead of the competition. Monitor competitor strategies, benchmark your performance, and discover winning tactics.',
    path: '/dashboard/competitors',
    color: 'from-red-500 to-rose-500',
    bgColor: 'bg-red-50',
    iconColor: 'text-red-600',
    features: [
      'Competitor account monitoring',
      'Performance benchmarking',
      'Content strategy analysis',
      'Growth rate comparison',
      'Top performing posts',
      'Industry trend alerts',
    ],
    stats: { label: 'Competitors tracked', value: '500K+' },
  },
  {
    id: 'bulk-upload',
    icon: Upload,
    title: 'Bulk Upload',
    shortDesc: 'Mass content upload',
    fullDesc: 'Upload and schedule hundreds of posts at once. Perfect for agencies and businesses with high-volume content needs.',
    path: '/dashboard/bulk-upload',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50',
    iconColor: 'text-teal-600',
    features: [
      'CSV/Excel import',
      'Batch image upload',
      'Schedule mapping',
      'Error validation',
      'Progress tracking',
      'Template support',
    ],
    stats: { label: 'Bulk posts uploaded', value: '1M+' },
  },
  {
    id: 'reports',
    icon: FileText,
    title: 'Reports',
    shortDesc: 'Detailed reports & exports',
    fullDesc: 'Generate beautiful, comprehensive reports for clients or stakeholders. White-label options available for agencies.',
    path: '/dashboard/reports',
    color: 'from-slate-500 to-gray-600',
    bgColor: 'bg-slate-50',
    iconColor: 'text-slate-600',
    features: [
      'Automated report generation',
      'Custom branding (white-label)',
      'PDF & Excel exports',
      'Scheduled delivery',
      'Client-friendly format',
      'Performance summaries',
    ],
    stats: { label: 'Reports generated', value: '2M+' },
  },
  {
    id: 'settings',
    icon: Settings,
    title: 'Settings',
    shortDesc: 'Account management',
    fullDesc: 'Full control over your account, team permissions, connected platforms, and notification preferences.',
    path: '/dashboard/settings',
    color: 'from-gray-500 to-zinc-600',
    bgColor: 'bg-gray-50',
    iconColor: 'text-gray-600',
    features: [
      'Account & profile management',
      'Team member permissions',
      'Platform connections',
      'Notification preferences',
      'Billing & subscription',
      'Security settings',
    ],
    stats: { label: 'Active accounts', value: '50K+' },
  },
];

const steps = [
  {
    number: '01',
    title: 'Connect Your Accounts',
    description: 'Link all your social media accounts in under 2 minutes. We support Instagram, Facebook, X, LinkedIn, TikTok, and more with secure OAuth.',
    icon: '🔗',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    number: '02',
    title: 'Create & Schedule',
    description: 'Use our AI-powered composer to create engaging content. Schedule posts across all platforms with our visual calendar.',
    icon: '📅',
    color: 'from-purple-500 to-pink-500',
  },
  {
    number: '03',
    title: 'Engage & Monitor',
    description: 'Manage all conversations from your unified inbox. Track mentions, respond to comments, and build relationships.',
    icon: '💬',
    color: 'from-green-500 to-emerald-500',
  },
  {
    number: '04',
    title: 'Analyze & Optimize',
    description: 'Track performance with detailed analytics. Understand what works and continuously improve your strategy.',
    icon: '📊',
    color: 'from-orange-500 to-amber-500',
  },
];

const useCases = [
  {
    icon: Building,
    title: 'Marketing Agencies',
    description: 'Manage dozens of client accounts from one dashboard. Generate white-label reports, streamline approvals, and scale your agency efficiently.',
    image: 'agency',
    features: [
      'Multi-client management',
      'White-label reports',
      'Team collaboration',
      'Client approval workflows',
      'Bulk scheduling',
      'Performance benchmarking',
    ],
    results: [
      { metric: '60%', label: 'Time saved on reporting' },
      { metric: '3x', label: 'More clients managed' },
      { metric: '40%', label: 'Higher client retention' },
    ],
  },
  {
    icon: Store,
    title: 'Brands & E-Commerce',
    description: 'Build brand awareness and drive sales with consistent social presence. Track campaign ROI and convert followers to customers.',
    image: 'brand',
    features: [
      'Campaign management',
      'Brand monitoring',
      'E-commerce integration',
      'UGC curation',
      'Influencer tracking',
      'Sales attribution',
    ],
    results: [
      { metric: '150%', label: 'Increase in engagement' },
      { metric: '45%', label: 'More website traffic' },
      { metric: '25%', label: 'Higher conversion rate' },
    ],
  },
  {
    icon: User,
    title: 'Content Creators',
    description: 'Focus on creating great content while we handle distribution. Grow your audience consistently across all platforms.',
    image: 'creator',
    features: [
      'Cross-platform posting',
      'Best time to post AI',
      'Audience insights',
      'Monetization tracking',
      'Collaboration tools',
      'Content repurposing',
    ],
    results: [
      { metric: '200%', label: 'Follower growth' },
      { metric: '5hrs', label: 'Saved per week' },
      { metric: '80%', label: 'Higher reach' },
    ],
  },
  {
    icon: Briefcase,
    title: 'Small Businesses',
    description: 'Look professional without hiring a social media team. Save hours every week with automated posting and AI content help.',
    image: 'smb',
    features: [
      'Easy-to-use interface',
      'AI content assistance',
      'Local business features',
      'Review management',
      'Affordable pricing',
      'Quick setup',
    ],
    results: [
      { metric: '10hrs', label: 'Saved weekly' },
      { metric: '75%', label: 'Cost reduction' },
      { metric: '2x', label: 'Online visibility' },
    ],
  },
];

const testimonials = [
  {
    quote: "Social Wave Growth completely transformed our agency. We went from managing 10 clients struggling to managing 40+ with ease. The white-label reports alone have been a game-changer for client retention.",
    author: 'Sarah Chen',
    role: 'Founder & CEO',
    company: 'Momentum Marketing Agency',
    avatar: 'SC',
    rating: 5,
    results: '+300% clients managed',
    industry: 'Marketing Agency',
    image: '/testimonials/sarah.jpg',
  },
  {
    quote: "The AI content suggestions are incredibly accurate. It feels like having a creative director on demand. We\'ve doubled our engagement rates and our content creation time has been cut in half.",
    author: 'Marcus Johnson',
    role: 'Head of Social Media',
    company: 'TechCrunch Ventures',
    avatar: 'MJ',
    rating: 5,
    results: '+180% engagement',
    industry: 'Technology',
    image: '/testimonials/marcus.jpg',
  },
  {
    quote: "Finally, a tool that makes multi-platform management actually simple. The unified inbox has saved us countless hours and our response time to customers improved by 70%.",
    author: 'Emily Rodriguez',
    role: 'Digital Marketing Director',
    company: 'Bloom Beauty Co.',
    avatar: 'ER',
    rating: 5,
    results: '70% faster response',
    industry: 'E-Commerce',
    image: '/testimonials/emily.jpg',
  },
  {
    quote: "We went from spending 25 hours a week on social media to just 8. The scheduling feature alone pays for itself. Plus, the analytics finally show us what actually works.",
    author: 'David Park',
    role: 'CEO',
    company: 'Sunrise Hospitality Group',
    avatar: 'DP',
    rating: 5,
    results: '68% time saved',
    industry: 'Hospitality',
    image: '/testimonials/david.jpg',
  },
  {
    quote: "The competitor tracking feature is incredible. We discovered what our top competitors were doing right and adapted our strategy. Our follower growth tripled in 4 months.",
    author: 'Lisa Thompson',
    role: 'Brand Manager',
    company: 'Velocity Sportswear',
    avatar: 'LT',
    rating: 5,
    results: '3x follower growth',
    industry: 'Retail',
    image: '/testimonials/lisa.jpg',
  },
  {
    quote: "As a solo creator, this tool is my secret weapon. I can batch-create a month of content in one afternoon. The AI helps me stay creative without burning out.",
    author: 'James Wilson',
    role: 'Content Creator',
    company: '2.1M Followers',
    avatar: 'JW',
    rating: 5,
    results: '+500K followers',
    industry: 'Influencer',
    image: '/testimonials/james.jpg',
  },
  {
    quote: "The ROI on Social Wave Growth is insane. We track every dollar spent on social media and it\'s the most cost-effective tool in our marketing stack. Period.",
    author: 'Amanda Foster',
    role: 'CMO',
    company: 'GrowthStack SaaS',
    avatar: 'AF',
    rating: 5,
    results: '450% ROI',
    industry: 'SaaS',
    image: '/testimonials/amanda.jpg',
  },
  {
    quote: "Managing social for 15 restaurants used to be a nightmare. Now I do it all from one place in a fraction of the time. The bulk upload feature is a lifesaver.",
    author: 'Roberto Martinez',
    role: 'Marketing Director',
    company: 'Casa Bella Restaurant Group',
    avatar: 'RM',
    rating: 5,
    results: '15 locations managed',
    industry: 'Food & Beverage',
    image: '/testimonials/roberto.jpg',
  },
];

const faqs = [
  {
    question: 'How many social media accounts can I connect?',
    answer: 'It depends on your plan. Starter includes 3 accounts, Pro includes 10, and Agency includes unlimited accounts. You can connect Instagram, Facebook, X (Twitter), LinkedIn, TikTok, Pinterest, and YouTube.',
  },
  {
    question: 'Does Social Wave Growth post automatically?',
    answer: "Yes! Once you schedule your content, we handle everything automatically. Posts go live at your scheduled times, even when you're asleep or on vacation. Our 99.9% uptime ensures your content is always delivered on time.",
  },
  {
    question: 'Can I try it before I buy?',
    answer: 'Absolutely! All plans come with a 14-day free trial with full access to all features. No credit card required to start. You can explore everything and see real results before committing.',
  },
  {
    question: 'Is there a limit on how many posts I can schedule?',
    answer: 'Starter plans include 30 scheduled posts per month, Pro includes unlimited scheduling, and Agency also offers unlimited scheduling. Most users find our limits more than generous for their needs.',
  },
  {
    question: 'How does the AI content generation work?',
    answer: 'Our AI analyzes your brand voice, industry trends, and top-performing content to generate caption suggestions, hashtag recommendations, and content ideas. It learns from your preferences over time to provide increasingly personalized suggestions.',
  },
  {
    question: 'Can I manage my team members and approve content?',
    answer: 'Yes! Pro and Agency plans include team collaboration features. Add team members, assign different roles (admin, editor, viewer), set up approval workflows, and ensure brand consistency across all posts.',
  },
  {
    question: 'What analytics and reporting features are included?',
    answer: 'All plans include basic analytics. Pro adds advanced analytics with custom date ranges and audience insights. Agency includes white-label reports, automated report scheduling, and custom branding for client deliverables.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer a 30-day money-back guarantee on all paid plans. If you\'re not completely satisfied, contact our support team within 30 days for a full refund, no questions asked.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-level 256-bit SSL encryption, are SOC 2 Type II compliant, and never store your social media passwords. Your data is backed up daily and you can export or delete it anytime.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time from your account settings. There are no long-term contracts or cancellation fees. Your access continues until the end of your billing period.',
  },
  {
    question: 'What kind of support do you offer?',
    answer: 'Starter plans include email support (24hr response). Pro plans include priority support (4hr response) with live chat. Agency plans include a dedicated account manager and phone support.',
  },
  {
    question: 'Do you have an API for custom integrations?',
    answer: 'Yes! Agency plans include full API access for custom integrations with your existing tools and workflows. Our REST API is well-documented and our team can help with implementation.',
  },
];

const pricingTiers = [
  {
    name: 'Starter',
    price: 19,
    period: 'month',
    yearlyPrice: 190,
    description: 'Perfect for individuals and small businesses getting started',
    features: [
      { text: '3 social accounts', included: true },
      { text: '30 scheduled posts/month', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Content calendar', included: true },
      { text: 'AI content suggestions', included: true },
      { text: 'Best time to post', included: true },
      { text: 'Email support', included: true },
      { text: 'Team collaboration', included: false },
      { text: 'Competitor tracking', included: false },
      { text: 'Social inbox', included: false },
      { text: 'White-label reports', included: false },
      { text: 'API access', included: false },
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 49,
    period: 'month',
    yearlyPrice: 490,
    description: 'For growing businesses and marketing teams',
    features: [
      { text: '10 social accounts', included: true },
      { text: 'Unlimited scheduled posts', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'AI content studio', included: true },
      { text: 'Competitor tracking (5)', included: true },
      { text: 'Social inbox', included: true },
      { text: 'Team collaboration (3 users)', included: true },
      { text: 'Bulk upload & scheduling', included: true },
      { text: 'Priority support', included: true },
      { text: 'Custom reports', included: true },
      { text: 'White-label reports', included: false },
      { text: 'API access', included: false },
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Agency',
    price: 99,
    period: 'month',
    yearlyPrice: 990,
    description: 'For agencies and enterprises with advanced needs',
    features: [
      { text: 'Unlimited social accounts', included: true },
      { text: 'Unlimited scheduled posts', included: true },
      { text: 'Full analytics suite', included: true },
      { text: 'Advanced AI features', included: true },
      { text: 'Unlimited competitor tracking', included: true },
      { text: 'Unified social inbox', included: true },
      { text: 'Unlimited team members', included: true },
      { text: 'White-label reports', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'API access', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA guarantee', included: true },
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const trustedCompanies = [
  { name: 'Acme Corp', logo: 'A' },
  { name: 'TechStart', logo: 'T' },
  { name: 'GrowthLabs', logo: 'G' },
  { name: 'Velocity', logo: 'V' },
  { name: 'BlueWave', logo: 'B' },
  { name: 'Summit', logo: 'S' },
  { name: 'Apex Digital', logo: 'A' },
  { name: 'Nova Media', logo: 'N' },
];

const integrations = [
  { name: 'Canva', category: 'Design' },
  { name: 'Google Analytics', category: 'Analytics' },
  { name: 'Shopify', category: 'E-Commerce' },
  { name: 'Zapier', category: 'Automation' },
  { name: 'Slack', category: 'Communication' },
  { name: 'HubSpot', category: 'CRM' },
  { name: 'Dropbox', category: 'Storage' },
  { name: 'Google Drive', category: 'Storage' },
];

const blogPosts = [
  {
    title: '10 Social Media Trends to Watch in 2025',
    excerpt: 'Discover the emerging trends that will shape social media marketing this year...',
    category: 'Trends',
    readTime: '5 min',
  },
  {
    title: 'How to Create a Content Calendar That Works',
    excerpt: 'A step-by-step guide to planning your social media content for maximum impact...',
    category: 'Strategy',
    readTime: '8 min',
  },
  {
    title: 'The Ultimate Guide to Instagram Reels',
    excerpt: 'Everything you need to know about creating engaging Reels that grow your audience...',
    category: 'Tutorial',
    readTime: '12 min',
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeUseCase, setActiveUseCase] = useState(0);
  const [isYearlyPricing, setIsYearlyPricing] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            
            <div className="hidden lg:flex items-center gap-8">
              <Link href="/features" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                Features
              </Link>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                How It Works
              </a>
              <a href="#use-cases" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                Use Cases
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                Pricing
              </a>
              <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                About
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg shadow-secondary-500/30">
                  Start Free Trial
                </Button>
              </Link>
            </div>

            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 shadow-lg">
            <div className="flex flex-col gap-2 px-4">
              <Link href="/features" className="py-2 text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Features</Link>
              <a href="#how-it-works" className="py-2 text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#use-cases" className="py-2 text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Use Cases</a>
              <a href="#pricing" className="py-2 text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <Link href="/about" className="py-2 text-gray-600 font-medium" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <hr className="my-2" />
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

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800" />
        
        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-secondary-500/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 -right-20 w-[500px] h-[500px] bg-secondary-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        
        {/* Video/Demo play indicator */}
        <div className="absolute top-32 right-10 hidden xl:flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Play className="w-4 h-4 text-primary-600 ml-0.5" fill="currentColor" />
          </div>
          <span className="text-white font-medium text-sm">Watch Demo</span>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Hero Text */}
            <div className="text-center lg:text-left">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />
                  ))}
                </span>
                <span className="text-white/90 text-sm font-medium">Trusted by 50,000+ businesses</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-6">
                Ride the Wave to{' '}
                <span className="relative">
                  <span className="bg-gradient-to-r from-secondary-300 via-secondary-400 to-secondary-300 bg-clip-text text-transparent">
                    Social Success
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M2 10C50 4 100 4 150 7C200 10 250 6 298 2" stroke="#EF5E33" strokeWidth="3" strokeLinecap="round" className="animate-pulse" />
                  </svg>
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Schedule posts, track analytics, generate AI content, and manage all your social media — 
                <span className="text-white font-semibold"> from one powerful dashboard.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/signup">
                  <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white text-lg px-8 h-14 shadow-xl shadow-secondary-500/40 w-full sm:w-auto">
                    Start Free 14-Day Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <a href="#demo">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-14 bg-white/10 border-white/30 text-white hover:bg-white/20 w-full sm:w-auto">
                    <Play className="mr-2 w-5 h-5" />
                    See It In Action
                  </Button>
                </a>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-white/70 text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  No credit card required
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  Cancel anytime
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  5-minute setup
                </span>
              </div>
            </div>

            {/* Right: Dashboard Preview Mockup */}
            <div className="hidden lg:block relative">
              {/* Main dashboard card */}
              <div className="relative bg-white/[0.08] backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl transform perspective-1000 rotate-y-[-5deg]">
                {/* Browser chrome */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 bg-white/10 rounded-lg px-4 py-1.5 text-center">
                    <span className="text-white/60 text-sm">app.socialwavegrowth.com/dashboard</span>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 text-center border border-white/10">
                    <p className="text-3xl font-bold text-white mb-1">45.2K</p>
                    <p className="text-white/50 text-xs mb-1">Total Followers</p>
                    <p className="text-green-400 text-xs font-medium flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +12.5%
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 text-center border border-white/10">
                    <p className="text-3xl font-bold text-white mb-1">4.8%</p>
                    <p className="text-white/50 text-xs mb-1">Engagement Rate</p>
                    <p className="text-green-400 text-xs font-medium flex items-center justify-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +2.1%
                    </p>
                  </div>
                  <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-4 text-center border border-white/10">
                    <p className="text-3xl font-bold text-white mb-1">28</p>
                    <p className="text-white/50 text-xs mb-1">Posts Scheduled</p>
                    <p className="text-white/40 text-xs">Next 7 days</p>
                  </div>
                </div>

                {/* Mini chart mockup */}
                <div className="bg-white/5 rounded-xl p-4 mb-4 border border-white/10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-semibold text-sm">Growth Analytics</span>
                    <span className="text-white/50 text-xs bg-white/10 px-2 py-1 rounded">Last 30 days</span>
                  </div>
                  <div className="flex items-end gap-1 h-20">
                    {[40, 55, 45, 60, 50, 70, 65, 80, 75, 90, 85, 95].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-gradient-to-t from-secondary-500 to-secondary-400 rounded-t opacity-80"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>

                {/* Platform icons */}
                <div className="flex justify-center gap-4">
                  {platforms.map((platform) => (
                    <div key={platform} className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
                      <PlatformIcon platform={platform} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating notification cards */}
              <div className="absolute -top-4 -right-4 bg-white text-gray-900 px-4 py-3 rounded-xl shadow-2xl text-sm font-medium flex items-center gap-2 animate-bounce">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold">Post Published!</p>
                  <p className="text-xs text-gray-500">Instagram • Just now</p>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-white text-gray-900 px-4 py-3 rounded-xl shadow-2xl text-sm flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold">AI Generated 5 captions</p>
                  <p className="text-xs text-gray-500">Ready to review</p>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-4 py-2 rounded-lg shadow-xl text-sm font-semibold">
                5 Platforms Connected ✓
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ANIMATED STATS BAR ===== */}
      <section className="relative -mt-12 z-10 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 md:p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">100K+</p>
              <p className="text-gray-500 font-medium mt-2">Posts Scheduled Daily</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">50K+</p>
              <p className="text-gray-500 font-medium mt-2">Active Businesses</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">10M+</p>
              <p className="text-gray-500 font-medium mt-2">Followers Grown</p>
            </div>
            <div className="text-center">
              <p className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">99.9%</p>
              <p className="text-gray-500 font-medium mt-2">Platform Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUSTED BY LOGOS ===== */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-gray-400 font-medium mb-8 uppercase tracking-wide text-sm">Trusted by industry-leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {trustedCompanies.map((company, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300 hover:text-gray-400 transition-colors">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-gray-400">
                  {company.logo}
                </div>
                <span className="font-semibold text-lg text-gray-400">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary-100 text-secondary-700 px-4 py-1.5">
              Simple Process
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Go Live in <span className="text-secondary-500">4 Simple Steps</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No technical skills needed. Set up your social media command center in minutes, not hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connector line - desktop only */}
            <div className="hidden lg:block absolute top-20 left-[12%] right-[12%] h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500 rounded-full" />

            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step card */}
                <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className={`relative z-10 w-20 h-20 mx-auto mb-6 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-4xl shadow-lg`}>
                    {step.icon}
                  </div>
                  <span className="inline-block bg-gray-200 text-gray-600 font-extrabold text-sm tracking-widest px-3 py-1 rounded-full mb-3">
                    STEP {step.number}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/signup">
              <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white">
                Get Started Now — It&apos;s Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== ALL 9 FEATURES SECTION ===== */}
      <section id="features" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary-100 text-primary-700 px-4 py-1.5">
              Powerful Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to <span className="text-secondary-500">Dominate Social</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              9 powerful tools designed to save you time, boost engagement, and grow your audience across all platforms.
            </p>
          </div>

          {/* Feature cards grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardFeatures.map((feature) => (
              <Card 
                key={feature.id} 
                className="group bg-white border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <CardContent className="p-6">
                  {/* Icon and title */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-sm text-gray-500">{feature.shortDesc}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed">{feature.fullDesc}</p>

                  {/* Feature list */}
                  <ul className="space-y-2 mb-4">
                    {feature.features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 text-secondary-500 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Stats badge */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{feature.stats.label}</span>
                    <span className={`font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                      {feature.stats.value}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/features">
              <Button size="lg" variant="outline" className="border-primary-500 text-primary-600 hover:bg-primary-50">
                Explore All Features in Detail
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== LIVE DEMO / DASHBOARD PREVIEW ===== */}
      <section id="demo" className="py-24 px-4 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-white/10 text-white border border-white/20 px-4 py-1.5">
              See It In Action
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Your New Social Media <span className="text-secondary-400">Command Center</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              A powerful, intuitive dashboard that puts everything you need at your fingertips.
            </p>
          </div>

          {/* Large Dashboard Mockup */}
          <div className="relative max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Browser chrome */}
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-3 border-b">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 bg-white rounded-lg px-4 py-1.5 text-center mx-8">
                  <span className="text-gray-400 text-sm">🔒 app.socialwavegrowth.com/dashboard</span>
                </div>
              </div>

              {/* Dashboard content */}
              <div className="p-6 bg-gray-50">
                <div className="grid grid-cols-12 gap-6">
                  {/* Sidebar */}
                  <div className="col-span-2 bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg" />
                      <span className="font-bold text-sm text-gray-900">SocialWave</span>
                    </div>
                    <nav className="space-y-2">
                      {[
                        { icon: LayoutDashboard, label: 'Dashboard', active: true },
                        { icon: Share2, label: 'Compose' },
                        { icon: Calendar, label: 'Calendar' },
                        { icon: BarChart3, label: 'Analytics' },
                        { icon: Inbox, label: 'Inbox' },
                        { icon: Sparkles, label: 'AI Studio' },
                      ].map((item, i) => (
                        <div 
                          key={i} 
                          className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                            item.active 
                              ? 'bg-primary-50 text-primary-600 font-medium' 
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          {item.label}
                        </div>
                      ))}
                    </nav>
                  </div>

                  {/* Main content */}
                  <div className="col-span-10 space-y-6">
                    {/* Stats row */}
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { label: 'Total Followers', value: '45,234', change: '+12.5%', up: true },
                        { label: 'Engagement Rate', value: '4.8%', change: '+2.1%', up: true },
                        { label: 'Posts This Month', value: '47', change: '+8', up: true },
                        { label: 'Scheduled', value: '28', change: 'Next 7 days', up: null },
                      ].map((stat, i) => (
                        <div key={i} className="bg-white rounded-xl p-4 shadow-sm">
                          <p className="text-gray-500 text-xs mb-1">{stat.label}</p>
                          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                          <p className={`text-xs mt-1 ${stat.up ? 'text-green-600' : stat.up === false ? 'text-red-600' : 'text-gray-400'}`}>
                            {stat.change}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Charts row */}
                    <div className="grid grid-cols-2 gap-6">
                      {/* Growth chart */}
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-gray-900">Follower Growth</h3>
                          <select className="text-xs text-gray-500 bg-gray-50 border-0 rounded px-2 py-1">
                            <option>Last 30 days</option>
                          </select>
                        </div>
                        <div className="h-32 flex items-end gap-2">
                          {[35, 45, 40, 55, 50, 65, 60, 75, 70, 85, 80, 90].map((h, i) => (
                            <div key={i} className="flex-1 bg-gradient-to-t from-primary-500 to-primary-300 rounded-t" style={{ height: `${h}%` }} />
                          ))}
                        </div>
                      </div>

                      {/* Platform breakdown */}
                      <div className="bg-white rounded-xl p-4 shadow-sm">
                        <h3 className="font-semibold text-gray-900 mb-4">Platform Breakdown</h3>
                        <div className="space-y-3">
                          {[
                            { platform: 'Instagram', followers: '18.5K', percent: 40, color: 'bg-pink-500' },
                            { platform: 'Facebook', followers: '12.2K', percent: 27, color: 'bg-blue-600' },
                            { platform: 'TikTok', followers: '8.7K', percent: 19, color: 'bg-gray-900' },
                            { platform: 'LinkedIn', followers: '5.8K', percent: 14, color: 'bg-blue-700' },
                          ].map((p, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <span className="text-xs text-gray-600 w-16">{p.platform}</span>
                              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.percent}%` }} />
                              </div>
                              <span className="text-xs font-medium text-gray-900 w-12 text-right">{p.followers}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recent posts */}
                    <div className="bg-white rounded-xl p-4 shadow-sm">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold text-gray-900">Recent Posts</h3>
                        <Button variant="ghost" size="sm" className="text-xs">View All</Button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((_, i) => (
                          <div key={i} className="bg-gray-50 rounded-lg p-3">
                            <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg mb-2" />
                            <p className="text-xs text-gray-600 line-clamp-2">Amazing content that your audience will love...</p>
                            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
                              <span>❤️ 1.2K</span>
                              <span>💬 89</span>
                              <span>🔄 45</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-semibold animate-pulse">
              ✅ Live Data Sync
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                Try the Dashboard Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== PLATFORMS SECTION ===== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary-100 text-secondary-700 px-4 py-1.5">
              Multi-Platform
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              All Your Platforms, <span className="text-secondary-500">One Dashboard</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Connect and manage all your social accounts from one powerful, unified interface.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 mb-12">
            {platforms.map((platform) => (
              <div key={platform} className="flex flex-col items-center p-8 rounded-2xl bg-gray-50 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 group">
                <div className="w-20 h-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlatformIcon platform={platform} size="lg" />
                </div>
                <span className="text-lg font-semibold text-gray-700 capitalize mb-2">
                  {platform === 'twitter' ? 'X (Twitter)' : platform}
                </span>
                <span className="text-sm text-gray-500">Full support</span>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-500 mb-4">And more platforms coming soon...</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Badge variant="outline" className="text-gray-500 px-4 py-2">Pinterest</Badge>
              <Badge variant="outline" className="text-gray-500 px-4 py-2">YouTube</Badge>
              <Badge variant="outline" className="text-gray-500 px-4 py-2">Threads</Badge>
              <Badge variant="outline" className="text-gray-500 px-4 py-2">Snapchat</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* ===== USE CASES SECTION ===== */}
      <section id="use-cases" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary-100 text-primary-700 px-4 py-1.5">
              Built For Everyone
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Solutions for <span className="text-secondary-500">Every Business</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you&apos;re a solo creator or an enterprise agency, Social Wave Growth scales with your needs.
            </p>
          </div>

          {/* Use case tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {useCases.map((useCase, index) => (
              <button
                key={index}
                onClick={() => setActiveUseCase(index)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activeUseCase === index
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <useCase.icon className="w-5 h-5" />
                {useCase.title}
              </button>
            ))}
          </div>

          {/* Active use case detail */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left: Content */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center">
                    {(() => {
                      const IconComponent = useCases[activeUseCase].icon;
                      return <IconComponent className="w-7 h-7 text-primary-600" />;
                    })()}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{useCases[activeUseCase].title}</h3>
                    <p className="text-gray-500">Optimized for your workflow</p>
                  </div>
                </div>

                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {useCases[activeUseCase].description}
                </p>

                <h4 className="font-semibold text-gray-900 mb-4">Key Features</h4>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {useCases[activeUseCase].features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-secondary-500 shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/signup">
                  <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white">
                    Start Free Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>

              {/* Right: Results/Stats */}
              <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-8 lg:p-12 text-white">
                <h4 className="font-semibold mb-8 text-white/80">Real Results from Real Customers</h4>
                <div className="space-y-8">
                  {useCases[activeUseCase].results.map((result, i) => (
                    <div key={i}>
                      <p className="text-5xl font-bold mb-2">{result.metric}</p>
                      <p className="text-white/70">{result.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-12 pt-8 border-t border-white/20">
                  <p className="text-white/60 text-sm mb-4">Trusted by leading {useCases[activeUseCase].title.toLowerCase()}</p>
                  <div className="flex gap-4">
                    {[1, 2, 3, 4].map((_, i) => (
                      <div key={i} className="w-12 h-12 bg-white/20 rounded-lg" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ROI CALCULATOR / STATS SECTION ===== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-secondary-100 text-secondary-700 px-4 py-1.5">
                Proven ROI
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Save Time & Money While <span className="text-secondary-500">Growing Faster</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our customers see measurable results within the first month. Here&apos;s what you can expect:
              </p>

              <div className="space-y-6">
                {[
                  { label: 'Average time saved per week', value: '10+ hours', icon: Clock },
                  { label: 'Increase in engagement rate', value: '47%', icon: TrendingUp },
                  { label: 'Faster content creation', value: '3x', icon: Zap },
                  { label: 'Cost savings vs. hiring', value: '$3,000/mo', icon: PieChart },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                      <stat.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-gray-500">{stat.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl p-8 lg:p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">Calculate Your Savings</h3>
              
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Hours spent on social media weekly</label>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <span className="text-4xl font-bold">15</span>
                    <span className="text-white/60 ml-2">hours</span>
                  </div>
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-2 block">Your hourly rate (or team cost)</label>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <span className="text-4xl font-bold">$50</span>
                    <span className="text-white/60 ml-2">/hour</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-xl p-6 mb-6">
                <p className="text-white/80 mb-2">Your potential monthly savings</p>
                <p className="text-5xl font-bold text-secondary-400">$2,400</p>
                <p className="text-white/60 text-sm mt-2">Based on 60% time savings</p>
              </div>

              <Link href="/signup">
                <Button size="lg" className="w-full bg-white text-primary-600 hover:bg-gray-100">
                  Start Saving Time Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary-100 text-secondary-700 px-4 py-1.5">
              Customer Success Stories
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Loved by <span className="text-secondary-500">50,000+ Businesses</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of companies already transforming their social media presence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-gray-700 mb-6 leading-relaxed text-sm">&ldquo;{testimonial.quote}&rdquo;</p>

                  {/* Result badge */}
                  <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-medium mb-4">
                    <TrendingUp className="w-3 h-3" />
                    {testimonial.results}
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{testimonial.author}</p>
                      <p className="text-xs text-gray-500">{testimonial.role}</p>
                      <p className="text-xs text-gray-400">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Trust indicators */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 bg-white rounded-2xl shadow-lg px-8 py-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">4.9/5</p>
                <p className="text-sm text-gray-500">Average Rating</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">2,500+</p>
                <p className="text-sm text-gray-500">5-Star Reviews</p>
              </div>
              <div className="w-px h-12 bg-gray-200" />
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-500">Would Recommend</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PRICING SECTION ===== */}
      <section id="pricing" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary-100 text-primary-700 px-4 py-1.5">
              Simple Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Plans That <span className="text-secondary-500">Scale With You</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Start free, upgrade when you&apos;re ready. All plans include a 14-day trial.
            </p>

            {/* Billing toggle */}
            <div className="inline-flex items-center gap-4 bg-gray-100 rounded-full p-1">
              <button
                onClick={() => setIsYearlyPricing(false)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !isYearlyPricing ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearlyPricing(true)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  isYearlyPricing ? 'bg-white shadow text-gray-900' : 'text-gray-500'
                }`}
              >
                Yearly <span className="text-green-600 text-sm ml-1">Save 20%</span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.highlighted
                    ? 'border-2 border-primary-500 shadow-2xl scale-105 z-10'
                    : 'border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-secondary-500 text-white px-4 py-1 shadow-lg">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8 pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-gray-900">
                      ${isYearlyPricing ? Math.round(plan.yearlyPrice / 12) : plan.price}
                    </span>
                    <span className="text-gray-500">/month</span>
                    {isYearlyPricing && (
                      <p className="text-sm text-green-600 mt-1">
                        Billed ${plan.yearlyPrice}/year
                      </p>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <Link href={plan.name === 'Agency' ? '#' : '/signup'}>
                    <Button
                      className={`w-full mb-6 ${
                        plan.highlighted
                          ? 'bg-secondary-500 hover:bg-secondary-600 text-white'
                          : ''
                      }`}
                      variant={plan.highlighted ? 'default' : 'outline'}
                      size="lg"
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {feature.included ? (
                          <CheckCircle2 className="w-5 h-5 text-secondary-500 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-gray-700' : 'text-gray-400'}`}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Money-back guarantee */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-3 bg-green-50 text-green-700 px-6 py-3 rounded-full">
              <Shield className="w-5 h-5" />
              <span className="font-medium">30-Day Money-Back Guarantee</span>
            </div>
          </div>

          {/* See full comparison link */}
          <div className="text-center mt-6">
            <Link href="/pricing" className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1">
              See full feature comparison
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section id="faq" className="py-24 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary-100 text-secondary-700 px-4 py-1.5">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about Social Wave Growth.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              >
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ${openFaq === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <a href="mailto:support@socialwavegrowth.com">
              <Button variant="outline">
                <HeadphonesIcon className="mr-2 w-4 h-4" />
                Contact Support
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ===== INTEGRATIONS SECTION ===== */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary-100 text-primary-700 px-4 py-1.5">
              Integrations
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Works With Your <span className="text-secondary-500">Favorite Tools</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Seamlessly connect Social Wave Growth with the tools you already use.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {integrations.map((integration, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-white rounded-xl mx-auto mb-4 flex items-center justify-center shadow-sm">
                  <Layers className="w-8 h-8 text-gray-400" />
                </div>
                <p className="font-semibold text-gray-900">{integration.name}</p>
                <p className="text-sm text-gray-500">{integration.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BLOG PREVIEW SECTION ===== */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <Badge className="mb-4 bg-secondary-100 text-secondary-700 px-4 py-1.5">
                Resources
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Latest from the Blog
              </h2>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0">
              View All Articles
              <ChevronRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <Card key={i} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-secondary-100" />
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-gray-400">{post.readTime} read</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm">{post.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA SECTION ===== */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 via-secondary-600 to-secondary-700" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        </div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join 50,000+ businesses already growing their social presence. Start your free trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-secondary-600 hover:bg-gray-100 text-lg px-10 h-14 shadow-xl">
                Start Your Free 14-Day Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="#pricing">
              <Button size="lg" variant="outline" className="text-lg px-10 h-14 bg-white/10 border-white/30 text-white hover:bg-white/20">
                View Pricing Plans
              </Button>
            </a>
          </div>
          <p className="mt-6 text-white/60 text-sm">No credit card required • Full access to all features • Cancel anytime</p>
        </div>
      </section>

      {/* ===== GLOBAL NETWORK FOOTER ===== */}
      <footer className="py-20 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto">
          {/* Global presence banner */}
          <div className="text-center mb-16 pb-16 border-b border-gray-800">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-secondary-500" />
              <span className="text-white font-semibold text-lg">Global Network</span>
            </div>
            <p className="text-gray-500 mb-6">Trusted by businesses across 100+ countries worldwide</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span>🇺🇸 United States</span>
              <span>🇬🇧 United Kingdom</span>
              <span>🇦🇺 Australia</span>
              <span>🇨🇦 Canada</span>
              <span>🇩🇪 Germany</span>
              <span>🇫🇷 France</span>
              <span>🇯🇵 Japan</span>
              <span>🇧🇷 Brazil</span>
              <span>🇮🇳 India</span>
              <span>🇳🇬 Nigeria</span>
            </div>
          </div>

          <div className="grid md:grid-cols-6 gap-8 mb-12">
            <div className="md:col-span-2">
              <Logo className="[&_span]:text-white mb-4" />
              <p className="text-sm max-w-xs mb-6">
                Ride the wave to social success. The all-in-one platform for social media management, scheduling, analytics, and AI-powered content creation.
              </p>
              <div className="flex gap-4">
                {platforms.map((platform) => (
                  <a 
                    key={platform} 
                    href="#" 
                    className="text-gray-500 hover:text-white transition-colors"
                    aria-label={`Follow us on ${platform}`}
                  >
                    <PlatformIcon platform={platform} size="sm" className="opacity-70 hover:opacity-100" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/features" className="hover:text-white transition-colors">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><span className="text-gray-600">API (Coming Soon)</span></li>
                <li><span className="text-gray-600">Mobile App (Coming Soon)</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#use-cases" className="hover:text-white transition-colors">For Agencies</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">For Brands</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">For Creators</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">For Small Business</a></li>
                <li><a href="#use-cases" className="hover:text-white transition-colors">For Enterprise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><span className="text-gray-600">Careers (Coming Soon)</span></li>
                <li><span className="text-gray-600">Blog (Coming Soon)</span></li>
                <li><a href="mailto:hello@socialwavegrowth.com" className="hover:text-white transition-colors">Contact</a></li>
                <li><span className="text-gray-600">Press Kit</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy#cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
                <li><span className="text-gray-600">GDPR</span></li>
                <li><span className="text-gray-600">Security</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm">© {new Date().getFullYear()} Social Wave Growth. All rights reserved.</p>
            <p className="text-sm text-gray-500">
              Part of the <a href="https://pacificwavedigital.com" target="_blank" rel="noopener noreferrer" className="text-secondary-500 hover:text-secondary-400">Pacific Wave Digital</a> family
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
