'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlatformIcon } from '@/components/platform-icon';
import { Platform } from '@/lib/types';
import {
  Users,
  CreditCard,
  Link2,
  Search,
  MoreHorizontal,
  Ban,
  Mail,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Activity,
  Settings,
  RefreshCw,
  Download,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import Link from 'next/link';
import { Logo } from '@/components/logo';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'starter' | 'pro' | 'business' | 'free';
  status: 'active' | 'suspended' | 'pending';
  connectedPlatforms: Platform[];
  postsThisMonth: number;
  joinedAt: Date;
  lastActive: Date;
  mrr: number;
}

interface PlatformStatus {
  platform: Platform;
  status: 'operational' | 'degraded' | 'outage';
  apiHealth: number;
  lastChecked: Date;
  activeConnections: number;
  errorsToday: number;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    email: 'sarah@techstart.io',
    plan: 'pro',
    status: 'active',
    connectedPlatforms: ['instagram', 'facebook', 'twitter'],
    postsThisMonth: 45,
    joinedAt: new Date('2024-01-15'),
    lastActive: new Date(),
    mrr: 49,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    email: 'marcus@growthlabs.co',
    plan: 'business',
    status: 'active',
    connectedPlatforms: ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'],
    postsThisMonth: 128,
    joinedAt: new Date('2023-11-20'),
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    mrr: 99,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@digitalbloom.agency',
    plan: 'business',
    status: 'active',
    connectedPlatforms: ['instagram', 'linkedin'],
    postsThisMonth: 89,
    joinedAt: new Date('2024-02-01'),
    lastActive: new Date(Date.now() - 24 * 60 * 60 * 1000),
    mrr: 99,
  },
  {
    id: '4',
    name: 'David Kim',
    email: 'david@startupxyz.com',
    plan: 'starter',
    status: 'active',
    connectedPlatforms: ['twitter', 'linkedin'],
    postsThisMonth: 12,
    joinedAt: new Date('2024-01-28'),
    lastActive: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    mrr: 19,
  },
  {
    id: '5',
    name: 'Anna Martinez',
    email: 'anna@creativeco.net',
    plan: 'pro',
    status: 'suspended',
    connectedPlatforms: ['instagram', 'tiktok'],
    postsThisMonth: 0,
    joinedAt: new Date('2023-12-10'),
    lastActive: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    mrr: 0,
  },
  {
    id: '6',
    name: 'John Smith',
    email: 'john@newuser.com',
    plan: 'free',
    status: 'pending',
    connectedPlatforms: [],
    postsThisMonth: 0,
    joinedAt: new Date(),
    lastActive: new Date(),
    mrr: 0,
  },
];

const mockPlatformStatus: PlatformStatus[] = [
  {
    platform: 'instagram',
    status: 'operational',
    apiHealth: 99.9,
    lastChecked: new Date(),
    activeConnections: 8432,
    errorsToday: 12,
  },
  {
    platform: 'facebook',
    status: 'operational',
    apiHealth: 99.7,
    lastChecked: new Date(),
    activeConnections: 6891,
    errorsToday: 23,
  },
  {
    platform: 'twitter',
    status: 'degraded',
    apiHealth: 94.2,
    lastChecked: new Date(),
    activeConnections: 5234,
    errorsToday: 156,
  },
  {
    platform: 'linkedin',
    status: 'operational',
    apiHealth: 99.8,
    lastChecked: new Date(),
    activeConnections: 4123,
    errorsToday: 8,
  },
  {
    platform: 'tiktok',
    status: 'operational',
    apiHealth: 99.5,
    lastChecked: new Date(),
    activeConnections: 3567,
    errorsToday: 34,
  },
];

const revenueData = Array.from({ length: 12 }, (_, i) => ({
  month: new Date(2024, i, 1).toLocaleDateString('en-US', { month: 'short' }),
  mrr: 15000 + Math.floor(Math.random() * 5000) + i * 2000,
  users: 500 + Math.floor(Math.random() * 100) + i * 50,
}));

const planDistribution = [
  { name: 'Starter', value: 45, color: '#94A3B8' },
  { name: 'Pro', value: 35, color: '#233C6F' },
  { name: 'Business', value: 15, color: '#F97316' },
  { name: 'Free', value: 5, color: '#E5E7EB' },
];

