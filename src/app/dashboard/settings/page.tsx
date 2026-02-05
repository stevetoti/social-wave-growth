'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { PlatformIcon } from '@/components/platform-icon';
import { mockSocialAccounts, platformNames } from '@/lib/mock-data';
import {
  User,
  CreditCard,
  Link2,
  Users,
  Bell,
  Shield,
  Save,
  Loader2,
  Check,
  Plus,
  ExternalLink,
  AlertCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // Account settings
  const [fullName, setFullName] = useState('Social Wave Growth');
  const [email, setEmail] = useState('demo@socialwavegrowth.com');
  const [businessName, setBusinessName] = useState('Social Wave Growth');
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    postPublished: true,
    weeklyReport: true,
    teamActivity: false,
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: 'Settings saved',
        description: 'Your changes have been saved successfully.',
      });
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account and preferences</p>
      </div>

      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="connections" className="flex items-center gap-2">
            <Link2 className="w-4 h-4" />
            <span className="hidden sm:inline">Connections</span>
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Team</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
        </TabsList>

        {/* Account Tab */}
        <TabsContent value="account" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl bg-primary-100 text-primary-600">
                    SW
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-gray-500 mt-1">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="businessName">Business/Brand Name</Label>
                  <Input
                    id="businessName"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Changes
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password & Security</CardTitle>
              <CardDescription>Manage your password and security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline">Change Password</Button>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Connections Tab */}
        <TabsContent value="connections" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Accounts</CardTitle>
              <CardDescription>Manage your social media connections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockSocialAccounts.map((account) => (
                <div
                  key={account.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <PlatformIcon platform={account.platform} />
                    <div>
                      <p className="font-medium">{platformNames[account.platform]}</p>
                      <p className="text-sm text-gray-500">{account.account_handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {account.is_connected ? (
                      <>
                        <Badge className="bg-secondary-100 text-secondary-700">
                          <Check className="w-3 h-3 mr-1" />
                          Connected
                        </Badge>
                        <Button variant="outline" size="sm">
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" className="bg-primary-600 hover:bg-primary-700">
                        <Plus className="w-4 h-4 mr-1" />
                        Connect
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Manage your subscription</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-6 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg text-white">
                <div>
                  <Badge className="bg-white/20 text-white mb-2">Pro Plan</Badge>
                  <p className="text-3xl font-bold">$49/month</p>
                  <p className="text-primary-100">Billed monthly • Renews Feb 15, 2024</p>
                </div>
                <div className="text-right">
                  <Button variant="secondary" className="bg-white text-primary-600 hover:bg-gray-100">
                    Upgrade Plan
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your payment information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 bg-gray-200 rounded flex items-center justify-center text-xs font-bold">
                    VISA
                  </div>
                  <div>
                    <p className="font-medium">•••• •••• •••• 4242</p>
                    <p className="text-sm text-gray-500">Expires 12/26</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Update
                </Button>
              </div>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: 'Jan 15, 2024', amount: '$49.00', status: 'Paid' },
                  { date: 'Dec 15, 2023', amount: '$49.00', status: 'Paid' },
                  { date: 'Nov 15, 2023', amount: '$49.00', status: 'Paid' },
                ].map((invoice, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{invoice.date}</p>
                      <p className="text-sm text-gray-500">Pro Plan</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{invoice.amount}</span>
                      <Badge variant="secondary">{invoice.status}</Badge>
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>Manage your team and their permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>SW</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">Social Wave Growth</p>
                    <p className="text-sm text-gray-500">demo@socialwavegrowth.com</p>
                  </div>
                </div>
                <Badge>Owner</Badge>
              </div>

              <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg text-gray-500">
                <div className="text-center">
                  <Users className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="font-medium">Invite Team Members</p>
                  <p className="text-sm mb-4">Collaborate with your team on content creation</p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Invite Member
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-amber-800">Upgrade for more team members</p>
                  <p className="text-sm text-amber-700">
                    Your Pro plan includes up to 3 team members. Upgrade to Business for unlimited.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-medium">Delivery Methods</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, email: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                  </div>
                  <Switch
                    checked={notifications.push}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, push: checked })
                    }
                  />
                </div>
              </div>

              <hr />

              <div className="space-y-4">
                <h3 className="font-medium">Activity Notifications</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Post Published</p>
                    <p className="text-sm text-gray-500">When your scheduled posts go live</p>
                  </div>
                  <Switch
                    checked={notifications.postPublished}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, postPublished: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Weekly Performance Report</p>
                    <p className="text-sm text-gray-500">Summary of your weekly analytics</p>
                  </div>
                  <Switch
                    checked={notifications.weeklyReport}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, weeklyReport: checked })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Team Activity</p>
                    <p className="text-sm text-gray-500">When team members make changes</p>
                  </div>
                  <Switch
                    checked={notifications.teamActivity}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, teamActivity: checked })
                    }
                  />
                </div>
              </div>

              <Button onClick={handleSave} disabled={loading}>
                {loading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
