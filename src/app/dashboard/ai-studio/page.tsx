'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockContentIdeas, trendingTopics } from '@/lib/mock-data';
import {
  Sparkles,
  Lightbulb,
  PenLine,
  Hash,
  TrendingUp,
  Loader2,
  Copy,
  Heart,
  RefreshCw,
  Wand2,
  ArrowRight,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const mockCaptions = [
  "🌟 Success isn't just about what you accomplish, it's about what you inspire others to do. Let's grow together! #MotivationMonday",
  "📈 Small steps lead to big changes. What's one thing you're working on today to improve your social media game?",
  "💡 Pro tip: Authentic content always outperforms perfect content. Your audience wants to see the real you!",
];

const mockHashtags = [
  { tag: '#SocialMediaMarketing', posts: '15.2M' },
  { tag: '#ContentCreator', posts: '12.8M' },
  { tag: '#DigitalMarketing', posts: '10.5M' },
  { tag: '#GrowthMindset', posts: '8.9M' },
  { tag: '#EntrepreneurLife', posts: '7.2M' },
  { tag: '#MarketingTips', posts: '5.4M' },
  { tag: '#BusinessGrowth', posts: '4.1M' },
  { tag: '#ContentStrategy', posts: '3.8M' },
];

export default function AIStudioPage() {
  const { toast } = useToast();
  const [ideaPrompt, setIdeaPrompt] = useState('');
  const [captionTopic, setCaptionTopic] = useState('');
  const [hashtagKeyword, setHashtagKeyword] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [generatedCaptions, setGeneratedCaptions] = useState<string[]>([]);
  const [generatedHashtags, setGeneratedHashtags] = useState<typeof mockHashtags>([]);
  const [savedIdeas, setSavedIdeas] = useState(mockContentIdeas.filter((i) => i.is_saved));

  const generateIdeas = () => {
    setLoading('ideas');
    setTimeout(() => {
      setLoading(null);
      toast({
        title: 'Ideas Generated!',
        description: '3 new content ideas are ready for you.',
      });
    }, 2000);
  };

  const generateCaptions = () => {
    if (!captionTopic.trim()) return;
    setLoading('captions');
    setTimeout(() => {
      setLoading(null);
      setGeneratedCaptions(mockCaptions);
    }, 2000);
  };

  const generateHashtags = () => {
    if (!hashtagKeyword.trim()) return;
    setLoading('hashtags');
    setTimeout(() => {
      setLoading(null);
      setGeneratedHashtags(mockHashtags);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied!',
      description: 'Content copied to clipboard.',
    });
  };

  const saveIdea = (idea: typeof mockContentIdeas[0]) => {
    setSavedIdeas((prev) => [...prev, idea]);
    toast({
      title: 'Saved!',
      description: 'Content idea saved to your collection.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary-600" />
            AI Content Studio
          </h1>
          <p className="text-gray-500">Generate ideas, captions, and hashtags powered by AI</p>
        </div>
      </div>

      <Tabs defaultValue="ideas" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ideas" className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <span className="hidden sm:inline">Ideas</span>
          </TabsTrigger>
          <TabsTrigger value="captions" className="flex items-center gap-2">
            <PenLine className="w-4 h-4" />
            <span className="hidden sm:inline">Captions</span>
          </TabsTrigger>
          <TabsTrigger value="hashtags" className="flex items-center gap-2">
            <Hash className="w-4 h-4" />
            <span className="hidden sm:inline">Hashtags</span>
          </TabsTrigger>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            <span className="hidden sm:inline">Trending</span>
          </TabsTrigger>
        </TabsList>

        {/* Content Ideas Tab */}
        <TabsContent value="ideas" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Generate Content Ideas</CardTitle>
              <CardDescription>
                Get AI-powered content ideas tailored to your niche
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Describe your niche or topic (e.g., 'fitness coaching', 'tech startup')"
                  value={ideaPrompt}
                  onChange={(e) => setIdeaPrompt(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={generateIdeas}
                  disabled={loading === 'ideas'}
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  {loading === 'ideas' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Wand2 className="w-4 h-4" />
                  )}
                  <span className="ml-2 hidden sm:inline">Generate</span>
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {mockContentIdeas.map((idea) => (
                  <Card key={idea.id} className="bg-gray-50 border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="secondary">{idea.category}</Badge>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => saveIdea(idea)}
                          >
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Link href="/dashboard/compose">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ArrowRight className="w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">{idea.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{idea.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {idea.hashtags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs text-primary-600 bg-primary-50 px-2 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Saved Ideas */}
          {savedIdeas.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Saved Ideas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {savedIdeas.map((idea) => (
                    <div
                      key={idea.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{idea.title}</p>
                        <p className="text-sm text-gray-500">{idea.category}</p>
                      </div>
                      <Link href="/dashboard/compose">
                        <Button size="sm">Use This</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Captions Tab */}
        <TabsContent value="captions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Caption Writer</CardTitle>
              <CardDescription>
                Generate engaging captions for your posts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Describe what your post is about (e.g., 'announcing a new product launch', 'sharing a motivational message')"
                value={captionTopic}
                onChange={(e) => setCaptionTopic(e.target.value)}
                rows={3}
              />
              <div className="flex gap-3">
                <select className="border rounded-lg px-3 py-2 text-sm">
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Funny</option>
                  <option>Inspirational</option>
                </select>
                <Button
                  onClick={generateCaptions}
                  disabled={loading === 'captions' || !captionTopic.trim()}
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  {loading === 'captions' ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Wand2 className="w-4 h-4 mr-2" />
                  )}
                  Generate Captions
                </Button>
              </div>

              {generatedCaptions.length > 0 && (
                <div className="space-y-3 mt-6">
                  <h3 className="font-medium text-gray-900">Generated Captions</h3>
                  {generatedCaptions.map((caption, i) => (
                    <div
                      key={i}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <p className="text-gray-700 mb-3">{caption}</p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(caption)}
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy
                        </Button>
                        <Link href="/dashboard/compose">
                          <Button size="sm">
                            Use in Post
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={generateCaptions} className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Generate More
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Hashtags Tab */}
        <TabsContent value="hashtags" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hashtag Generator</CardTitle>
              <CardDescription>
                Find the best hashtags for your content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Input
                  placeholder="Enter a keyword (e.g., 'marketing', 'fitness', 'travel')"
                  value={hashtagKeyword}
                  onChange={(e) => setHashtagKeyword(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={generateHashtags}
                  disabled={loading === 'hashtags' || !hashtagKeyword.trim()}
                  className="bg-primary-600 hover:bg-primary-700"
                >
                  {loading === 'hashtags' ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Hash className="w-4 h-4 mr-2" />
                  )}
                  Find Hashtags
                </Button>
              </div>

              {generatedHashtags.length > 0 && (
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900">Suggested Hashtags</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        copyToClipboard(generatedHashtags.map((h) => h.tag).join(' '))
                      }
                    >
                      <Copy className="w-4 h-4 mr-1" />
                      Copy All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {generatedHashtags.map((hashtag) => (
                      <button
                        key={hashtag.tag}
                        onClick={() => copyToClipboard(hashtag.tag)}
                        className="flex items-center gap-2 px-3 py-2 bg-primary-50 text-primary-700 rounded-full hover:bg-primary-100 transition-colors"
                      >
                        <span className="font-medium">{hashtag.tag}</span>
                        <span className="text-xs text-primary-500">{hashtag.posts}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trending Tab */}
        <TabsContent value="trending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
              <CardDescription>
                Stay up-to-date with what&apos;s trending in your industry
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map((topic, i) => (
                  <div
                    key={topic.topic}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-gray-400">#{i + 1}</span>
                      <div>
                        <p className="font-semibold text-primary-600">{topic.topic}</p>
                        <p className="text-sm text-gray-500">{topic.posts}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-secondary-100 text-secondary-700">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {topic.trending}
                      </Badge>
                      <Link href="/dashboard/compose">
                        <Button size="sm" variant="outline">
                          Create Post
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Content Calendar Suggestions</CardTitle>
              <CardDescription>
                AI-powered recommendations for your content schedule
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                {['Monday', 'Wednesday', 'Friday'].map((day) => (
                  <div key={day} className="p-4 border rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">{day}</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Best time: <span className="font-medium">12:00 PM</span>
                    </p>
                    <Badge variant="secondary" className="mb-2">
                      Suggested Content
                    </Badge>
                    <p className="text-sm text-gray-600">
                      {day === 'Monday' && 'Motivational quote or weekly goals'}
                      {day === 'Wednesday' && 'Behind-the-scenes or tips'}
                      {day === 'Friday' && 'Engagement post or weekend vibes'}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
