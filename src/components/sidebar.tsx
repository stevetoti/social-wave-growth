'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './logo';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Calendar,
  PenSquare,
  BarChart3,
  Sparkles,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Upload,
  Target,
  Inbox,
  FileText,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

const menuItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/calendar', icon: Calendar, label: 'Calendar' },
  { href: '/dashboard/compose', icon: PenSquare, label: 'Compose' },
  { href: '/dashboard/bulk-upload', icon: Upload, label: 'Bulk Upload', pro: true },
  { href: '/dashboard/inbox', icon: Inbox, label: 'Social Inbox', pro: true },
  { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/competitors', icon: Target, label: 'Competitors', pro: true },
  { href: '/dashboard/reports', icon: FileText, label: 'Reports', pro: true },
  { href: '/dashboard/ai-studio', icon: Sparkles, label: 'AI Studio' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <Link href="/dashboard">
              <Logo showText={!collapsed} size={collapsed ? 'sm' : 'md'} />
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className={cn('hidden lg:flex', collapsed && 'mx-auto')}
            >
              {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || 
                (item.href !== '/dashboard' && pathname.startsWith(item.href));
              
              const linkContent = (
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
                    isActive
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-600 hover:bg-gray-100',
                    collapsed && 'justify-center px-2'
                  )}
                >
                  <item.icon size={20} className={isActive ? 'text-primary-600' : ''} />
                  {!collapsed && (
                    <span className="font-medium flex-1">{item.label}</span>
                  )}
                  {!collapsed && item.pro && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-medium">
                      PRO
                    </span>
                  )}
                </Link>
              );

              if (collapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right">
                      {item.label}
                      {item.pro && ' (PRO)'}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return <div key={item.href}>{linkContent}</div>;
            })}

            {/* Admin Link */}
            <div className="pt-4 mt-4 border-t border-gray-200">
              {collapsed ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href="/admin"
                      className={cn(
                        'flex items-center justify-center px-2 py-2 rounded-lg transition-all',
                        pathname === '/admin'
                          ? 'bg-red-50 text-red-600'
                          : 'text-gray-600 hover:bg-gray-100'
                      )}
                    >
                      <Shield size={20} />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">Admin</TooltipContent>
                </Tooltip>
              ) : (
                <Link
                  href="/admin"
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg transition-all',
                    pathname === '/admin'
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <Shield size={20} />
                  <span className="font-medium">Admin</span>
                </Link>
              )}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            {collapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/login"
                    className="flex items-center justify-center p-2 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <LogOut size={20} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Log Out</TooltipContent>
              </Tooltip>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:text-red-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut size={20} />
                <span className="font-medium">Log Out</span>
              </Link>
            )}
          </div>
        </div>
      </aside>
    </TooltipProvider>
  );
}
