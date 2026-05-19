import React from 'react';

const Avatar = ({ name, size = 'md', className = "" }) => {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : '??';

  const sizeClasses = {
    sm: 'w-8 h-8 text-[10px]',
    md: 'w-10 h-10 text-xs',
    lg: 'w-12 h-12 text-sm'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-jucepe-primary text-white flex items-center justify-center font-bold shrink-0 shadow-sm ${className}`}>
      {initials}
    </div>
  );
};

export default Avatar;