'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PostCard } from '@/components/post-card';
import { PlatformIcon } from '@/components/platform-icon';
import { mockPosts } from '@/lib/mock-data';
import { Platform, Post } from '@/lib/types';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from '@dnd-kit/core';
import { useSortable, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  addDays,
  startOfWeek,
  format,
  isSameDay,
  addWeeks,
  subWeeks,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isToday,
} from 'date-fns';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  CalendarDays,
  List,
  GripVertical,
} from 'lucide-react';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

const platforms: Platform[] = ['instagram', 'facebook', 'twitter', 'linkedin', 'tiktok'];

interface DraggablePostProps {
  post: Post;
  onClick: () => void;
}

function DraggablePost({ post, onClick }: DraggablePostProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full"
    >
      <div
        className={`p-2 rounded-lg text-xs border-l-4 cursor-grab active:cursor-grabbing group ${
          post.status === 'scheduled'
            ? 'bg-primary-50 border-primary-500'
            : post.status === 'published'
            ? 'bg-secondary-50 border-secondary-500'
            : 'bg-gray-50 border-gray-400'
        }`}
      >
        <div className="flex items-start gap-1">
          <div
            {...attributes}
            {...listeners}
            className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab p-1"
          >
            <GripVertical className="w-3 h-3 text-gray-400" />
          </div>
          <button onClick={onClick} className="flex-1 text-left">
            <div className="line-clamp-2 text-gray-700">
              {post.content.slice(0, 50)}...
            </div>
            <div className="flex gap-1 mt-1">
              {post.platforms.slice(0, 3).map((p) => (
                <PlatformIcon key={p} platform={p} size="sm" className="w-4 h-4" />
              ))}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CalendarPage() {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'week' | 'month'>('week');
  const [selectedPlatforms, setSelectedPlatforms] = useState<Platform[]>(platforms);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const filteredPosts = posts.filter((post) =>
    post.platforms.some((p) => selectedPlatforms.includes(p))
  );

  const getPostsForDate = (date: Date) => {
    return filteredPosts.filter((post) => {
      const postDate = post.scheduled_at || post.published_at || post.created_at;
      return isSameDay(new Date(postDate), date);
    });
  };

  const togglePlatform = (platform: Platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  // Week view
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Month view
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const startPadding = (monthStart.getDay() + 6) % 7;
  const paddedDays = [
    ...Array.from({ length: startPadding }, (_, i) => addDays(monthStart, -(startPadding - i))),
    ...monthDays,
  ];

  const navigate = (direction: 'prev' | 'next') => {
    if (view === 'week') {
      setCurrentDate(direction === 'prev' ? subWeeks(currentDate, 1) : addWeeks(currentDate, 1));
    } else {
      setCurrentDate(direction === 'prev' ? subMonths(currentDate, 1) : addMonths(currentDate, 1));
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const postId = active.id as string;
    const targetDate = over.id as string;

    // Check if dropped on a date
    if (targetDate.startsWith('date-')) {
      const newDate = new Date(targetDate.replace('date-', ''));
      
      setPosts(posts.map(post => {
        if (post.id === postId) {
          const currentTime = post.scheduled_at 
            ? new Date(post.scheduled_at).toTimeString().slice(0, 5) 
            : '12:00';
          
          const newScheduledAt = new Date(newDate);
          const [hours, minutes] = currentTime.split(':');
          newScheduledAt.setHours(parseInt(hours), parseInt(minutes));
          
          return {
            ...post,
            scheduled_at: newScheduledAt.toISOString(),
            status: 'scheduled' as const,
          };
        }
        return post;
      }));

      toast({
        title: 'Post rescheduled',
        description: `Moved to ${format(newDate, 'MMM d, yyyy')}`,
      });
    }
  };

  const activePost = activeId ? posts.find(p => p.id === activeId) : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Calendar</h1>
          <p className="text-gray-500">Plan and schedule your content • Drag posts to reschedule</p>
        </div>
        <Link href="/dashboard/compose">
          <Button className="bg-secondary-500 hover:bg-secondary-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Filters & Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Platform Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-gray-700 mr-2">Platforms:</span>
              {platforms.map((platform) => (
                <button
                  key={platform}
                  onClick={() => togglePlatform(platform)}
                  className={`transition-opacity ${
                    selectedPlatforms.includes(platform) ? 'opacity-100' : 'opacity-40'
                  }`}
                >
                  <PlatformIcon platform={platform} size="sm" />
                </button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate('prev')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="min-w-[200px] text-center font-medium">
                {view === 'week'
                  ? `${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}`
                  : format(currentDate, 'MMMM yyyy')}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate('next')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>

              <div className="flex border rounded-lg overflow-hidden ml-4">
                <Button
                  variant={view === 'week' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('week')}
                  className="rounded-none"
                >
                  <CalendarDays className="w-4 h-4 mr-1" />
                  Week
                </Button>
                <Button
                  variant={view === 'month' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setView('month')}
                  className="rounded-none"
                >
                  <List className="w-4 h-4 mr-1" />
                  Month
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Grid */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Card>
          <CardContent className="p-4">
            {view === 'week' ? (
              <div className="grid grid-cols-7 gap-4">
                {weekDays.map((day) => {
                  const dayPosts = getPostsForDate(day);
                  const today = isToday(day);
                  const dateId = `date-${day.toISOString()}`;

                  return (
                    <div
                      key={day.toISOString()}
                      id={dateId}
                      data-droppable="true"
                      className={`min-h-[200px] p-2 rounded-lg border-2 border-dashed transition-colors ${
                        today ? 'border-primary-300 bg-primary-50/50' : 'border-transparent hover:border-gray-200'
                      }`}
                    >
                      <div
                        className={`text-center p-2 rounded-lg mb-2 ${
                          today ? 'bg-primary-100 text-primary-700' : 'bg-gray-50'
                        }`}
                      >
                        <div className="text-xs font-medium text-gray-500">
                          {format(day, 'EEE')}
                        </div>
                        <div className={`text-lg font-bold ${today ? 'text-primary-700' : ''}`}>
                          {format(day, 'd')}
                        </div>
                      </div>
                      <SortableContext
                        items={dayPosts.map(p => p.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <div className="space-y-2">
                          {dayPosts.map((post) => (
                            <DraggablePost
                              key={post.id}
                              post={post}
                              onClick={() => setSelectedPost(post)}
                            />
                          ))}
                        </div>
                      </SortableContext>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div>
                {/* Month View Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                      {day}
                    </div>
                  ))}
                </div>
                {/* Month View Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {paddedDays.map((day, index) => {
                    const dayPosts = getPostsForDate(day);
                    const isCurrentMonth = day.getMonth() === currentDate.getMonth();
                    const today = isToday(day);
                    const dateId = `date-${day.toISOString()}`;

                    return (
                      <div
                        key={index}
                        id={dateId}
                        data-droppable="true"
                        className={`min-h-[100px] p-2 border rounded-lg transition-colors ${
                          isCurrentMonth ? 'bg-white' : 'bg-gray-50'
                        } ${today ? 'ring-2 ring-primary-500' : ''} hover:border-primary-300`}
                      >
                        <div
                          className={`text-sm font-medium mb-1 ${
                            isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                          }`}
                        >
                          {format(day, 'd')}
                        </div>
                        <SortableContext
                          items={dayPosts.map(p => p.id)}
                          strategy={verticalListSortingStrategy}
                        >
                          <div className="space-y-1">
                            {dayPosts.slice(0, 2).map((post) => (
                              <button
                                key={post.id}
                                onClick={() => setSelectedPost(post)}
                                className="w-full"
                              >
                                <Badge
                                  variant="secondary"
                                  className={`w-full justify-start text-xs truncate ${
                                    post.status === 'scheduled'
                                      ? 'bg-primary-100 text-primary-700'
                                      : 'bg-secondary-100 text-secondary-700'
                                  }`}
                                >
                                  {post.content.slice(0, 20)}...
                                </Badge>
                              </button>
                            ))}
                            {dayPosts.length > 2 && (
                              <div className="text-xs text-gray-500 text-center">
                                +{dayPosts.length - 2} more
                              </div>
                            )}
                          </div>
                        </SortableContext>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Drag Overlay */}
        <DragOverlay>
          {activePost ? (
            <div className="p-2 rounded-lg text-xs border-l-4 bg-blue-100 border-blue-500 shadow-lg opacity-90">
              <div className="line-clamp-2 text-gray-700">
                {activePost.content.slice(0, 50)}...
              </div>
              <div className="flex gap-1 mt-1">
                {activePost.platforms.slice(0, 3).map((p) => (
                  <PlatformIcon key={p} platform={p} size="sm" className="w-4 h-4" />
                ))}
              </div>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Post Detail Dialog */}
      <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Post Details</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4">
              <PostCard post={selectedPost} />
              <div className="flex gap-2">
                <Link href="/dashboard/compose" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Edit Post
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setPosts(posts.filter(p => p.id !== selectedPost.id));
                    setSelectedPost(null);
                    toast({
                      title: 'Post deleted',
                      description: 'The post has been removed',
                    });
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
