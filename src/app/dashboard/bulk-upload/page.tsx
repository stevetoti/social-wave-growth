'use client';

import { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// Input removed - not used
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { PlatformIcon } from '@/components/platform-icon';
import { Platform } from '@/lib/types';
// platformNames removed - not used
import {
  Upload,
  FileSpreadsheet,
  Trash2,
  Calendar,
  Clock,
  Plus,
  Download,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FileText,
  X,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, addDays } from 'date-fns';

interface BulkPost {
  id: string;
  content: string;
  platforms: Platform[];
  scheduledDate: Date;
  scheduledTime: string;
  media?: string[];
  status: 'pending' | 'valid' | 'error';
  error?: string;
}

const sampleCSVData = `content,platforms,date,time
"🚀 Exciting news coming soon! Stay tuned for our big announcement. #ComingSoon","instagram,facebook,twitter","2024-02-15","10:00"
"💡 Pro tip: Consistency is key in social media marketing. Post at least 3-5 times per week.","instagram,linkedin","2024-02-16","12:00"
"📊 Did you know? Posts with images get 2.3x more engagement than text-only posts.","twitter,facebook","2024-02-17","14:00"`;

export default function BulkUploadPage() {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [posts, setPosts] = useState<BulkPost[]>([]);
  const [selectedPosts, setSelectedPosts] = useState<Set<string>>(new Set());
  const [uploading, setUploading] = useState(false);
  const [scheduling, setScheduling] = useState(false);

  const generateMockPosts = (): BulkPost[] => {
    return [
      {
        id: '1',
        content: '🚀 Exciting news coming soon! Stay tuned for our big announcement. #ComingSoon #Startup',
        platforms: ['instagram', 'facebook', 'twitter'],
        scheduledDate: addDays(new Date(), 1),
        scheduledTime: '10:00',
        status: 'valid',
      },
      {
        id: '2',
        content: '💡 Pro tip: Consistency is key in social media marketing. Post at least 3-5 times per week to keep your audience engaged.',
        platforms: ['instagram', 'linkedin'],
        scheduledDate: addDays(new Date(), 2),
        scheduledTime: '12:00',
        status: 'valid',
      },
      {
        id: '3',
        content: '📊 Did you know? Posts with images get 2.3x more engagement than text-only posts. Start creating visual content today!',
        platforms: ['twitter', 'facebook'],
        scheduledDate: addDays(new Date(), 3),
        scheduledTime: '14:00',
        status: 'valid',
      },
      {
        id: '4',
        content: 'This post exceeds Twitter character limit because it is way too long and contains a lot of unnecessary words that should be edited down to fit within the platform restrictions that we need to follow. Adding more text to make it even longer for demonstration purposes.',
        platforms: ['twitter'],
        scheduledDate: addDays(new Date(), 4),
        scheduledTime: '16:00',
        status: 'error',
        error: 'Exceeds Twitter character limit (280)',
      },
      {
        id: '5',
        content: '🎯 5 Tips for Growing Your Social Media:\n1. Post consistently\n2. Engage with audience\n3. Use hashtags\n4. Analyze metrics\n5. Adapt strategy',
        platforms: ['instagram', 'facebook', 'linkedin', 'tiktok'],
        scheduledDate: addDays(new Date(), 5),
        scheduledTime: '18:00',
        status: 'valid',
      },
    ];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    
    // Simulate file processing
    setTimeout(() => {
      const mockPosts = generateMockPosts();
      setPosts(mockPosts);
      setUploading(false);
      toast({
        title: 'File uploaded successfully',
        description: `${mockPosts.length} posts imported from ${file.name}`,
      });
    }, 1500);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && (file.name.endsWith('.csv') || file.name.endsWith('.xlsx'))) {
      setUploading(true);
      setTimeout(() => {
        const mockPosts = generateMockPosts();
        setPosts(mockPosts);
        setUploading(false);
        toast({
          title: 'File uploaded successfully',
          description: `${mockPosts.length} posts imported`,
        });
      }, 1500);
    }
  };

  const togglePostSelection = (postId: string) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(postId)) {
      newSelected.delete(postId);
    } else {
      newSelected.add(postId);
    }
    setSelectedPosts(newSelected);
  };

  const selectAllPosts = () => {
    if (selectedPosts.size === posts.length) {
      setSelectedPosts(new Set());
    } else {
      setSelectedPosts(new Set(posts.map(p => p.id)));
    }
  };

  const deleteSelected = () => {
    setPosts(posts.filter(p => !selectedPosts.has(p.id)));
    setSelectedPosts(new Set());
    toast({
      title: 'Posts deleted',
      description: `${selectedPosts.size} posts removed`,
    });
  };

  const scheduleAll = () => {
    const validPosts = posts.filter(p => p.status === 'valid');
    if (validPosts.length === 0) {
      toast({
        title: 'No valid posts',
        description: 'Fix errors before scheduling',
        variant: 'destructive',
      });
      return;
    }

    setScheduling(true);
    setTimeout(() => {
      setScheduling(false);
      setPosts([]);
      setSelectedPosts(new Set());
      toast({
        title: 'Posts scheduled!',
        description: `${validPosts.length} posts have been scheduled`,
      });
    }, 2000);
  };

  const downloadTemplate = () => {
    const blob = new Blob([sampleCSVData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'social-wave-bulk-template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const validCount = posts.filter(p => p.status === 'valid').length;
  const errorCount = posts.filter(p => p.status === 'error').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Upload & Schedule</h1>
          <p className="text-gray-500">Import multiple posts from CSV or spreadsheet</p>
        </div>
        <Button variant="outline" onClick={downloadTemplate}>
          <Download className="w-4 h-4 mr-2" />
          Download Template
        </Button>
      </div>

      {/* Upload Area */}
      {posts.length === 0 && (
        <Card>
          <CardContent className="p-8">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-primary-400 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
              {uploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-primary-500 animate-spin mb-4" />
                  <p className="text-lg font-medium text-gray-700">Processing file...</p>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop your file here or click to upload
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Supports CSV and Excel files (.csv, .xlsx)
                  </p>
                  <div className="flex justify-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FileSpreadsheet className="w-4 h-4" />
                      CSV
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FileText className="w-4 h-4" />
                      Excel
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-3 font-bold">
                  1
                </div>
                <h4 className="font-medium mb-1">Download Template</h4>
                <p className="text-sm text-gray-500">Get our CSV template with the correct format</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-3 font-bold">
                  2
                </div>
                <h4 className="font-medium mb-1">Add Your Content</h4>
                <p className="text-sm text-gray-500">Fill in your posts, platforms, and schedule times</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mx-auto mb-3 font-bold">
                  3
                </div>
                <h4 className="font-medium mb-1">Upload & Schedule</h4>
                <p className="text-sm text-gray-500">Upload your file and schedule all posts at once</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Posts Preview */}
      {posts.length > 0 && (
        <>
          {/* Summary Bar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedPosts.size === posts.length}
                      onCheckedChange={selectAllPosts}
                    />
                    <span className="text-sm font-medium">
                      {selectedPosts.size > 0 ? `${selectedPosts.size} selected` : 'Select all'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="flex items-center gap-1 text-secondary-600">
                      <CheckCircle2 className="w-4 h-4" />
                      {validCount} valid
                    </span>
                    {errorCount > 0 && (
                      <span className="flex items-center gap-1 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        {errorCount} errors
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {selectedPosts.size > 0 && (
                    <Button variant="outline" onClick={deleteSelected} className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Selected
                    </Button>
                  )}
                  <Button
                    onClick={scheduleAll}
                    disabled={scheduling || validCount === 0}
                    className="bg-secondary-500 hover:bg-secondary-600 text-white"
                  >
                    {scheduling ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Calendar className="w-4 h-4 mr-2" />
                    )}
                    Schedule {validCount} Posts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts List */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                className={post.status === 'error' ? 'border-red-200 bg-red-50' : ''}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Checkbox
                      checked={selectedPosts.has(post.id)}
                      onCheckedChange={() => togglePostSelection(post.id)}
                      className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0"
                          onClick={() => {
                            setPosts(posts.filter(p => p.id !== post.id));
                          }}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          {post.platforms.map((p) => (
                            <PlatformIcon key={p} platform={p} size="sm" />
                          ))}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {format(post.scheduledDate, 'MMM d, yyyy')}
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Clock className="w-4 h-4" />
                          {post.scheduledTime}
                        </div>
                        {post.status === 'valid' && (
                          <Badge className="bg-secondary-100 text-secondary-700">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Valid
                          </Badge>
                        )}
                        {post.status === 'error' && (
                          <Badge variant="destructive">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {post.error}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add More */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Upload More Posts
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
