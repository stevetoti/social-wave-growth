'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Logo } from '@/components/logo';
import {
  CheckCircle2,
  X,
  Zap,
  Building2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shield,
  Clock,
  HeadphonesIcon,
  ChevronDown,
  RefreshCw,
  Menu,
} from 'lucide-react';

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: { text: string; included: boolean; highlight?: boolean }[];
  highlighted?: boolean;
  icon: typeof Zap;
  ctaText: string;
  badge?: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    description: 'Perfect for individuals and small businesses getting started with social media management.',
    monthlyPrice: 19,
    yearlyPrice: 190,
    icon: Zap,
    ctaText: 'Start Free Trial',
    features: [
      { text: '3 social accounts', included: true },
      { text: '30 scheduled posts/month', included: true },
      { text: 'Basic analytics dashboard', included: true },
      { text: 'Visual content calendar', included: true },
      { text: 'AI content suggestions', included: true },
      { text: 'Best time to post', included: true },
      { text: 'Email support (24hr)', included: true },
      { text: 'Mobile app access', included: true },
      { text: 'Team collaboration', included: false },
      { text: 'Competitor tracking', included: false },
      { text: 'Social inbox', included: false },
      { text: 'Bulk upload', included: false },
      { text: 'Custom reports', included: false },
      { text: 'White-label reports', included: false },
      { text: 'API access', included: false },
    ],
  },
  {
    name: 'Pro',
    description: 'For growing businesses and marketing teams that need more power and collaboration.',
    monthlyPrice: 49,
    yearlyPrice: 490,
    icon: Sparkles,
    highlighted: true,
    badge: 'Most Popular',
    ctaText: 'Start Free Trial',
    features: [
      { text: '10 social accounts', included: true, highlight: true },
      { text: 'Unlimited scheduled posts', included: true, highlight: true },
      { text: 'Advanced analytics', included: true },
      { text: 'AI content studio (full)', included: true, highlight: true },
      { text: 'Team collaboration (3 users)', included: true },
      { text: 'Competitor tracking (5)', included: true },
      { text: 'Unified social inbox', included: true },
      { text: 'Bulk upload & scheduling', included: true },
      { text: 'Custom reports', included: true },
      { text: 'Priority support (4hr)', included: true },
      { text: 'Best time to post AI', included: true },
      { text: 'Content approval workflow', included: true },
      { text: 'White-label reports', included: false },
      { text: 'API access', included: false },
      { text: 'Dedicated account manager', included: false },
    ],
  },
  {
    name: 'Agency',
    description: 'For agencies and enterprises managing multiple clients with advanced requirements.',
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: Building2,
    ctaText: 'Contact Sales',
    features: [
      { text: 'Unlimited social accounts', included: true, highlight: true },
      { text: 'Unlimited scheduled posts', included: true },
      { text: 'Full analytics suite', included: true },
      { text: 'Advanced AI content studio', included: true },
      { text: 'Unlimited team members', included: true, highlight: true },
      { text: 'Unlimited competitor tracking', included: true },
      { text: 'Unified social inbox', included: true },
      { text: 'Bulk upload & scheduling', included: true },
      { text: 'White-label reports', included: true, highlight: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'API access', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SSO/SAML', included: true },
      { text: 'SLA guarantee (99.9%)', included: true },
      { text: 'Phone support', included: true },
    ],
  },
];

