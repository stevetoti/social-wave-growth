'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { PlatformIcon } from '@/components/platform-icon';
import { Platform } from '@/lib/types';
import {
  Search,
  Send,
  MoreHorizontal,
  Star,
  Archive,
  Trash2,
  Clock,
  CheckCheck,
  MessageCircle,
  RefreshCw,
  Inbox,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format, formatDistanceToNow } from 'date-fns';

interface Message {
  id: string;
  from: {
    name: string;
    handle: string;
    avatar?: string;
    platform: Platform;
  };
  content: string;
  timestamp: Date;
  isRead: boolean;
  isStarred: boolean;
  isArchived: boolean;
  type: 'dm' | 'mention' | 'comment';
  postContent?: string;
  replies?: {
    id: string;
    content: string;
    timestamp: Date;
    isYou: boolean;
  }[];
}

const mockMessages: Message[] = [
  {
    id: '1',
    from: {
      name: 'Sarah Chen',
      handle: '@sarahchen_dev',
      platform: 'instagram',
    },
    content: "Hi! I've been following your content for a while and I'm curious about your social media scheduling workflow. Would love to learn more!",
    timestamp: new Date(Date.now() - 15 * 60 * 1000),
    isRead: false,
    isStarred: true,
    isArchived: false,
    type: 'dm',
    replies: [],
  },
  {
    id: '2',
    from: {
      name: 'Marcus Johnson',
      handle: '@marcus_growth',
      platform: 'twitter',
    },
    content: 'Great thread on content strategy! 🔥 Would you be open to a collaboration?',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    isStarred: false,
    isArchived: false,
    type: 'mention',
    postContent: 'Your recent thread on "5 tips for growing your audience"',
  },
  {
    id: '3',
    from: {
      name: 'Emily Rodriguez',
      handle: '@emily_creative',
      platform: 'facebook',
    },
    content: "This is exactly what I needed! Thanks for sharing these insights. Quick question - what tools do you recommend for scheduling?",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    isRead: true,
    isStarred: false,
    isArchived: false,
    type: 'comment',
    postContent: 'Your post about "Best times to post on social media"',
    replies: [
      {
        id: 'r1',
        content: "Thanks Emily! I actually use Social Wave Growth for all my scheduling. It's been a game changer!",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        isYou: true,
      },
    ],
  },
  {
    id: '4',
    from: {
      name: 'David Kim',
      handle: '@david_startupxyz',
      platform: 'linkedin',
    },
    content: "I'd love to discuss a potential partnership opportunity. Our audiences seem very aligned. When would be a good time to chat?",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: true,
    isStarred: true,
    isArchived: false,
    type: 'dm',
    replies: [],
  },
  {
    id: '5',
    from: {
      name: 'TikTok User',
      handle: '@creative_vibes',
      platform: 'tiktok',
    },
    content: "Yo this video is fire 🔥🔥 How did you edit this? What app do you use?",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    isRead: true,
    isStarred: false,
    isArchived: false,
    type: 'comment',
    postContent: 'Your video about "Quick social media hacks"',
    replies: [],
  },
];

