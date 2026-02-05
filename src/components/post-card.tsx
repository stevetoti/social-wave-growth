'use client';

import { Post } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PlatformIcon } from './platform-icon';
import { format } from 'date-fns';
import { Calendar, Clock, MoreHorizontal, Edit, Trash2, Copy } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface PostCardProps {
  post: Post;
  onEdit?: (post: Post) => void;
  onDelete?: (post: Post) => void;
  onDuplicate?: (post: Post) => void;
  className?: string;
}

const statusStyles = {
  draft: 'bg-gray-100 text-gray-700',
  scheduled: 'bg-primary-100 text-primary-700',
  published: 'bg-secondary-100 text-secondary-700',
  failed: 'bg-red-100 text-red-700',
};

const statusLabels = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  published: 'Published',
  failed: 'Failed',
};

export function PostCard({ post, onEdit, onDelete, onDuplicate, className }: PostCardProps) {
  const displayDate = post.scheduled_at || post.published_at || post.created_at;

  return (
    <Card className={cn('hover:shadow-md transition-shadow', className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={statusStyles[post.status]}>{statusLabels[post.status]}</Badge>
              <div className="flex items-center gap-1 text-sm text-gray-500">
                {post.status === 'scheduled' ? (
                  <Clock className="w-3.5 h-3.5" />
                ) : (
                  <Calendar className="w-3.5 h-3.5" />
                )}
                <span>{format(new Date(displayDate), 'MMM d, yyyy h:mm a')}</span>
              </div>
            </div>
            <p className="text-sm text-gray-700 line-clamp-3 mb-3">{post.content}</p>
            <div className="flex items-center gap-1.5">
              {post.platforms.map((platform) => (
                <PlatformIcon key={platform} platform={platform} size="sm" />
              ))}
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onEdit?.(post)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDuplicate?.(post)}>
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onDelete?.(post)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
