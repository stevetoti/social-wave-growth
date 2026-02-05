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
  Users,
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
} from 'lucide-react';
import { useState } from 'react';

const platforms: Platform[] = ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'];

const features = [
  {
    icon: Share2,
    title: 'Multi-Platform Publishing',
    description: 'Publish to Instagram, Facebook, X (Twitter), LinkedIn, and TikTok from a single powerful dashboard. One click, everywhere.',
  },
  {
    icon: Calendar,
    title: 'Visual Content Calendar',
    description: 'Plan your content strategy with our drag-and-drop calendar. See your entire month at a glance and never miss a post.',
  },
  {
    icon: Sparkles,
    title: 'AI Content Generation',
    description: 'Generate engaging captions, hashtags, and content ideas powered by AI. Never run out of creative inspiration again.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Dashboard',
    description: 'Track follower growth, engagement rates, and content performance across all platforms with beautiful, actionable reports.',
  },
  {
    icon: Clock,
    title: 'Best Time to Post',
    description: 'Our AI analyzes your audience activity patterns to recommend the perfect posting times for maximum engagement.',
  },
  {
    icon: Target,
    title: 'Competitor Tracking',
    description: 'Monitor your competitors, analyze their strategies, and stay ahead of trends in your industry.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite team members, assign roles, and collaborate on content creation with approval workflows.',
  },
  {
    icon: FileText,
    title: 'White-Label Reports',
    description: 'Generate beautiful, branded reports for clients. Perfect for agencies managing multiple accounts.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Connect Accounts',
    description: 'Link all your social media accounts in seconds. We support Instagram, Facebook, X, LinkedIn, TikTok, and more.',
    icon: '🔗',
  },
  {
    number: '02',
    title: 'Schedule Content',
    description: 'Create and schedule your posts using our visual calendar. Set it and forget it — we handle the publishing.',
    icon: '📅',
  },
  {
    number: '03',
    title: 'Analyze Performance',
    description: 'Track what works with detailed analytics. Understand your audience and optimize your content strategy.',
    icon: '📊',
  },
  {
    number: '04',
    title: 'Grow Following',
    description: 'Watch your audience grow as you post consistently at optimal times with AI-powered content suggestions.',
    icon: '🚀',
  },
];

const useCases = [
  {
    icon: Building,
    title: 'Marketing Agencies',
    description: 'Manage multiple client accounts from one dashboard. Generate white-label reports and streamline your workflow.',
    features: ['Multi-account management', 'Branded reports', 'Client collaboration'],
  },
  {
    icon: Store,
    title: 'Brands & Businesses',
    description: 'Build your brand presence across all platforms. Schedule campaigns and track ROI effortlessly.',
    features: ['Campaign scheduling', 'Brand monitoring', 'Engagement tracking'],
  },
  {
    icon: User,
    title: 'Content Creators',
    description: 'Focus on creating great content while we handle the distribution. Grow your audience consistently.',
    features: ['Auto-posting', 'Best time insights', 'Cross-platform analytics'],
  },
  {
    icon: Briefcase,
    title: 'Small Business',
    description: 'Save hours every week with automated posting. Look professional without hiring a social media team.',
    features: ['Time savings', 'Professional presence', 'Affordable plans'],
  },
];

