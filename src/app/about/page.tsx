'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { 
  ArrowLeft, 
  ArrowRight,
  Users, 
  Zap, 
  Globe, 
  Heart, 
  Target, 
  Shield,
  Award,
  TrendingUp,
  MapPin,
  Building2,
  Sparkles,
  Star,
  Menu,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

const values = [
  {
    icon: Zap,
    title: 'Innovation First',
    description: 'We continuously push the boundaries of what\'s possible in social media management, leveraging AI and automation to stay ahead.',
  },
  {
    icon: Users,
    title: 'Customer Obsessed',
    description: 'Every feature we build starts with understanding our customers\' needs. Your success is our success.',
  },
  {
    icon: Globe,
    title: 'Global Accessibility',
    description: 'We believe powerful tools should be accessible to businesses of all sizes, anywhere in the world.',
  },
  {
    icon: Heart,
    title: 'Radical Transparency',
    description: 'We\'re honest about our capabilities, pricing, and how we handle your data. No hidden fees, no surprises.',
  },
  {
    icon: Shield,
    title: 'Security & Trust',
    description: 'Your data security is paramount. We use enterprise-grade encryption and never compromise on privacy.',
  },
  {
    icon: Target,
    title: 'Results Driven',
    description: 'We measure our success by your results. Every feature is designed to help you grow and succeed.',
  },
];

const stats = [
  { value: '50,000+', label: 'Active Businesses', icon: Building2 },
  { value: '100+', label: 'Countries Served', icon: Globe },
  { value: '10M+', label: 'Posts Scheduled', icon: TrendingUp },
  { value: '99.9%', label: 'Platform Uptime', icon: Shield },
];

const team = [
  {
    name: 'Stephen Toti',
    role: 'Founder & CEO',
    bio: 'Serial entrepreneur with a passion for helping businesses grow through technology. Founded Pacific Wave Digital to bring world-class solutions to emerging markets.',
    avatar: 'ST',
  },
  {
    name: 'Pacific Wave Digital',
    role: 'Development Team',
    bio: 'A talented team of developers, designers, and strategists building the future of social media management.',
    avatar: 'PW',
  },
];

const locations = [
  {
    country: 'Vanuatu',
    flag: '🇻🇺',
    city: 'Port Vila',
    role: 'Headquarters',
    description: 'Our Pacific Island headquarters where innovation meets island creativity.',
  },
  {
    country: 'Ghana',
    flag: '🇬🇭',
    city: 'Accra',
    role: 'Africa Operations',
    description: 'Serving the rapidly growing African market with localized support.',
  },
  {
    country: 'United States',
    flag: '🇺🇸',
    city: 'Remote',
    role: 'North America',
    description: 'Supporting our North American customers across all time zones.',
  },
];

const milestones = [
  { year: '2023', event: 'Social Wave Growth founded', description: 'Started with a vision to simplify social media management' },
  { year: '2024', event: 'AI Studio launched', description: 'Introduced AI-powered content generation' },
  { year: '2024', event: '10,000 users milestone', description: 'Reached our first major user milestone' },
  { year: '2025', event: '50,000 users', description: 'Expanded globally with multi-language support' },
  { year: '2025', event: 'TikTok integration', description: 'Added full TikTok support by popular demand' },
];

const awards = [
  { title: 'Best Social Media Tool', org: 'SaaS Awards 2024', icon: Award },
  { title: 'Top Startup to Watch', org: 'Tech Pacific', icon: Star },
  { title: 'Innovation Award', org: 'Digital Marketing Awards', icon: Sparkles },
];

