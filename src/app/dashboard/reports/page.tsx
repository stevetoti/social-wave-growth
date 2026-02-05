'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { PlatformIcon } from '@/components/platform-icon';
import { Platform } from '@/lib/types';
import {
  FileText,
  Download,
  Mail,
  Calendar,
  Clock,
  Plus,
  Trash2,
  Send,
  Eye,
  BarChart3,
  TrendingUp,
  Users,
  Loader2,
  CheckCircle2,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format, subDays, subWeeks, subMonths } from 'date-fns';

interface ScheduledReport {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  recipients: string[];
  platforms: Platform[];
  metrics: string[];
  isActive: boolean;
  lastSent?: Date;
  nextSend: Date;
}

interface GeneratedReport {
  id: string;
  name: string;
  period: string;
  generatedAt: Date;
  platforms: Platform[];
  status: 'ready' | 'generating';
}

const mockScheduledReports: ScheduledReport[] = [
  {
    id: '1',
    name: 'Weekly Performance Summary',
    frequency: 'weekly',
    recipients: ['team@company.com'],
    platforms: ['instagram', 'facebook', 'twitter'],
    metrics: ['followers', 'engagement', 'reach', 'impressions'],
    isActive: true,
    lastSent: subWeeks(new Date(), 1),
    nextSend: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    name: 'Monthly Growth Report',
    frequency: 'monthly',
    recipients: ['ceo@company.com', 'marketing@company.com'],
    platforms: ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'],
    metrics: ['followers', 'engagement', 'top_posts', 'growth_rate'],
    isActive: true,
    lastSent: subMonths(new Date(), 1),
    nextSend: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    name: 'Daily Engagement Digest',
    frequency: 'daily',
    recipients: ['social@company.com'],
    platforms: ['instagram', 'twitter'],
    metrics: ['engagement', 'mentions', 'comments'],
    isActive: false,
    lastSent: subDays(new Date(), 3),
    nextSend: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
];

const mockGeneratedReports: GeneratedReport[] = [
  {
    id: 'g1',
    name: 'Weekly Performance Summary',
    period: 'Jan 27 - Feb 2, 2024',
    generatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    platforms: ['instagram', 'facebook', 'twitter'],
    status: 'ready',
  },
  {
    id: 'g2',
    name: 'Weekly Performance Summary',
    period: 'Jan 20 - Jan 26, 2024',
    generatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    platforms: ['instagram', 'facebook', 'twitter'],
    status: 'ready',
  },
  {
    id: 'g3',
    name: 'Monthly Growth Report',
    period: 'January 2024',
    generatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    platforms: ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'],
    status: 'ready',
  },
];

const availableMetrics = [
  { id: 'followers', label: 'Follower Growth', icon: Users },
  { id: 'engagement', label: 'Engagement Rate', icon: TrendingUp },
  { id: 'reach', label: 'Reach', icon: Eye },
  { id: 'impressions', label: 'Impressions', icon: BarChart3 },
  { id: 'top_posts', label: 'Top Performing Posts', icon: TrendingUp },
  { id: 'growth_rate', label: 'Growth Rate', icon: TrendingUp },
  { id: 'mentions', label: 'Mentions', icon: Users },
  { id: 'comments', label: 'Comments', icon: Users },
];

export default function ReportsPage() {
  const { toast } = useToast();
  const [scheduledReports, setScheduledReports] = useState<ScheduledReport[]>(mockScheduledReports);
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>(mockGeneratedReports);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [newReport, setNewReport] = useState({
    name: '',
    frequency: 'weekly' as 'daily' | 'weekly' | 'monthly',
    recipients: '',
    platforms: ['instagram', 'facebook'] as Platform[],
    metrics: ['followers', 'engagement'] as string[],
  });

  const toggleReportActive = (reportId: string) => {
    setScheduledReports(reports =>
      reports.map(r => r.id === reportId ? { ...r, isActive: !r.isActive } : r)
    );
    toast({
      title: 'Report updated',
      description: 'Report schedule has been updated',
    });
  };

  const deleteReport = (reportId: string) => {
    setScheduledReports(reports => reports.filter(r => r.id !== reportId));
    toast({
      title: 'Report deleted',
      description: 'Scheduled report has been removed',
    });
  };

  const createReport = () => {
    if (!newReport.name.trim() || !newReport.recipients.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    const report: ScheduledReport = {
      id: Date.now().toString(),
      name: newReport.name,
      frequency: newReport.frequency,
      recipients: newReport.recipients.split(',').map(e => e.trim()),
      platforms: newReport.platforms,
      metrics: newReport.metrics,
      isActive: true,
      nextSend: new Date(Date.now() + (newReport.frequency === 'daily' ? 1 : newReport.frequency === 'weekly' ? 7 : 30) * 24 * 60 * 60 * 1000),
    };

    setScheduledReports([...scheduledReports, report]);
    setShowCreateDialog(false);
    setNewReport({
      name: '',
      frequency: 'weekly',
      recipients: '',
      platforms: ['instagram', 'facebook'],
      metrics: ['followers', 'engagement'],
    });
    toast({
      title: 'Report created!',
      description: 'Your automated report has been scheduled',
    });
  };

  const generateReport = () => {
    setGenerating(true);
    setTimeout(() => {
      const newGeneratedReport: GeneratedReport = {
        id: Date.now().toString(),
        name: 'Custom Report',
        period: `${format(subDays(new Date(), 7), 'MMM d')} - ${format(new Date(), 'MMM d, yyyy')}`,
        generatedAt: new Date(),
        platforms: ['instagram', 'facebook', 'twitter'],
        status: 'ready',
      };
      setGeneratedReports([newGeneratedReport, ...generatedReports]);
      setGenerating(false);
      toast({
        title: 'Report generated!',
        description: 'Your report is ready to download',
      });
    }, 3000);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendNow = (reportId: string) => {
    toast({
      title: 'Report sent!',
      description: 'The report has been emailed to all recipients',
    });
  };

  const togglePlatform = (platform: Platform) => {
    setNewReport(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform],
    }));
  };

  const toggleMetric = (metric: string) => {
    setNewReport(prev => ({
      ...prev,
      metrics: prev.metrics.includes(metric)
        ? prev.metrics.filter(m => m !== metric)
        : [...prev.metrics, metric],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <FileText className="w-6 h-6 text-primary-600" />
            Performance Reports
          </h1>
          <p className="text-gray-500">Schedule automated reports and download insights</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={generateReport}
            disabled={generating}
          >
            {generating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <BarChart3 className="w-4 h-4 mr-2" />
            )}
            Generate Now
          </Button>
          <Button
            onClick={() => setShowCreateDialog(true)}
            className="bg-secondary-500 hover:bg-secondary-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Schedule Report
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{scheduledReports.filter(r => r.isActive).length}</p>
                <p className="text-sm text-gray-500">Active Schedules</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-secondary-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary-100 rounded-lg">
                <FileText className="w-6 h-6 text-secondary-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{generatedReports.length}</p>
                <p className="text-sm text-gray-500">Reports Generated</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Mail className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {scheduledReports.reduce((acc, r) => acc + r.recipients.length, 0)}
                </p>
                <p className="text-sm text-gray-500">Total Recipients</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automatically generated and sent reports</CardDescription>
        </CardHeader>
        <CardContent>
          {scheduledReports.length > 0 ? (
            <div className="space-y-4">
              {scheduledReports.map((report) => (
                <div
                  key={report.id}
                  className={`p-4 border rounded-lg ${!report.isActive ? 'opacity-60' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold text-gray-900">{report.name}</h3>
                        <Badge
                          className={
                            report.frequency === 'daily'
                              ? 'bg-blue-100 text-blue-700'
                              : report.frequency === 'weekly'
                              ? 'bg-blue-100 text-blue-950'
                              : 'bg-orange-100 text-orange-700'
                          }
                        >
                          {report.frequency.charAt(0).toUpperCase() + report.frequency.slice(1)}
                        </Badge>
                        {report.isActive && (
                          <Badge className="bg-secondary-100 text-secondary-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Active
                          </Badge>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {report.recipients.join(', ')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          Next: {format(report.nextSend, 'MMM d, yyyy')}
                        </div>
                        {report.lastSent && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            Last sent: {format(report.lastSent, 'MMM d, yyyy')}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {report.platforms.map(p => (
                          <PlatformIcon key={p} platform={p} size="sm" className="w-5 h-5" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={report.isActive}
                          onCheckedChange={() => toggleReportActive(report.id)}
                        />
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => sendNow(report.id)}
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Send Now
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600"
                        onClick={() => deleteReport(report.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="font-medium">No scheduled reports</p>
              <p className="text-sm mb-4">Set up automated reports to be sent regularly</p>
              <Button onClick={() => setShowCreateDialog(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Schedule
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Report History</CardTitle>
          <CardDescription>Previously generated reports available for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {generatedReports.map((report) => (
              <div
                key={report.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg border">
                    <FileText className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{report.name}</p>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span>{report.period}</span>
                      <span>•</span>
                      <span>Generated {format(report.generatedAt, 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {report.platforms.slice(0, 3).map(p => (
                      <PlatformIcon key={p} platform={p} size="sm" className="w-4 h-4" />
                    ))}
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm">
                    <Download className="w-4 h-4 mr-1" />
                    PDF
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Report Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Schedule Automated Report</DialogTitle>
            <DialogDescription>
              Set up a recurring report to be generated and sent automatically
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label>Report Name</Label>
              <Input
                placeholder="e.g., Weekly Performance Summary"
                value={newReport.name}
                onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Frequency</Label>
              <Select
                value={newReport.frequency}
                onValueChange={(value: 'daily' | 'weekly' | 'monthly') =>
                  setNewReport({ ...newReport, frequency: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Recipients (comma separated)</Label>
              <Input
                placeholder="email@example.com, team@example.com"
                value={newReport.recipients}
                onChange={(e) => setNewReport({ ...newReport, recipients: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Platforms</Label>
              <div className="flex gap-2">
                {(['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'] as Platform[]).map(
                  (platform) => (
                    <button
                      key={platform}
                      onClick={() => togglePlatform(platform)}
                      className={`p-2 rounded-lg border-2 transition-all ${
                        newReport.platforms.includes(platform)
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
              <Label>Metrics to Include</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableMetrics.map((metric) => (
                  <button
                    key={metric.id}
                    onClick={() => toggleMetric(metric.id)}
                    className={`flex items-center gap-2 p-2 rounded-lg border text-sm text-left transition-all ${
                      newReport.metrics.includes(metric.id)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <metric.icon className="w-4 h-4" />
                    {metric.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" onClick={() => setShowCreateDialog(false)} className="flex-1">
                Cancel
              </Button>
              <Button onClick={createReport} className="flex-1 bg-primary-600 hover:bg-primary-700">
                Create Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
