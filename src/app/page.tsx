'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/logo';
import { PlatformIcon } from '@/components/platform-icon';
import { pricingPlans } from '@/lib/mock-data';
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
} from 'lucide-react';
import { useState } from 'react';

const platforms: Platform[] = ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'];

const features = [
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Schedule posts across all platforms with our intuitive calendar. Find optimal posting times automatically.',
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Track follower growth, engagement rates, and content performance with beautiful, actionable reports.',
  },
  {
    icon: Sparkles,
    title: 'AI Content Studio',
    description: 'Generate engaging content ideas, captions, and hashtags powered by AI. Never run out of inspiration.',
  },
  {
    icon: Share2,
    title: 'Multi-Platform Publishing',
    description: 'Publish to Instagram, Facebook, X, LinkedIn, and TikTok from a single dashboard.',
  },
  {
    icon: Clock,
    title: 'Best Time to Post',
    description: 'Our AI analyzes your audience activity to recommend the perfect posting times for maximum engagement.',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Invite team members, assign roles, and collaborate on content creation and approval workflows.',
  },
];

const testimonials = [
  {
    quote: "Social Wave Growth has transformed how we manage our social media. We've seen a 40% increase in engagement!",
    author: 'Sarah Chen',
    role: 'Marketing Director',
    company: 'TechStart Inc.',
  },
  {
    quote: 'The AI content suggestions are incredibly helpful. It saves us hours every week on content planning.',
    author: 'Marcus Johnson',
    role: 'Social Media Manager',
    company: 'GrowthLabs',
  },
  {
    quote: 'Finally, a tool that makes multi-platform management actually simple. The analytics are top-notch.',
    author: 'Emily Rodriguez',
    role: 'Founder',
    company: 'Digital Bloom Agency',
  },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <a href="#platforms" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                Platforms
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">
                Pricing
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
              <a href="#platforms" className="py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>Platforms</a>
              <a href="#pricing" className="py-2 text-gray-600" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
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
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary-100 text-primary-700 hover:bg-primary-100">
              🚀 Now with AI-Powered Content Suggestions
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Ride the Wave to{' '}
              <span className="bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent">
                Social Success
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Schedule posts, analyze performance, and create engaging content across all your social platforms — all from one powerful dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/signup">
                <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white text-lg px-8 h-14">
                  Start Free 14-Day Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#features">
                <Button size="lg" variant="outline" className="text-lg px-8 h-14">
                  See How It Works
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-secondary-500" />
              No credit card required
              <span className="mx-2">•</span>
              <CheckCircle2 className="w-4 h-4 text-secondary-500" />
              Cancel anytime
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" />
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-100 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-secondary-400" />
                </div>
                <div className="flex-1 text-center text-sm text-gray-500">app.socialwavegrowth.com</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white min-h-[300px] flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                  <Card className="bg-white shadow-sm">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500 mb-1">Total Followers</div>
                      <div className="text-2xl font-bold text-gray-900">45,204</div>
                      <div className="text-sm text-secondary-600">+12.5% this month</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white shadow-sm">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500 mb-1">Engagement Rate</div>
                      <div className="text-2xl font-bold text-gray-900">4.8%</div>
                      <div className="text-sm text-secondary-600">+2.1% this month</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-white shadow-sm">
                    <CardContent className="p-4">
                      <div className="text-sm text-gray-500 mb-1">Scheduled Posts</div>
                      <div className="text-2xl font-bold text-gray-900">28</div>
                      <div className="text-sm text-gray-500">Next 7 days</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Connect All Your Social Platforms
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Manage everything from one place. Connect your accounts and start posting everywhere at once.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            {platforms.map((platform) => (
              <div key={platform} className="flex flex-col items-center gap-2">
                <PlatformIcon platform={platform} size="lg" />
                <span className="text-sm font-medium text-gray-600 capitalize">
                  {platform === 'twitter' ? 'X (Twitter)' : platform}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to save you time and boost your social media presence.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-white border-gray-200 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Loved by Social Media Managers
            </h2>
            <p className="text-lg text-gray-600">
              Join thousands of businesses growing their social presence with Social Wave Growth.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-gray-50 border-0">
                <CardContent className="p-6">
                  <p className="text-gray-700 mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-12 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600">10,000+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">5M+</div>
              <div className="text-gray-600">Posts Scheduled</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">98%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the plan that fits your needs. All plans include a 14-day free trial.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.highlighted
                    ? 'border-2 border-primary-500 shadow-xl scale-105'
                    : 'border-gray-200'
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary-500 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-gray-500">/{plan.period}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-secondary-500 shrink-0 mt-0.5" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/signup">
                    <Button
                      className={`w-full ${
                        plan.highlighted
                          ? 'bg-secondary-500 hover:bg-secondary-600 text-white'
                          : ''
                      }`}
                      variant={plan.highlighted ? 'default' : 'outline'}
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

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Social Media?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of businesses already growing with Social Wave Growth.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 h-14">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="mb-4">
                <Logo className="[&_span]:text-white" />
              </div>
              <p className="text-sm">
                Ride the wave to social success. The all-in-one platform for social media management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#platforms" className="hover:text-white transition-colors">Integrations</a></li>
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
            <div className="flex gap-4">
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
        </div>
      </footer>
    </div>
  );
}