export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
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
            <Link href="/features">
              <Button variant="ghost">Features</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost">Pricing</Button>
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
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <div className="flex flex-col gap-2 px-4">
              <Link href="/features" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Features</Button>
              </Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Pricing</Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-secondary-500 hover:bg-secondary-600 text-white">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/10 text-white border border-white/20 px-4 py-1.5">
              Our Story
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Building the Future of{' '}
              <span className="text-secondary-400">Social Media</span>
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We&apos;re on a mission to democratize social media success, making enterprise-grade tools accessible to businesses of all sizes, everywhere in the world.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gradient-to-br from-primary-50 to-white p-8 rounded-2xl border border-primary-100">
                <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-relaxed">
                  To empower businesses worldwide with intelligent social media management tools that save time, boost engagement, and drive real growth. We believe every business deserves access to the same powerful tools that large enterprises use.
                </p>
              </div>
              <div className="bg-gradient-to-br from-secondary-50 to-white p-8 rounded-2xl border border-secondary-100">
                <div className="w-14 h-14 bg-secondary-100 rounded-2xl flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7 text-secondary-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-relaxed">
                  A world where every business, from a small shop in Port Vila to a growing startup in Accra, has the tools to build meaningful connections with their audience and grow their brand through social media.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-7 h-7 text-primary-600" />
                  </div>
                  <p className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </p>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary-100 text-primary-700 px-4 py-1.5">
                The Story
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                How It All Started
              </h2>
            </div>
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Social Wave Growth was born from a simple observation: managing social media across 
                multiple platforms was unnecessarily complicated and expensive. Small business owners and marketing 
                teams were spending hours jumping between apps, copying and pasting content, and 
                struggling to understand their analytics.
              </p>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                As part of <strong>Pacific Wave Digital</strong>, we set out to build a platform that brings everything together in one place — 
                a tool that&apos;s powerful enough for agencies but simple enough for solo entrepreneurs. 
                With AI-powered content suggestions, intuitive scheduling, and clear analytics, 
                we help you work smarter, not harder.
              </p>
              <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                Today, over 50,000 businesses across 100+ countries trust Social Wave Growth to manage their social presence. 
                From startups in Silicon Valley to family businesses in the Pacific Islands, we&apos;re proud 
                to be part of their growth journey.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                But we&apos;re just getting started. Our team continues to innovate, adding new features 
                and capabilities to help you stay ahead of the ever-changing social media landscape.
              </p>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-secondary-100 text-secondary-700 px-4 py-1.5">
                Journey
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Our Milestones
              </h2>
            </div>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary-200 -translate-x-1/2 hidden md:block" />
              
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 inline-block">
                        <span className="inline-block bg-primary-100 text-primary-700 text-sm font-bold px-3 py-1 rounded-full mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mb-1">{milestone.event}</h3>
                        <p className="text-gray-600 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-4 h-4 bg-primary-500 rounded-full border-4 border-white shadow shrink-0" />
                    <div className="flex-1 hidden md:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary-100 text-primary-700 px-4 py-1.5">
                What We Stand For
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do, from product development to customer support.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-white border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-2xl flex items-center justify-center mb-4">
                      <value.icon className="w-7 h-7 text-primary-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-secondary-100 text-secondary-700 px-4 py-1.5">
                The Team
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Pacific Wave Digital</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A global team united by a passion for helping businesses succeed on social media.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="bg-white overflow-hidden">
                  <CardContent className="p-8 text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">{member.avatar}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Global Presence */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-primary-100 text-primary-700 px-4 py-1.5">
                Global Presence
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Serving Businesses Worldwide
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From the Pacific Islands to Africa to North America, we&apos;re where our customers are.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <Card key={index} className="bg-white border-gray-100 hover:shadow-xl transition-all">
                  <CardContent className="p-6 text-center">
                    <div className="text-5xl mb-4">{location.flag}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{location.country}</h3>
                    <div className="flex items-center justify-center gap-1 text-gray-500 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{location.city}</span>
                    </div>
                    <Badge className="mb-4 bg-primary-100 text-primary-700">{location.role}</Badge>
                    <p className="text-gray-600 text-sm">{location.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-0 px-4 py-1.5">
              Recognition
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">Awards & Achievements</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {awards.map((award, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <award.icon className="w-10 h-10 text-secondary-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold mb-1">{award.title}</h3>
                  <p className="text-white/70 text-sm">{award.org}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-3xl p-8 md:p-12 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">Ready to Join 50,000+ Growing Businesses?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Start your free 14-day trial today and see why thousands of businesses trust Social Wave Growth.
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
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <p className="text-lg text-gray-600 mb-8">
              Have questions? We&apos;d love to hear from you.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">General Inquiries</h3>
                <a href="mailto:hello@socialwavegrowth.com" className="text-primary-600 hover:underline">
                  hello@socialwavegrowth.com
                </a>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
                <a href="mailto:support@socialwavegrowth.com" className="text-primary-600 hover:underline">
                  support@socialwavegrowth.com
                </a>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">Sales</h3>
                <a href="mailto:sales@socialwavegrowth.com" className="text-primary-600 hover:underline">
                  sales@socialwavegrowth.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo className="[&_span]:text-white" />
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/features" className="hover:text-white transition-colors">Features</Link>
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
            <p className="text-sm">
              Part of <a href="https://pacificwavedigital.com" target="_blank" rel="noopener noreferrer" className="text-secondary-500 hover:text-secondary-400">Pacific Wave Digital</a>
            </p>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-gray-800">
            <p className="text-sm">© {new Date().getFullYear()} Social Wave Growth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
