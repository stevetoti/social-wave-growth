'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Logo } from '@/components/logo';
import {
  CheckCircle2,
  X,
  Zap,
  Building2,
  Users,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  HeadphonesIcon,
  Loader2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: { text: string; included: boolean }[];
  highlighted?: boolean;
  icon: typeof Zap;
  ctaText: string;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    description: 'Perfect for individuals and small businesses getting started',
    monthlyPrice: 19,
    yearlyPrice: 190,
    icon: Zap,
    ctaText: 'Start Free Trial',
    features: [
      { text: '3 social accounts', included: true },
      { text: '30 scheduled posts/month', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Content calendar', included: true },
      { text: 'Email support', included: true },
      { text: 'AI content suggestions', included: false },
      { text: 'Team collaboration', included: false },
      { text: 'Competitor tracking', included: false },
      { text: 'Social inbox', included: false },
      { text: 'Custom reports', included: false },
    ],
  },
  {
    name: 'Pro',
    description: 'For growing businesses that need more power',
    monthlyPrice: 49,
    yearlyPrice: 490,
    icon: Sparkles,
    highlighted: true,
    badge: 'Most Popular',
    ctaText: 'Start Free Trial',
    features: [
      { text: '10 social accounts', included: true },
      { text: 'Unlimited scheduled posts', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'AI content suggestions', included: true },
      { text: 'Team collaboration (3 users)', included: true },
      { text: 'Priority support', included: true },
      { text: 'Bulk upload & scheduling', included: true },
      { text: 'Competitor tracking (5)', included: true },
      { text: 'Social inbox', included: true },
      { text: 'Weekly reports', included: true },
    ],
  },
  {
    name: 'Agency',
    description: 'For agencies and enterprises with advanced needs',
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: Building2,
    ctaText: 'Contact Sales',
    features: [
      { text: 'Unlimited social accounts', included: true },
      { text: 'Unlimited scheduled posts', included: true },
      { text: 'White-label reports', included: true },
      { text: 'AI content studio', included: true },
      { text: 'Unlimited team members', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'API access', included: true },
      { text: 'Unlimited competitor tracking', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA guarantee', included: true },
    ],
  },
];

const faqs = [
  {
    question: 'Can I switch plans at any time?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we\'ll prorate any differences.',
  },
  {
    question: 'What happens after my free trial?',
    answer: 'After your 14-day trial, you\'ll be automatically subscribed to your chosen plan. You can cancel anytime before the trial ends with no charge.',
  },
  {
    question: 'Do you offer refunds?',
    answer: 'We offer a 30-day money-back guarantee. If you\'re not satisfied, contact us within 30 days for a full refund.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express) and PayPal through our secure payment processor, Stripe.',
  },
  {
    question: 'Can I add more team members?',
    answer: 'Pro plans include 3 team members. Need more? Upgrade to Agency for unlimited team members, or contact us for custom pricing.',
  },
];

export default function PricingPage() {
  const { toast } = useToast();
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (tierName: string) => {
    setLoading(tierName);
    
    // Simulate Stripe checkout redirect
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (tierName === 'Agency') {
      toast({
        title: 'Contact Sales',
        description: 'Our team will reach out to you within 24 hours.',
      });
      setLoading(null);
      return;
    }

    // In production, this would redirect to Stripe Checkout
    toast({
      title: 'Redirecting to checkout...',
      description: 'You\'ll be redirected to our secure payment page.',
    });
    
    // Simulate redirect
    setTimeout(() => {
      window.location.href = '/signup';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/">
              <Logo />
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Log In</Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-secondary-500 hover:bg-secondary-600 text-white">
                  Start Free Trial
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-primary-100 text-primary-700">
            14-Day Free Trial • No Credit Card Required
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the perfect plan for your social media goals. All plans include our core features.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`font-medium ${!isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <span className={`font-medium ${isYearly ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
            </span>
            {isYearly && (
              <Badge className="bg-green-100 text-green-700">Save 20%</Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative ${
                  tier.highlighted
                    ? 'border-2 border-primary-500 shadow-xl scale-105 z-10'
                    : 'border-gray-200'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary-500 text-white px-4 py-1">
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    tier.highlighted ? 'bg-primary-100' : 'bg-gray-100'
                  }`}>
                    <tier.icon className={`w-6 h-6 ${
                      tier.highlighted ? 'text-primary-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <p className="text-gray-600 text-sm mt-2">{tier.description}</p>
                  <div className="mt-6">
                    <span className="text-5xl font-bold text-gray-900">
                      ${isYearly ? tier.yearlyPrice : tier.monthlyPrice}
                    </span>
                    <span className="text-gray-500">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                    {isYearly && (
                      <p className="text-sm text-green-600 mt-1">
                        ${Math.round(tier.yearlyPrice / 12)}/month billed annually
                      </p>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Button
                    className={`w-full mb-6 ${
                      tier.highlighted
                        ? 'bg-secondary-500 hover:bg-secondary-600 text-white'
                        : ''
                    }`}
                    variant={tier.highlighted ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => handleSubscribe(tier.name)}
                    disabled={loading === tier.name}
                  >
                    {loading === tier.name ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : null}
                    {tier.ctaText}
                    {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                        )}
                        <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-medium text-gray-900">Secure Payments</p>
              <p className="text-sm text-gray-500">256-bit SSL encryption</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <p className="font-medium text-gray-900">14-Day Trial</p>
              <p className="text-sm text-gray-500">No credit card needed</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <p className="font-medium text-gray-900">10,000+ Users</p>
              <p className="text-sm text-gray-500">Trust our platform</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <HeadphonesIcon className="w-6 h-6 text-orange-600" />
              </div>
              <p className="font-medium text-gray-900">24/7 Support</p>
              <p className="text-sm text-gray-500">We&apos;re here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compare Plans */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Compare Plans
          </h2>
          <p className="text-gray-600 text-center mb-12">
            See which plan is right for you
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-4 px-4 font-medium text-gray-500">Feature</th>
                  <th className="text-center py-4 px-4 font-medium text-gray-900">Starter</th>
                  <th className="text-center py-4 px-4 font-medium text-primary-600">Pro</th>
                  <th className="text-center py-4 px-4 font-medium text-gray-900">Agency</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">Social Accounts</td>
                  <td className="py-3 px-4 text-center">3</td>
                  <td className="py-3 px-4 text-center font-medium text-primary-600">10</td>
                  <td className="py-3 px-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">Scheduled Posts</td>
                  <td className="py-3 px-4 text-center">30/month</td>
                  <td className="py-3 px-4 text-center font-medium text-primary-600">Unlimited</td>
                  <td className="py-3 px-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">Team Members</td>
                  <td className="py-3 px-4 text-center">1</td>
                  <td className="py-3 px-4 text-center font-medium text-primary-600">3</td>
                  <td className="py-3 px-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">AI Content Suggestions</td>
                  <td className="py-3 px-4 text-center"><X className="w-4 h-4 mx-auto text-gray-300" /></td>
                  <td className="py-3 px-4 text-center"><CheckCircle2 className="w-4 h-4 mx-auto text-green-500" /></td>
                  <td className="py-3 px-4 text-center"><CheckCircle2 className="w-4 h-4 mx-auto text-green-500" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">Competitor Tracking</td>
                  <td className="py-3 px-4 text-center"><X className="w-4 h-4 mx-auto text-gray-300" /></td>
                  <td className="py-3 px-4 text-center font-medium text-primary-600">5 competitors</td>
                  <td className="py-3 px-4 text-center">Unlimited</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">Social Inbox</td>
                  <td className="py-3 px-4 text-center"><X className="w-4 h-4 mx-auto text-gray-300" /></td>
                  <td className="py-3 px-4 text-center"><CheckCircle2 className="w-4 h-4 mx-auto text-green-500" /></td>
                  <td className="py-3 px-4 text-center"><CheckCircle2 className="w-4 h-4 mx-auto text-green-500" /></td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4 text-gray-700">API Access</td>
                  <td className="py-3 px-4 text-center"><X className="w-4 h-4 mx-auto text-gray-300" /></td>
                  <td className="py-3 px-4 text-center"><X className="w-4 h-4 mx-auto text-gray-300" /></td>
                  <td className="py-3 px-4 text-center"><CheckCircle2 className="w-4 h-4 mx-auto text-green-500" /></td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">Support</td>
                  <td className="py-3 px-4 text-center">Email</td>
                  <td className="py-3 px-4 text-center font-medium text-primary-600">Priority</td>
                  <td className="py-3 px-4 text-center">Dedicated Manager</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Got questions? We&apos;ve got answers.
          </p>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Grow Your Social Presence?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 text-lg px-8 h-14">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-gray-400 text-center text-sm">
        <p>© 2024 Social Wave Growth. All rights reserved.</p>
      </footer>
    </div>
  );
}