// Full feature comparison table
const featureCategories = [
  {
    name: 'Publishing',
    features: [
      { name: 'Social accounts', starter: '3', pro: '10', agency: 'Unlimited' },
      { name: 'Scheduled posts/month', starter: '30', pro: 'Unlimited', agency: 'Unlimited' },
      { name: 'Content calendar', starter: true, pro: true, agency: true },
      { name: 'Bulk scheduling', starter: false, pro: true, agency: true },
      { name: 'Post queues', starter: false, pro: true, agency: true },
      { name: 'Approval workflows', starter: false, pro: true, agency: true },
    ],
  },
  {
    name: 'AI & Content',
    features: [
      { name: 'AI caption suggestions', starter: true, pro: true, agency: true },
      { name: 'AI content studio', starter: 'Basic', pro: 'Full', agency: 'Advanced' },
      { name: 'Hashtag recommendations', starter: true, pro: true, agency: true },
      { name: 'Best time to post AI', starter: true, pro: true, agency: true },
      { name: 'Content idea generator', starter: false, pro: true, agency: true },
      { name: 'Multi-language AI', starter: false, pro: true, agency: true },
    ],
  },
  {
    name: 'Analytics & Reporting',
    features: [
      { name: 'Basic analytics', starter: true, pro: true, agency: true },
      { name: 'Advanced analytics', starter: false, pro: true, agency: true },
      { name: 'Custom date ranges', starter: false, pro: true, agency: true },
      { name: 'Custom reports', starter: false, pro: true, agency: true },
      { name: 'White-label reports', starter: false, pro: false, agency: true },
      { name: 'Scheduled reports', starter: false, pro: true, agency: true },
      { name: 'Export (PDF/Excel)', starter: false, pro: true, agency: true },
    ],
  },
  {
    name: 'Engagement',
    features: [
      { name: 'Social inbox', starter: false, pro: true, agency: true },
      { name: 'Comment management', starter: false, pro: true, agency: true },
      { name: 'Quick reply templates', starter: false, pro: true, agency: true },
      { name: 'Team assignment', starter: false, pro: true, agency: true },
      { name: 'Sentiment analysis', starter: false, pro: true, agency: true },
    ],
  },
  {
    name: 'Competitor Intelligence',
    features: [
      { name: 'Competitor tracking', starter: false, pro: '5 competitors', agency: 'Unlimited' },
      { name: 'Benchmarking', starter: false, pro: true, agency: true },
      { name: 'Content analysis', starter: false, pro: true, agency: true },
      { name: 'Trend alerts', starter: false, pro: false, agency: true },
    ],
  },
  {
    name: 'Team & Security',
    features: [
      { name: 'Team members', starter: '1', pro: '3', agency: 'Unlimited' },
      { name: 'Role permissions', starter: false, pro: true, agency: true },
      { name: 'Two-factor auth', starter: true, pro: true, agency: true },
      { name: 'SSO/SAML', starter: false, pro: false, agency: true },
      { name: 'Activity logs', starter: false, pro: true, agency: true },
    ],
  },
  {
    name: 'Support & Integrations',
    features: [
      { name: 'Email support', starter: '24hr', pro: '4hr', agency: '1hr' },
      { name: 'Live chat', starter: false, pro: true, agency: true },
      { name: 'Phone support', starter: false, pro: false, agency: true },
      { name: 'Dedicated manager', starter: false, pro: false, agency: true },
      { name: 'API access', starter: false, pro: false, agency: true },
      { name: 'Custom integrations', starter: false, pro: false, agency: true },
    ],
  },
];

