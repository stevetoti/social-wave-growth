'use client';

import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const sizes = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 48, text: 'text-3xl' },
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image 
        src="/logo.png" 
        alt="Social Wave Growth" 
        width={sizes[size].icon} 
        height={sizes[size].icon}
        className="rounded-lg"
      />
      {showText && (
        <span className={`font-bold ${sizes[size].text} bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent`}>
          SocialWave
        </span>
      )}
    </div>
  );
}