const testimonials = [
  {
    quote: "Social Wave Growth has transformed how we manage our social media. We've seen a 40% increase in engagement across all channels!",
    author: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechStart Inc.',
    avatar: 'SC',
  },
  {
    quote: 'The AI content suggestions are incredibly helpful. It saves us hours every week on content planning and our posts perform better.',
    author: 'Marcus Johnson',
    role: 'Social Media Manager',
    company: 'GrowthLabs',
    avatar: 'MJ',
  },
  {
    quote: 'Finally, a tool that makes multi-platform management actually simple. The analytics are top-notch and clients love our reports.',
    author: 'Emily Rodriguez',
    role: 'Founder',
    company: 'Digital Bloom Agency',
    avatar: 'ER',
  },
  {
    quote: "We went from spending 20 hours a week on social media to just 5. The scheduling feature alone pays for itself ten times over.",
    author: 'David Park',
    role: 'CEO',
    company: 'Sunrise Retail',
    avatar: 'DP',
  },
  {
    quote: "The competitor tracking feature is a game-changer. We've been able to stay ahead of trends and double our follower growth.",
    author: 'Lisa Thompson',
    role: 'Brand Manager',
    company: 'Fashion Forward',
    avatar: 'LT',
  },
  {
    quote: 'Best investment we made this year. Our engagement rate went from 2% to 6% in just three months of using Social Wave Growth.',
    author: 'James Wilson',
    role: 'Content Creator',
    company: 'Wilson Media',
    avatar: 'JW',
  },
];

const faqs = [
  {
    question: 'How many social media accounts can I connect?',
    answer: 'It depends on your plan. Starter includes 5 accounts, Pro includes 15, and Agency includes 50 accounts. You can connect Instagram, Facebook, X (Twitter), LinkedIn, TikTok, and Pinterest.',
  },
  {
    question: 'Does Social Wave Growth post automatically?',
    answer: "Yes! Once you schedule your content, we handle everything automatically. Posts go live at your scheduled times, even when you're asleep or on vacation.",
  },
  {
    question: 'Can I try it before I buy?',
    answer: 'Absolutely! All plans come with a 14-day free trial. No credit card required to start. You can explore all features and see results before committing.',
  },
  {
    question: 'Is there a limit on how many posts I can schedule?',
    answer: 'Starter plans include 100 scheduled posts per month, Pro includes 500, and Agency offers unlimited scheduling. Most users find this more than enough.',
  },
  {
    question: 'How does the AI content generation work?',
    answer: 'Our AI analyzes your brand voice, industry trends, and top-performing content to generate caption suggestions, hashtag recommendations, and content ideas tailored to your audience.',
  },
  {
    question: 'Can I manage my team members and approve content?',
    answer: 'Yes! Pro and Agency plans include team collaboration features. Add team members, assign roles, set up approval workflows, and ensure brand consistency across all posts.',
  },
];

