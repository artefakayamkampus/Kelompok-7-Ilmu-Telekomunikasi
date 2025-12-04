import React from 'react';

interface GlitchTitleProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const GlitchTitle: React.FC<GlitchTitleProps> = ({ text, size = 'lg', className = '' }) => {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl md:text-8xl',
    xl: 'text-7xl md:text-9xl',
  };

  return (
    <div className={`relative inline-block group ${className}`}>
      <h1 className={`font-cyber font-black uppercase tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 relative z-10 ${sizeClasses[size]}`}>
        {text}
      </h1>
      <h1 className={`font-cyber font-black uppercase tracking-tighter text-cyan-400 absolute top-0 left-0 -z-10 opacity-0 group-hover:opacity-70 group-hover:translate-x-[-2px] group-hover:animate-pulse ${sizeClasses[size]}`}>
        {text}
      </h1>
      <h1 className={`font-cyber font-black uppercase tracking-tighter text-purple-600 absolute top-0 left-0 -z-20 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] ${sizeClasses[size]}`}>
        {text}
      </h1>
    </div>
  );
};

export default GlitchTitle;