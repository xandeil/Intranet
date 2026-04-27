import React from 'react';

const Avatar = ({ name, size = 'md' }) => {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : '??';

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base'
  };

  return (
    <div className={`${sizeClasses[size]} rounded-full bg-jucepe-primary text-white flex items-center justify-center font-bold`}>
      {initials}
    </div>
  );
};

// ESTA LINHA É A QUE ESTÁ FALTANDO OU COM ERRO:
export default Avatar;