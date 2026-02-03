'use client';

import { Waves } from 'lucide-react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: 'text-lg' },
    md: { icon: 28, text: 'text-xl' },
    lg: { icon: 40, text: 'text-3xl' },
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg blur-sm opacity-50" />
        <div className="relative bg-gradient-to-br from-primary-500 to-primary-700 p-2 rounded-lg">
          <Waves className="text-white" size={sizes[size].icon} />
        </div>
      </div>
      {showText && (
        <span className={`font-bold ${sizes[size].text} bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent`}>
          SocialWave
        </span>
      )}
    </div>
  );
}
