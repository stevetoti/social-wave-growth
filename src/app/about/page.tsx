'use client';

import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ArrowLeft, Users, Zap, Globe, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const values = [
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We continuously push the boundaries of what social media management can be.',
  },
  {
    icon: Users,
    title: 'Customer First',
    description: 'Every feature we build starts with understanding our customers\' needs.',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    description: 'We believe powerful tools should be accessible to businesses of all sizes.',
  },
  {
    icon: Heart,
    title: 'Transparency',
    description: 'We\'re honest about our capabilities, pricing, and how we use your data.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Logo />
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              About Social Wave Growth
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We&apos;re on a mission to help businesses of all sizes harness the power of social media 
              to grow their brand and connect with their audience.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-gray-600 mb-4">
                Social Wave Growth was born from a simple observation: managing social media across 
                multiple platforms was unnecessarily complicated. Small business owners and marketing 
                teams were spending hours jumping between apps, copying and pasting content, and 
                struggling to understand their analytics.
              </p>
              <p className="text-gray-600 mb-4">
                We set out to build a platform that brings everything together in one place. 
                A tool that&apos;s powerful enough for agencies but simple enough for solo entrepreneurs. 
                With AI-powered content suggestions, intuitive scheduling, and clear analytics, 
                we help you work smarter, not harder.
              </p>
              <p className="text-gray-600">
                Today, thousands of businesses trust Social Wave Growth to manage their social presence. 
                From startups to established brands, we&apos;re proud to be part of their growth journey.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="bg-white">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of businesses already growing with Social Wave Growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="bg-secondary-500 hover:bg-secondary-600 text-white">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/#features">
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Social Wave Growth. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