const pricingTiers = [
  {
    name: 'Starter',
    price: 29,
    period: 'month',
    description: 'Perfect for individuals and small businesses',
    features: [
      '5 social accounts',
      '100 scheduled posts/month',
      'Basic analytics',
      'AI content suggestions',
      'Best time to post',
      'Email support',
    ],
    cta: 'Start Free Trial',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: 79,
    period: 'month',
    description: 'For growing businesses and teams',
    features: [
      '15 social accounts',
      '500 scheduled posts/month',
      'Advanced analytics',
      'AI content generation',
      'Competitor tracking',
      'Team collaboration (5 users)',
      'Custom reports',
      'Priority support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Agency',
    price: 199,
    period: 'month',
    description: 'For agencies managing multiple clients',
    features: [
      '50 social accounts',
      'Unlimited scheduled posts',
      'Full analytics suite',
      'Advanced AI features',
      'White-label reports',
      'Unlimited team members',
      'API access',
      'Dedicated account manager',
      'Custom integrations',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo />
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                How It Works
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                Pricing
              </a>
              <a href="#faq" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                FAQ
              </a>
            </div>

            <div className="hidden md:flex items-center gap-4">
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
              <a href="#features" className="py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#how-it-works" className="py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
              <a href="#pricing" className="py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
              <a href="#faq" className="py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
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

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-secondary-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-medium">Trusted by 50,000+ social media managers</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Ride the Wave to{' '}
                <span className="bg-gradient-to-r from-secondary-400 via-secondary-300 to-secondary-400 bg-clip-text text-transparent">
                  Social Success
                </span>
              </h1>
              
              <p className="text-xl text-white/80 mb-8 max-w-xl mx-auto lg:mx-0">
                Schedule posts, analyze performance, and create engaging content across all your social platforms — all from one powerful dashboard.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/signup">
                  <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white text-lg px-8 h-14 shadow-xl shadow-secondary-500/30">
                    Start Free 14-Day Trial
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-14 bg-white/10 border-white/20 text-white hover:bg-white/20">
                    See How It Works
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-white/70 text-sm">
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

            {/* Right: Dashboard Preview */}
            <div className="hidden lg:block relative">
              <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl">
                {/* Browser header */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 text-center text-sm text-white/60">app.socialwavegrowth.com</div>
                </div>

                {/* Mock stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-white">45.2K</p>
                    <p className="text-white/60 text-xs">Total Followers</p>
                    <p className="text-green-400 text-xs">+12.5%</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-white">4.8%</p>
                    <p className="text-white/60 text-xs">Engagement</p>
                    <p className="text-green-400 text-xs">+2.1%</p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-white">28</p>
                    <p className="text-white/60 text-xs">Scheduled</p>
                    <p className="text-white/60 text-xs">Next 7 days</p>
                  </div>
                </div>

                {/* Mock calendar */}
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-semibold text-sm">Content Calendar</span>
                    <span className="text-white/60 text-xs">February 2025</span>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                      <div key={i} className="text-center text-white/40 text-xs">{d}</div>
                    ))}
                    {[...Array(28)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`text-center text-xs py-1 rounded ${
                          [3, 7, 12, 14, 19, 21, 26].includes(i) 
                            ? 'bg-secondary-500 text-white' 
                            : 'text-white/60'
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-4 py-2 rounded-xl shadow-lg text-sm font-semibold animate-bounce">
                ✅ Auto-Posting Active
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white text-primary-600 px-4 py-2 rounded-xl shadow-lg text-sm font-semibold">
                🌍 5 Platforms Connected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative -mt-8 z-10 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-primary-500">100K+</p>
              <p className="text-gray-500 font-medium mt-1">Posts Scheduled</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-primary-500">50K+</p>
              <p className="text-gray-500 font-medium mt-1">Accounts Connected</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-primary-500">10M+</p>
              <p className="text-gray-500 font-medium mt-1">Followers Grown</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-extrabold text-primary-500">99.9%</p>
              <p className="text-gray-500 font-medium mt-1">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-secondary-100 text-secondary-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Go Live in <span className="text-secondary-500">4 Simple Steps</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No technical skills needed. Set up your social media command center in minutes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-16 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-secondary-500 via-primary-500 to-secondary-500" />

            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="relative z-10 w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-4xl shadow-xl">
                  {step.icon}
                </div>
                <span className="text-secondary-500 font-extrabold text-sm tracking-widest">STEP {step.number}</span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary-100 text-primary-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Powerful Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to <span className="text-secondary-500">Grow</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to save you time and boost your social media presence across all platforms.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-4">
                    <feature.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-secondary-100 text-secondary-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
            Integrations
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Platforms We Support
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Connect all your favorite social platforms and manage everything from one powerful dashboard.
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {platforms.map((platform) => (
              <div key={platform} className="flex flex-col items-center gap-3 p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="w-20 h-20 flex items-center justify-center">
                  <PlatformIcon platform={platform} size="lg" />
                </div>
                <span className="text-base font-semibold text-gray-700 capitalize">
                  {platform === 'twitter' ? 'X (Twitter)' : platform}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <p className="text-gray-500 text-sm mb-4">And more coming soon...</p>
            <div className="flex justify-center gap-4">
              <Badge variant="outline" className="text-gray-500">Pinterest</Badge>
              <Badge variant="outline" className="text-gray-500">YouTube</Badge>
              <Badge variant="outline" className="text-gray-500">Threads</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/10 text-white font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Use Cases
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Built for <span className="text-secondary-400">Every Business</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              From solo creators to enterprise agencies, Social Wave Growth scales with your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <div 
                key={index} 
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-secondary-500/20 rounded-2xl flex items-center justify-center mb-4">
                  <useCase.icon className="w-7 h-7 text-secondary-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.features.map((f) => (
                    <span key={f} className="bg-white/10 text-white/80 text-xs px-3 py-1 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-secondary-100 text-secondary-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Customer Stories
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Loved by <span className="text-secondary-500">50,000+ Users</span>
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of businesses growing their social presence with Social Wave Growth.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{testimonial.author}</p>
                      <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-primary-100 text-primary-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              Simple Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Plans That <span className="text-secondary-500">Scale With You</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingTiers.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.highlighted
                    ? 'border-2 border-secondary-500 shadow-2xl scale-105 bg-primary-500 text-white'
                    : 'border-gray-200 bg-white'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-secondary-500 text-white px-4 py-1">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className={`text-xl ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className={`text-5xl font-bold ${plan.highlighted ? 'text-white' : 'text-primary-500'}`}>
                      ${plan.price}
                    </span>
                    <span className={plan.highlighted ? 'text-white/60' : 'text-gray-500'}>/{plan.period}</span>
                  </div>
                  <p className={`text-sm mt-2 ${plan.highlighted ? 'text-white/70' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${plan.highlighted ? 'text-secondary-400' : 'text-secondary-500'}`} />
                        <span className={`text-sm ${plan.highlighted ? 'text-white/80' : 'text-gray-600'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Link href={plan.name === 'Agency' ? '/contact' : '/signup'}>
                    <Button
                      className={`w-full ${
                        plan.highlighted
                          ? 'bg-secondary-500 hover:bg-secondary-600 text-white'
                          : 'bg-primary-500 hover:bg-primary-600 text-white'
                      }`}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block bg-secondary-100 text-secondary-600 font-semibold text-sm px-4 py-1.5 rounded-full mb-4">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Got questions? We&apos;ve got answers.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-gray-500 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-500 via-secondary-600 to-secondary-700" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join 50,000+ businesses already growing their social presence with Social Wave Growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-white text-secondary-600 hover:bg-gray-100 text-lg px-10 h-14 shadow-xl">
                Start Your Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="text-lg px-10 h-14 bg-white/10 border-white/20 text-white hover:bg-white/20">
                View Pricing
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-white/60 text-sm">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>

      {/* Global Network Footer */}
      <footer className="py-16 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto">
          {/* Global Network Banner */}
          <div className="text-center mb-12 pb-12 border-b border-gray-800">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Globe className="w-6 h-6 text-secondary-500" />
              <span className="text-white font-semibold text-lg">Global Network</span>
            </div>
            <p className="text-gray-500 mb-6">Trusted by businesses across 50+ countries worldwide</p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span>🇺🇸 United States</span>
              <span>🇬🇧 United Kingdom</span>
              <span>🇦🇺 Australia</span>
              <span>🇨🇦 Canada</span>
              <span>🇩🇪 Germany</span>
              <span>🇫🇷 France</span>
              <span>🇯🇵 Japan</span>
              <span>🇧🇷 Brazil</span>
            </div>
          </div>

          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <Logo className="[&_span]:text-white mb-4" />
              <p className="text-sm max-w-xs">
                Ride the wave to social success. The all-in-one platform for social media management, scheduling, and analytics.
              </p>
              <div className="flex gap-4 mt-6">
                {platforms.map((platform) => (
                  <a 
                    key={platform} 
                    href={platform === 'instagram' ? 'https://instagram.com' : platform === 'facebook' ? 'https://facebook.com' : platform === 'twitter' ? 'https://x.com' : platform === 'linkedin' ? 'https://linkedin.com' : 'https://tiktok.com'} 
                    target="_blank"
                    rel="noopener noreferrer"
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
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><span className="text-gray-500 cursor-not-allowed">API (Coming Soon)</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><span className="text-gray-500 cursor-not-allowed">Blog (Coming Soon)</span></li>
                <li><span className="text-gray-500 cursor-not-allowed">Careers (Coming Soon)</span></li>
                <li><a href="mailto:hello@socialwavegrowth.com" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy#cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
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
