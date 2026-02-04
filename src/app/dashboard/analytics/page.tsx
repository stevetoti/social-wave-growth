'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatsCard } from '@/components/stats-card';
import { PlatformIcon } from '@/components/platform-icon';
import { mockAnalyticsData, mockHeatmapData, mockPosts, mockSocialAccounts } from '@/lib/mock-data';
import { Platform } from '@/lib/types';
import {
  Users,
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  Download,
} from 'lucide-react';
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
  BarChart,
  Bar,
} from 'recharts';

const platforms: Platform[] = ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const chartData = mockAnalyticsData.slice(-30).map((d) => ({
  date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
  followers: d.followers,
  engagement: d.engagement,
  impressions: d.impressions / 1000,
  reach: d.reach / 1000,
}));

const topPosts = mockPosts
  .filter((p) => p.status === 'published')
  .map((p) => ({
    ...p,
    likes: Math.floor(Math.random() * 500) + 100,
    comments: Math.floor(Math.random() * 50) + 10,
    shares: Math.floor(Math.random() * 30) + 5,
    engagement: (Math.random() * 5 + 2).toFixed(1),
  }));

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30');
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | 'all'>('all');

  const totalFollowers = mockSocialAccounts.reduce((acc, a) => acc + a.follower_count, 0);

  // Generate heatmap data
  const heatmapMax = Math.max(...mockHeatmapData.map((d) => d.value));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-500">Track your social media performance</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            className="border rounded-lg px-3 py-2 text-sm"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
          </select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Platform Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <Button
          variant={selectedPlatform === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setSelectedPlatform('all')}
        >
          All Platforms
        </Button>
        {platforms.map((platform) => (
          <Button
            key={platform}
            variant={selectedPlatform === platform ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPlatform(platform)}
            className="gap-2"
          >
            <PlatformIcon platform={platform} size="sm" className="w-4 h-4" />
            {platform.charAt(0).toUpperCase() + platform.slice(1)}
          </Button>
        ))}
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
          title="Avg. Engagement Rate"
          value="4.8%"
          change={2.1}
          icon={TrendingUp}
          iconColor="text-green-600"
        />
        <StatsCard
          title="Total Impressions"
          value="1.2M"
          change={15.3}
          icon={Eye}
          iconColor="text-blue-600"
        />
        <StatsCard
          title="Total Reach"
          value="856K"
          change={8.7}
          icon={Share2}
          iconColor="text-blue-900"
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Follower Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Follower Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#233C6F" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#233C6F" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
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
                    stroke="#233C6F"
                    strokeWidth={2}
                    fill="url(#colorFollowers)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Over Time */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Engagement Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" unit="%" />
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
                    dot={{ fill: '#F97316' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Impressions & Reach */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Impressions & Reach</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.slice(-14)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" unit="K" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [`${(value as number).toFixed(1)}K`, '']}
                  />
                  <Bar dataKey="impressions" fill="#233C6F" name="Impressions" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="reach" fill="#F97316" name="Reach" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Best Times Heatmap */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Best Times to Post</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[400px]">
                <div className="grid grid-cols-[auto_repeat(7,1fr)] gap-1">
                  <div />
                  {days.map((day) => (
                    <div key={day} className="text-xs text-center text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                  {[9, 12, 15, 18, 21].map((hour) => (
                    <>
                      <div key={`h-${hour}`} className="text-xs text-gray-500 pr-2 py-1">
                        {hour}:00
                      </div>
                      {days.map((_, dayIndex) => {
                        const data = mockHeatmapData.find(
                          (d) => d.day === dayIndex && d.hour === hour
                        );
                        const value = data?.value || 0;
                        const opacity = value / heatmapMax;
                        return (
                          <div
                            key={`${dayIndex}-${hour}`}
                            className="aspect-square rounded-sm"
                            style={{
                              backgroundColor: `rgba(139, 92, 246, ${opacity})`,
                            }}
                            title={`${days[dayIndex]} ${hour}:00 - ${value}% engagement`}
                          />
                        );
                      })}
                    </>
                  ))}
                </div>
                <div className="flex items-center justify-end gap-2 mt-4">
                  <span className="text-xs text-gray-500">Less</span>
                  <div className="flex gap-1">
                    {[0.2, 0.4, 0.6, 0.8, 1].map((opacity) => (
                      <div
                        key={opacity}
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: `rgba(139, 92, 246, ${opacity})` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">More</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Performing Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPosts.slice(0, 5).map((post, index) => (
              <div
                key={post.id}
                className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center justify-center w-8 h-8 bg-primary-100 text-primary-700 rounded-full font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-700 line-clamp-2 mb-2">
                    {post.content}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </div>
                    <div className="flex items-center gap-1">
                      <Share2 className="w-4 h-4" />
                      {post.shares}
                    </div>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      {post.engagement}%
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  {post.platforms.map((p) => (
                    <PlatformIcon key={p} platform={p} size="sm" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
