'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { PlatformIcon } from '@/components/platform-icon';
import { Platform } from '@/lib/types';
import { platformNames } from '@/lib/mock-data';
import {
  Calendar,
  Clock,
  Image as ImageIcon,
  Video,
  Sparkles,
  Send,
  Save,
  Loader2,
  X,
  Hash,
  Smile,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';

const platforms: Platform[] = ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'];

const characterLimits: Record<Platform, number> = {
  instagram: 2200,
  facebook: 63206,
  twitter: 280,
  linkedin: 3000,
  tiktok: 2200,
};

const mockAISuggestions = [
  "🚀 Ready to take your social media game to the next level? Here's how we're helping businesses grow their audience...",
  "💡 Pro tip: Consistency is key! Post at least 3-5 times per week to keep your audience engaged.",
  "📊 Did you know? Posts with images get 2.3x more engagement than text-only posts. Start creating visual content today!",
];

const mockHashtags = [
  '#SocialMediaMarketing',
  '#DigitalMarketing',
  '#ContentCreation',
  '#GrowthHacking',
  '#MarketingTips',
  '#BusinessGrowth',
];

export default function ComposePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [content, setContent] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(['instagram', 'facebook']);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>();
  const [scheduleTime, setScheduleTime] = useState('12:00');
  const [isScheduled, setIsScheduled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [showAISuggestions, setShowAISuggestions] = useState(false);

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const getCharacterLimit = () => {
    const minLimit = Math.min(
      ...selectedPlatforms.map((p) => characterLimits[p])
    );
    return minLimit;
  };

  const handleAISuggestion = () => {
    setAiLoading(true);
    setTimeout(() => {
      setAiLoading(false);
      setShowAISuggestions(true);
    }, 1500);
  };

  const applyAISuggestion = (suggestion: string) => {
    setContent(suggestion);
    setShowAISuggestions(false);
  };

  const addHashtag = (hashtag: string) => {
    setContent((prev) => prev + ' ' + hashtag);
  };

  const handlePost = (action: 'now' | 'schedule' | 'draft') => {
    if (selectedPlatforms.length === 0) {
      toast({
        title: 'Select platforms',
        description: 'Please select at least one platform to post to.',
        variant: 'destructive',
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: 'Add content',
        description: 'Please add some content to your post.',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const messages = {
        now: { title: 'Posted!', desc: 'Your content has been published.' },
        schedule: { title: 'Scheduled!', desc: 'Your post has been scheduled.' },
        draft: { title: 'Saved!', desc: 'Your draft has been saved.' },
      };
      toast({
        title: messages[action].title,
        description: messages[action].desc,
      });
      router.push('/dashboard/calendar');
    }, 1500);
  };

  const characterLimit = getCharacterLimit();
  const isOverLimit = content.length > characterLimit;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create Post</h1>
        <p className="text-gray-500">Compose and schedule content for your social platforms</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Composer */}
        <div className="lg:col-span-2 space-y-6">
          {/* Platform Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {platforms.map((platform) => (
                  <button
                    key={platform}
                    onClick={() => togglePlatform(platform)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                      selectedPlatforms.includes(platform)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <PlatformIcon platform={platform} size="sm" />
                    <span className="text-sm font-medium">{platformNames[platform]}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Content</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAISuggestion}
                disabled={aiLoading}
              >
                {aiLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4 mr-2 text-primary-600" />
                )}
                AI Suggest
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {showAISuggestions && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-700">
                      AI Suggestions
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => setShowAISuggestions(false)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  {mockAISuggestions.map((suggestion, i) => (
                    <button
                      key={i}
                      onClick={() => applyAISuggestion(suggestion)}
                      className="w-full text-left p-3 bg-white rounded-lg border border-primary-200 hover:border-primary-400 transition-colors text-sm"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <div className="relative">
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="What's on your mind? Share something with your audience..."
                  className="min-h-[200px] resize-none text-base"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Smile className="w-4 h-4 text-gray-400" />
                  </Button>
                  <span
                    className={`text-sm ${
                      isOverLimit ? 'text-red-500 font-medium' : 'text-gray-400'
                    }`}
                  >
                    {content.length}/{characterLimit}
                  </span>
                </div>
              </div>

              {/* Hashtag Suggestions */}
              <div className="flex items-center gap-2 flex-wrap">
                <Hash className="w-4 h-4 text-gray-400" />
                {mockHashtags.slice(0, 5).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => addHashtag(tag)}
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-primary-100 hover:text-primary-700 transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Media Upload */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
                <Button variant="outline" className="flex-1">
                  <Video className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Schedule */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="schedule"
                  checked={isScheduled}
                  onCheckedChange={(checked) => setIsScheduled(!!checked)}
                />
                <Label htmlFor="schedule">Schedule for later</Label>
              </div>

              {isScheduled && (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {scheduleDate
                            ? format(scheduleDate, 'PPP')
                            : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={scheduleDate}
                          onSelect={setScheduleDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Preview Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedPlatforms.length > 0 ? (
                <div className="space-y-4">
                  {selectedPlatforms.map((platform) => (
                    <div
                      key={platform}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <PlatformIcon platform={platform} size="sm" />
                        <span className="text-sm font-medium">
                          {platformNames[platform]}
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-gray-300" />
                          <div>
                            <div className="text-sm font-medium">Your Brand</div>
                            <div className="text-xs text-gray-500">Just now</div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">
                          {content || 'Your post preview will appear here...'}
                        </p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {content.length}/{characterLimits[platform]} characters
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">
                  Select platforms to see previews
                </p>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              className="w-full bg-secondary-500 hover:bg-secondary-600 text-white"
              onClick={() => handlePost(isScheduled ? 'schedule' : 'now')}
              disabled={loading || isOverLimit}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : isScheduled ? (
                <Clock className="w-4 h-4 mr-2" />
              ) : (
                <Send className="w-4 h-4 mr-2" />
              )}
              {isScheduled ? 'Schedule Post' : 'Post Now'}
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handlePost('draft')}
              disabled={loading}
            >
              <Save className="w-4 h-4 mr-2" />
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