export default function InboxPage() {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'unread' | 'starred' | 'archived'>('all');
  const [replyText, setReplyText] = useState('');
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');

  const filteredMessages = messages.filter((m) => {
    // Search filter
    if (searchQuery && !m.content.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !m.from.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Platform filter
    if (platformFilter !== 'all' && m.from.platform !== platformFilter) {
      return false;
    }
    // Status filter
    switch (filter) {
      case 'unread': return !m.isRead && !m.isArchived;
      case 'starred': return m.isStarred && !m.isArchived;
      case 'archived': return m.isArchived;
      default: return !m.isArchived;
    }
  });

  const unreadCount = messages.filter(m => !m.isRead && !m.isArchived).length;

  const markAsRead = (messageId: string) => {
    setMessages(messages.map(m =>
      m.id === messageId ? { ...m, isRead: true } : m
    ));
  };

  const toggleStar = (messageId: string) => {
    setMessages(messages.map(m =>
      m.id === messageId ? { ...m, isStarred: !m.isStarred } : m
    ));
  };

  const archiveMessage = (messageId: string) => {
    setMessages(messages.map(m =>
      m.id === messageId ? { ...m, isArchived: true } : m
    ));
    if (selectedMessage?.id === messageId) {
      setSelectedMessage(null);
    }
    toast({
      title: 'Message archived',
      description: 'The conversation has been archived',
    });
  };

  const sendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;

    const reply = {
      id: Date.now().toString(),
      content: replyText,
      timestamp: new Date(),
      isYou: true,
    };

    setMessages(messages.map(m =>
      m.id === selectedMessage.id
        ? { ...m, replies: [...(m.replies || []), reply] }
        : m
    ));

    setSelectedMessage({
      ...selectedMessage,
      replies: [...(selectedMessage.replies || []), reply],
    });

    setReplyText('');
    toast({
      title: 'Reply sent!',
      description: 'Your message has been sent',
    });
  };

  const selectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.isRead) {
      markAsRead(message.id);
    }
  };

  const getTypeIcon = (type: Message['type']) => {
    switch (type) {
      case 'dm': return '💬';
      case 'mention': return '@';
      case 'comment': return '💭';
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Inbox className="w-6 h-6 text-primary-600" />
            Social Inbox
          </h1>
          <p className="text-gray-500">
            All your messages, mentions, and comments in one place
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-100 text-red-700">{unreadCount} unread</Badge>
            )}
          </p>
        </div>
        <Button variant="outline" onClick={() => toast({ title: 'Syncing...', description: 'Fetching latest messages' })}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync
        </Button>
      </div>

      <div className="flex-1 grid lg:grid-cols-3 gap-6 min-h-0">
        {/* Message List */}
        <Card className="lg:col-span-1 flex flex-col overflow-hidden">
          <CardHeader className="pb-3">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant={filter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'unread' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('unread')}
                >
                  Unread
                </Button>
                <Button
                  variant={filter === 'starred' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('starred')}
                >
                  <Star className="w-3 h-3 mr-1" />
                  Starred
                </Button>
                <Button
                  variant={filter === 'archived' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter('archived')}
                >
                  <Archive className="w-3 h-3 mr-1" />
                  Archived
                </Button>
              </div>
              <div className="flex gap-1">
                <Button
                  variant={platformFilter === 'all' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPlatformFilter('all')}
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
                {(['instagram', 'twitter', 'facebook', 'linkedin', 'tiktok'] as Platform[]).map((p) => (
                  <Button
                    key={p}
                    variant={platformFilter === p ? 'default' : 'ghost'}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setPlatformFilter(p)}
                  >
                    <PlatformIcon platform={p} size="sm" className="w-4 h-4" />
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0">
            {filteredMessages.length > 0 ? (
              <div className="divide-y">
                {filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => selectMessage(message)}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                      selectedMessage?.id === message.id ? 'bg-primary-50' : ''
                    } ${!message.isRead ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={message.from.avatar} />
                          <AvatarFallback className="text-xs">
                            {message.from.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1">
                          <PlatformIcon platform={message.from.platform} size="sm" className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`font-medium text-sm ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.from.name}
                          </span>
                          <div className="flex items-center gap-1">
                            {message.isStarred && <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />}
                            <span className="text-xs text-gray-500">
                              {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 mb-1">
                          <Badge variant="secondary" className="text-xs px-1.5 py-0">
                            {getTypeIcon(message.type)} {message.type}
                          </Badge>
                        </div>
                        <p className={`text-sm line-clamp-2 ${!message.isRead ? 'text-gray-900' : 'text-gray-500'}`}>
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 p-8">
                <Inbox className="w-12 h-12 text-gray-300 mb-4" />
                <p className="font-medium">No messages found</p>
                <p className="text-sm">Try adjusting your filters</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="lg:col-span-2 flex flex-col overflow-hidden">
          {selectedMessage ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={selectedMessage.from.avatar} />
                      <AvatarFallback>
                        {selectedMessage.from.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{selectedMessage.from.name}</h3>
                        <PlatformIcon platform={selectedMessage.from.platform} size="sm" />
                      </div>
                      <p className="text-sm text-gray-500">{selectedMessage.from.handle}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleStar(selectedMessage.id)}
                    >
                      <Star
                        className={`w-4 h-4 ${
                          selectedMessage.isStarred ? 'text-yellow-500 fill-yellow-500' : ''
                        }`}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => archiveMessage(selectedMessage.id)}
                    >
                      <Archive className="w-4 h-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleStar(selectedMessage.id)}>
                          <Star className="w-4 h-4 mr-2" />
                          {selectedMessage.isStarred ? 'Unstar' : 'Star'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => archiveMessage(selectedMessage.id)}>
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6">
                {/* Original Message Context */}
                {selectedMessage.postContent && (
                  <div className="mb-4 p-3 bg-gray-100 rounded-lg text-sm">
                    <span className="text-gray-500">In response to: </span>
                    <span className="text-gray-700">{selectedMessage.postContent}</span>
                  </div>
                )}

                {/* Message Thread */}
                <div className="space-y-4">
                  {/* Original Message */}
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="text-xs">
                        {selectedMessage.from.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-4">
                        <p className="text-gray-900">{selectedMessage.content}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {format(selectedMessage.timestamp, 'MMM d, yyyy h:mm a')}
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  {selectedMessage.replies?.map((reply) => (
                    <div key={reply.id} className={`flex gap-3 ${reply.isYou ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs bg-primary-100 text-primary-600">
                          {reply.isYou ? 'You' : selectedMessage.from.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`flex-1 ${reply.isYou ? 'text-right' : ''}`}>
                        <div className={`inline-block rounded-lg p-4 ${
                          reply.isYou ? 'bg-primary-600 text-white' : 'bg-gray-100'
                        }`}>
                          <p>{reply.content}</p>
                        </div>
                        <div className={`flex items-center gap-2 mt-1 text-xs text-gray-500 ${
                          reply.isYou ? 'justify-end' : ''
                        }`}>
                          {reply.isYou && <CheckCheck className="w-3 h-3 text-primary-500" />}
                          <Clock className="w-3 h-3" />
                          {format(reply.timestamp, 'h:mm a')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Reply Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Textarea
                    placeholder={`Reply to ${selectedMessage.from.name}...`}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="resize-none"
                    rows={2}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendReply();
                      }
                    }}
                  />
                  <Button
                    onClick={sendReply}
                    disabled={!replyText.trim()}
                    className="bg-primary-600 hover:bg-primary-700 self-end"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Press Enter to send, Shift+Enter for new line
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
              <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium">Select a conversation</h3>
              <p className="text-sm">Choose a message from the list to view details</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