export default function AdminDashboard() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformStatus] = useState<PlatformStatus[]>(mockPlatformStatus);

  const totalMRR = users.reduce((acc, u) => acc + u.mrr, 0);
  const activeUsers = users.filter(u => u.status === 'active').length;
  const totalPosts = users.reduce((acc, u) => acc + u.postsThisMonth, 0);

  const suspendUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: 'suspended' as const, mrr: 0 } : u
    ));
    toast({
      title: 'User suspended',
      description: 'The user account has been suspended',
    });
  };

  const reactivateUser = (userId: string) => {
    setUsers(users.map(u => 
      u.id === userId ? { ...u, status: 'active' as const } : u
    ));
    toast({
      title: 'User reactivated',
      description: 'The user account is now active',
    });
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPlanBadgeColor = (plan: User['plan']) => {
    switch (plan) {
      case 'starter': return 'bg-gray-100 text-gray-700';
      case 'pro': return 'bg-blue-100 text-blue-950';
      case 'business': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusBadgeColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'suspended': return 'bg-red-100 text-red-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Logo />
              <Badge className="bg-red-100 text-red-700">Admin</Badge>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Back to App
                </Button>
              </Link>
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-primary-100 text-primary-600">AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage users, subscriptions, and platform health</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-gray-900">${totalMRR.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +12.5% from last month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +8% from last month
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Posts This Month</p>
                  <p className="text-2xl font-bold text-gray-900">{totalPosts.toLocaleString()}</p>
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    +23% from last month
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Activity className="w-6 h-6 text-blue-900" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Platform Health</p>
                  <p className="text-2xl font-bold text-gray-900">98.6%</p>
                  <p className="text-sm text-yellow-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    1 degraded service
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-lg">
                  <Link2 className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="subscriptions" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Revenue
            </TabsTrigger>
            <TabsTrigger value="platforms" className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              Platforms
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>View and manage all users</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-500">User</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Plan</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Platforms</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Posts</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">MRR</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-500">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback className="text-xs">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-gray-900">{user.name}</p>
                                <p className="text-sm text-gray-500">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getPlanBadgeColor(user.plan)}>
                              {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusBadgeColor(user.status)}>
                              {user.status === 'active' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                              {user.status === 'suspended' && <XCircle className="w-3 h-3 mr-1" />}
                              {user.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                              {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex gap-1">
                              {user.connectedPlatforms.map(p => (
                                <PlatformIcon key={p} platform={p} size="sm" className="w-5 h-5" />
                              ))}
                              {user.connectedPlatforms.length === 0 && (
                                <span className="text-sm text-gray-400">None</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">{user.postsThisMonth}</td>
                          <td className="py-3 px-4 font-medium">${user.mrr}</td>
                          <td className="py-3 px-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Mail className="w-4 h-4 mr-2" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Settings className="w-4 h-4 mr-2" />
                                  Edit User
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {user.status === 'active' ? (
                                  <DropdownMenuItem
                                    onClick={() => suspendUser(user.id)}
                                    className="text-red-600"
                                  >
                                    <Ban className="w-4 h-4 mr-2" />
                                    Suspend User
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem
                                    onClick={() => reactivateUser(user.id)}
                                    className="text-green-600"
                                  >
                                    <CheckCircle2 className="w-4 h-4 mr-2" />
                                    Reactivate
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Subscriptions/Revenue Tab */}
          <TabsContent value="subscriptions" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Growth</CardTitle>
                  <CardDescription>Monthly recurring revenue over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                        <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                          }}
                          formatter={(value) => [`$${(value as number).toLocaleString()}`, 'MRR']}
                        />
                        <Line
                          type="monotone"
                          dataKey="mrr"
                          stroke="#233C6F"
                          strokeWidth={3}
                          dot={{ fill: '#233C6F' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Plan Distribution</CardTitle>
                  <CardDescription>Users by subscription tier</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={planDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {planDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center gap-4 mt-4">
                    {planDistribution.map((plan) => (
                      <div key={plan.name} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: plan.color }}
                        />
                        <span className="text-sm text-gray-600">
                          {plan.name} ({plan.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Subscription Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-gray-900">$47</p>
                    <p className="text-sm text-gray-500">Avg Revenue Per User</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-gray-900">2.3%</p>
                    <p className="text-sm text-gray-500">Monthly Churn Rate</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-gray-900">8.2</p>
                    <p className="text-sm text-gray-500">Avg Months Active</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-3xl font-bold text-gray-900">$385</p>
                    <p className="text-sm text-gray-500">Customer Lifetime Value</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Platforms Tab */}
          <TabsContent value="platforms" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Platform Status</CardTitle>
                    <CardDescription>Monitor API health and connections</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {platformStatus.map((platform) => (
                    <div
                      key={platform.platform}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <PlatformIcon platform={platform.platform} />
                        <div>
                          <p className="font-medium capitalize">{platform.platform}</p>
                          <p className="text-sm text-gray-500">
                            {platform.activeConnections.toLocaleString()} active connections
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-sm text-gray-500">API Health</p>
                          <p className="font-semibold">{platform.apiHealth}%</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Errors Today</p>
                          <p className={`font-semibold ${platform.errorsToday > 100 ? 'text-red-600' : ''}`}>
                            {platform.errorsToday}
                          </p>
                        </div>
                        <Badge
                          className={
                            platform.status === 'operational'
                              ? 'bg-green-100 text-green-700'
                              : platform.status === 'degraded'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }
                        >
                          {platform.status === 'operational' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                          {platform.status === 'degraded' && <AlertCircle className="w-3 h-3 mr-1" />}
                          {platform.status === 'outage' && <XCircle className="w-3 h-3 mr-1" />}
                          {platform.status.charAt(0).toUpperCase() + platform.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
