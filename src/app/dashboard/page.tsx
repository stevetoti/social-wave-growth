'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/stats-card';
import { PostCard } from '@/components/post-card';
import { PlatformIcon } from '@/components/platform-icon';
import { mockPosts, mockSocialAccounts, mockAnalyticsData } from '@/lib/mock-data';
import { 
  Users, 
  TrendingUp, 
  Calendar, 
  Eye,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

const chartData = mockAnalyticsData.slice(-14).map((d) => ({
  date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  followers: d.followers,
  engagement: d.engagement,
  impressions: d.impressions / 1000,
}));

export default function DashboardPage() {
  const scheduledPosts = mockPosts.filter((p) => p.status === 'scheduled');
  const totalFollowers = mockSocialAccounts.reduce((acc, a) => acc + a.follower_count, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">Welcome back! Here&apos;s your social media overview.</p>
        </div>
        <Link href="/dashboard/compose">
          <Button className="bg-secondary-500 hover:bg-secondary-600 text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            Create with AI
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Followers"
          value={totalFollowers.toLocaleString()}
          change={12.5}
          icon={Users}
        />
        <StatsCard
          title="Engagement Rate"
          value="4.8%"
          change={2.1}
          icon={TrendingUp}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Scheduled Posts"
          value={scheduledPosts.length}
          icon={Calendar}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Total Impressions"
          value="125.4K"
          change={8.3}
          icon={Eye}
          iconColor="text-purple-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Follower Growth Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Follower Growth</CardTitle>
            <select className="text-sm border rounded-md px-2 py-1 text-gray-600">
              <option>Last 14 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="followerGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="followers"
                    stroke="#8B5CF6"
                    strokeWidth={2}
                    fill="url(#followerGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Chart */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Engagement Rate</CardTitle>
            <select className="text-sm border rounded-md px-2 py-1 text-gray-600">
              <option>Last 14 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 12 }} stroke="#9CA3AF" unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [`${(value as number).toFixed(2)}%`, 'Engagement']}
                  />
                  <Line
                    type="monotone"
                    dataKey="engagement"
                    stroke="#F97316"
                    strokeWidth={2}
                    dot={{ fill: '#F97316', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Connected Accounts */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Connected Accounts</CardTitle>
            <Link href="/dashboard/settings">
              <Button variant="ghost" size="sm">
                Manage
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSocialAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <PlatformIcon platform={account.platform} size="sm" />
                  <div>
                    <p className="text-sm font-medium">{account.account_handle}</p>
                    <p className="text-xs text-gray-500">
                      {account.follower_count.toLocaleString()} followers
                    </p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    account.is_connected
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {account.is_connected ? 'Connected' : 'Connect'}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Posts */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">Upcoming Posts</CardTitle>
            <Link href="/dashboard/calendar">
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduledPosts.length > 0 ? (
              scheduledPosts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No upcoming posts scheduled</p>
                <Link href="/dashboard/compose">
                  <Button variant="link" className="text-primary-600">
                    Create your first post
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
