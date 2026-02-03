'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlatformIcon } from '@/components/platform-icon';
import { Platform } from '@/lib/types';
import {
  Plus,
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  Search,
  MoreHorizontal,
  Trash2,
  RefreshCw,
  ExternalLink,
  Loader2,
  Target,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface Competitor {
  id: string;
  name: string;
  handle: string;
  platform: Platform;
  avatarUrl?: string;
  followers: number;
  followersChange: number;
  engagement: number;
  engagementChange: number;
  postsPerWeek: number;
  avgLikes: number;
  avgComments: number;
  topContent: string;
  lastUpdated: Date;
}

const mockCompetitors: Competitor[] = [
  {
    id: '1',
    name: 'Buffer',
    handle: '@buffer',
    platform: 'instagram',
    followers: 125400,
    followersChange: 3.2,
    engagement: 4.8,
    engagementChange: 0.3,
    postsPerWeek: 7,
    avgLikes: 1250,
    avgComments: 89,
    topContent: 'Carousel posts about social media tips',
    lastUpdated: new Date(),
  },
  {
    id: '2',
    name: 'Hootsuite',
    handle: '@hootsuite',
    platform: 'twitter',
    followers: 89200,
    followersChange: -1.5,
    engagement: 2.1,
    engagementChange: -0.4,
    postsPerWeek: 14,
    avgLikes: 342,
    avgComments: 28,
    topContent: 'Industry news and quick tips threads',
    lastUpdated: new Date(),
  },
  {
    id: '3',
    name: 'Later',
    handle: '@latermedia',
    platform: 'instagram',
    followers: 234000,
    followersChange: 5.8,
    engagement: 5.2,
    engagementChange: 1.2,
    postsPerWeek: 5,
    avgLikes: 3400,
    avgComments: 156,
    topContent: 'Reels with editing tutorials',
    lastUpdated: new Date(),
  },
  {
    id: '4',
    name: 'Sprout Social',
    handle: '@SproutSocial',
    platform: 'linkedin',
    followers: 156000,
    followersChange: 2.1,
    engagement: 3.4,
    engagementChange: 0.5,
    postsPerWeek: 4,
    avgLikes: 890,
    avgComments: 67,
    topContent: 'Data-driven insights and reports',
    lastUpdated: new Date(),
  },
];

const comparisonData = Array.from({ length: 30 }, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() - (29 - i));
  return {
    date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    you: 15000 + Math.floor(Math.random() * 500) + i * 20,
    buffer: 125000 + Math.floor(Math.random() * 1000) + i * 40,
    later: 234000 + Math.floor(Math.random() * 2000) + i * 80,
  };
});