const faqs = [
  {
    question: 'Can I switch plans at any time?',
    answer: 'Yes! You can upgrade or downgrade your plan at any time from your account settings. When upgrading, you\'ll have immediate access to new features. When downgrading, changes take effect at the end of your current billing period.',
  },
  {
    question: 'What happens after my free trial ends?',
    answer: 'After your 14-day trial, you\'ll be automatically subscribed to your chosen plan. We\'ll send you a reminder before the trial ends. You can cancel anytime during the trial with no charge.',
  },
  {
    question: 'Do you offer a money-back guarantee?',
    answer: 'Absolutely! We offer a 30-day money-back guarantee on all paid plans. If you\'re not completely satisfied with Social Wave Growth, contact our support team within 30 days for a full refund, no questions asked.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover) and PayPal. All payments are processed securely through Stripe with 256-bit SSL encryption.',
  },
  {
    question: 'Can I add more team members to my plan?',
    answer: 'Starter plans include 1 user, Pro plans include 3 users. You can add additional users to Pro plans for $10/user/month. Agency plans include unlimited team members at no extra cost.',
  },
  {
    question: 'Are there any long-term contracts?',
    answer: 'No! All our plans are month-to-month with no long-term commitments. You can cancel anytime from your account settings. Choose annual billing to save 20%.',
  },
  {
    question: 'What social platforms are supported?',
    answer: 'We support Instagram, Facebook, X (Twitter), LinkedIn, and TikTok. Pinterest and YouTube support is coming soon. All plans have access to all supported platforms.',
  },
  {
    question: 'Is there a limit on how many posts I can schedule?',
    answer: 'Starter plans include 30 scheduled posts per month. Pro and Agency plans include unlimited scheduling, so you can plan as much content as you need.',
  },
  {
    question: 'Do you offer custom enterprise plans?',
    answer: 'Yes! For organizations with specific requirements, we offer custom enterprise plans with tailored features, dedicated support, and volume pricing. Contact our sales team to discuss your needs.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Security is our top priority. We use bank-level 256-bit SSL encryption, are SOC 2 Type II compliant, and never store your social media passwords. Your data is backed up daily across multiple secure locations.',
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
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
              <Link href="/features">
                <Button variant="ghost">Features</Button>
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
              <Link href="/features" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Features</Button>
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

      {/* Header */}
      <section className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge className="mb-4 bg-secondary-100 text-secondary-700 px-4 py-1.5">
            14-Day Free Trial • No Credit Card Required
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Simple, <span className="text-secondary-500">Transparent</span> Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Choose the perfect plan for your social media goals. All plans include core features with a 14-day free trial.
          </p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 bg-gray-100 rounded-full p-1.5 w-fit mx-auto">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all ${
                !isYearly ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${
                isYearly ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Yearly
              <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Save 20%</span>
            </button>
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
                className={`relative transition-all duration-300 ${
                  tier.highlighted
                    ? 'border-2 border-primary-500 shadow-2xl scale-105 z-10'
                    : 'border-gray-200 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-secondary-500 text-white px-4 py-1 shadow-lg">
                      {tier.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pt-8">
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${
                    tier.highlighted ? 'bg-primary-100' : 'bg-gray-100'
                  }`}>
                    <tier.icon className={`w-7 h-7 ${
                      tier.highlighted ? 'text-primary-600' : 'text-gray-600'
                    }`} />
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <p className="text-gray-600 text-sm mt-2 min-h-[48px]">{tier.description}</p>
                  <div className="mt-6">
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">
                        ${isYearly ? Math.round(tier.yearlyPrice / 12) : tier.monthlyPrice}
                      </span>
                      <span className="text-gray-500 ml-2">/month</span>
                    </div>
                    {isYearly && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <span className="line-through">${tier.monthlyPrice * 12}/year</span>
                          <span className="text-green-600 font-medium ml-2">${tier.yearlyPrice}/year</span>
                        </p>
                        <p className="text-xs text-green-600">You save ${tier.monthlyPrice * 12 - tier.yearlyPrice}/year</p>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <Link href={tier.name === 'Agency' ? '#' : '/signup'}>
                    <Button
                      className={`w-full mb-6 h-12 text-base ${
                        tier.highlighted
                          ? 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-lg'
                          : ''
                      }`}
                      variant={tier.highlighted ? 'default' : 'outline'}
                      size="lg"
                    >
                      {tier.ctaText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        {feature.included ? (
                          <CheckCircle2 className={`w-5 h-5 shrink-0 mt-0.5 ${
                            feature.highlight ? 'text-secondary-500' : 'text-green-500'
                          }`} />
                        ) : (
                          <X className="w-5 h-5 text-gray-300 shrink-0 mt-0.5" />
                        )}
                        <span className={`text-sm ${
                          feature.included 
                            ? feature.highlight 
                              ? 'text-gray-900 font-medium' 
                              : 'text-gray-700'
                            : 'text-gray-400'
                        }`}>
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
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-primary-600" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Secure Payments</p>
              <p className="text-sm text-gray-500">256-bit SSL encryption</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Clock className="w-7 h-7 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">14-Day Free Trial</p>
              <p className="text-sm text-gray-500">No credit card needed</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <RefreshCw className="w-7 h-7 text-green-600" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">30-Day Guarantee</p>
              <p className="text-sm text-gray-500">Full money-back</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                <HeadphonesIcon className="w-7 h-7 text-orange-600" />
              </div>
              <p className="font-semibold text-gray-900 mb-1">Expert Support</p>
              <p className="text-sm text-gray-500">We&apos;re here to help</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full Feature Comparison */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary-100 text-primary-700 px-4 py-1.5">
              Compare Plans
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Full Feature Comparison
            </h2>
            <p className="text-lg text-gray-600">
              Every feature, every plan — see exactly what you get.
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left py-5 px-6 font-semibold text-gray-600 min-w-[200px]">Feature</th>
                    <th className="text-center py-5 px-6 font-semibold text-gray-600 min-w-[120px]">Starter</th>
                    <th className="text-center py-5 px-6 font-semibold text-primary-600 bg-primary-50 min-w-[120px]">Pro</th>
                    <th className="text-center py-5 px-6 font-semibold text-gray-600 min-w-[120px]">Agency</th>
                  </tr>
                </thead>
                <tbody>
                  {featureCategories.map((category, catIndex) => (
                    <>
                      <tr key={`cat-${catIndex}`} className="bg-gray-50">
                        <td colSpan={4} className="py-3 px-6 font-semibold text-gray-900">
                          {category.name}
                        </td>
                      </tr>
                      {category.features.map((feature, featIndex) => (
                        <tr key={`feat-${catIndex}-${featIndex}`} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6 text-gray-700">{feature.name}</td>
                          <td className="py-4 px-6 text-center">
                            {typeof feature.starter === 'boolean' ? (
                              feature.starter ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-gray-600 font-medium">{feature.starter}</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center bg-primary-50/50">
                            {typeof feature.pro === 'boolean' ? (
                              feature.pro ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-primary-600 font-semibold">{feature.pro}</span>
                            )}
                          </td>
                          <td className="py-4 px-6 text-center">
                            {typeof feature.agency === 'boolean' ? (
                              feature.agency ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-gray-600 font-medium">{feature.agency}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-0 px-4 py-1.5">
                Enterprise
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Need a Custom Solution?
              </h2>
              <p className="text-xl text-white/80 mb-8">
                For large organizations with specific requirements, we offer custom enterprise plans with:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Custom user limits & permissions',
                  'Dedicated infrastructure',
                  'Custom integrations & API',
                  'Volume-based pricing',
                  'Dedicated success manager',
                  'Custom SLA agreements',
                  'On-premise deployment options',
                  'Advanced security features',
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <a href="mailto:enterprise@socialwavegrowth.com">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Contact Enterprise Sales
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <Building2 className="w-16 h-16 mx-auto mb-6 text-secondary-400" />
                <h3 className="text-2xl font-bold mb-4">Enterprise Benefits</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: '99.99%', label: 'Uptime SLA' },
                    { value: '1hr', label: 'Response Time' },
                    { value: '24/7', label: 'Phone Support' },
                    { value: 'Unlimited', label: 'Everything' },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/10 rounded-xl p-4">
                      <p className="text-2xl font-bold text-secondary-400">{stat.value}</p>
                      <p className="text-sm text-white/70">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-secondary-100 text-secondary-700 px-4 py-1.5">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Pricing Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about our pricing and plans.
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
                    className={`w-5 h-5 text-gray-500 transition-transform shrink-0 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`} 
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

          <div className="text-center mt-12 p-8 bg-gray-50 rounded-2xl">
            <p className="text-gray-600 mb-4">Still have questions about pricing?</p>
            <a href="mailto:sales@socialwavegrowth.com">
              <Button variant="outline" size="lg">
                <HeadphonesIcon className="mr-2 w-4 h-4" />
                Talk to Sales
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-secondary-500 to-secondary-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Grow Your Social Presence?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Start your 14-day free trial today. No credit card required. Full access to all features.
          </p>
          <Link href="/signup">
            <Button size="lg" className="bg-white text-secondary-600 hover:bg-gray-100 text-lg px-10 h-14 shadow-xl">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-6 text-white/60 text-sm">
            Join 50,000+ businesses already using Social Wave Growth
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Logo className="[&_span]:text-white" />
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <Link href="/features" className="hover:text-white transition-colors">Features</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            </div>
            <p className="text-sm">© {new Date().getFullYear()} Social Wave Growth</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