export default function CompetitorsPage() {
  const { toast } = useToast();
  const [competitors, setCompetitors] = useState<Competitor[]>(mockCompetitors);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCompetitor, setNewCompetitor] = useState({ handle: '', platform: 'instagram' as Platform });
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState<string | null>(null);

  const addCompetitor = () => {
    if (!newCompetitor.handle.trim()) {
      toast({
        title: 'Enter a handle',
        description: 'Please enter a social media handle to track',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const competitor: Competitor = {
        id: Date.now().toString(),
        name: newCompetitor.handle.replace('@', ''),
        handle: newCompetitor.handle.startsWith('@') ? newCompetitor.handle : `@${newCompetitor.handle}`,
        platform: newCompetitor.platform,
        followers: Math.floor(Math.random() * 100000) + 10000,
        followersChange: (Math.random() * 10 - 2).toFixed(1) as unknown as number,
        engagement: (Math.random() * 5 + 1).toFixed(1) as unknown as number,
        engagementChange: (Math.random() * 2 - 0.5).toFixed(1) as unknown as number,
        postsPerWeek: Math.floor(Math.random() * 10) + 3,
        avgLikes: Math.floor(Math.random() * 2000) + 200,
        avgComments: Math.floor(Math.random() * 100) + 10,
        topContent: 'Analyzing content patterns...',
        lastUpdated: new Date(),
      };
      setCompetitors([...competitors, competitor]);
      setNewCompetitor({ handle: '', platform: 'instagram' });
      setShowAddDialog(false);
      setLoading(false);
      toast({
        title: 'Competitor added!',
        description: `Now tracking ${competitor.handle}`,
      });
    }, 2000);
  };

  const removeCompetitor = (id: string) => {
    setCompetitors(competitors.filter(c => c.id !== id));
    toast({
      title: 'Competitor removed',
      description: 'No longer tracking this account',
    });
  };

  const refreshCompetitor = (id: string) => {
    setRefreshing(id);
    setTimeout(() => {
      setCompetitors(competitors.map(c => 
        c.id === id ? { ...c, lastUpdated: new Date() } : c
      ));
      setRefreshing(null);
      toast({
        title: 'Data refreshed',
        description: 'Latest metrics have been fetched',
      });
    }, 1500);
  };

  const filteredCompetitors = competitors.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Target className="w-6 h-6 text-primary-600" />
            Competitor Tracking
          </h1>
          <p className="text-gray-500">Monitor your competitors&apos; social media performance</p>
        </div>
        <Button
          onClick={() => setShowAddDialog(true)}
          className="bg-secondary-500 hover:bg-secondary-600 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Competitor
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          placeholder="Search competitors..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Comparison Chart */}
      {competitors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Follower Growth Comparison</CardTitle>
            <CardDescription>Compare your growth with competitors over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                    formatter={(value) => [(value as number).toLocaleString(), '']}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="you"
                    name="Your Account"
                    stroke="#8B5CF6"
                    strokeWidth={3}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="buffer"
                    name="Buffer"
                    stroke="#F97316"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="later"
                    name="Later"
                    stroke="#10B981"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Competitors Grid */}
      {filteredCompetitors.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {filteredCompetitors.map((competitor) => (
            <Card key={competitor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={competitor.avatarUrl} />
                      <AvatarFallback className="bg-primary-100 text-primary-600">
                        {competitor.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
                        <PlatformIcon platform={competitor.platform} size="sm" />
                      </div>
                      <p className="text-sm text-gray-500">{competitor.handle}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => refreshCompetitor(competitor.id)}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Refresh Data
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => removeCompetitor(competitor.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {refreshing === competitor.id ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary-500" />
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                          <Users className="w-3 h-3" />
                          Followers
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">
                            {competitor.followers.toLocaleString()}
                          </span>
                          <Badge
                            className={
                              competitor.followersChange >= 0
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }
                          >
                            {competitor.followersChange >= 0 ? (
                              <TrendingUp className="w-3 h-3 mr-1" />
                            ) : (
                              <TrendingDown className="w-3 h-3 mr-1" />
                            )}
                            {Math.abs(competitor.followersChange)}%
                          </Badge>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                          <Heart className="w-3 h-3" />
                          Engagement
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{competitor.engagement}%</span>
                          <Badge
                            className={
                              competitor.engagementChange >= 0
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }
                          >
                            {competitor.engagementChange >= 0 ? '+' : ''}
                            {competitor.engagementChange}%
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center mb-4">
                      <div>
                        <div className="text-sm text-gray-500">Posts/week</div>
                        <div className="font-semibold">{competitor.postsPerWeek}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Avg Likes</div>
                        <div className="font-semibold">{competitor.avgLikes.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Avg Comments</div>
                        <div className="font-semibold">{competitor.avgComments}</div>
                      </div>
                    </div>

                    <div className="p-3 bg-primary-50 rounded-lg">
                      <div className="text-xs text-primary-600 font-medium mb-1">
                        🔥 Top Performing Content
                      </div>
                      <p className="text-sm text-gray-700">{competitor.topContent}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-12 text-center">
            <Target className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No competitors tracked yet</h3>
            <p className="text-gray-500 mb-4">
              Start tracking your competitors to benchmark your performance
            </p>
            <Button onClick={() => setShowAddDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Competitor
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Competitor Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Competitor</DialogTitle>
            <DialogDescription>
              Enter the social media handle of the competitor you want to track
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Platform</label>
              <div className="flex gap-2">
                {(['instagram', 'twitter', 'facebook', 'linkedin', 'tiktok'] as Platform[]).map(
                  (platform) => (
                    <button
                      key={platform}
                      onClick={() => setNewCompetitor({ ...newCompetitor, platform })}
                      className={`p-2 rounded-lg border-2 transition-all ${
                        newCompetitor.platform === platform
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <PlatformIcon platform={platform} size="sm" />
                    </button>
                  )
                )}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Handle</label>
              <Input
                placeholder="@competitor_handle"
                value={newCompetitor.handle}
                onChange={(e) =>
                  setNewCompetitor({ ...newCompetitor, handle: e.target.value })
                }
              />
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowAddDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={addCompetitor}
                disabled={loading}
                className="flex-1 bg-primary-600 hover:bg-primary-700"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-2" />
                )}
                Add Competitor
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
