import React from 'react';

const Badge = ({ children, variant = 'default', className = "" }) => {
  // Mapeamento de estilos baseados nos seus tokens da JUCEPE
  const variants = {
    default: 'bg-jucepe-light text-jucepe-primary',
    success: 'bg-jucepe-success/20 text-jucepe-success',
    warning: 'bg-jucepe-warning/20 text-jucepe-warning',
    danger: 'bg-jucepe-danger/20 text-jucepe-danger',
    outline: 'border border-jucepe-light text-jucepe-dark/70',
  };

  return (
    <span className={`
      inline-flex items-center px-2.5 py-0.5 
      rounded-full text-xs font-semibold 
      transition-colors duration-200
      whitespace-nowrap
      ${variants[variant] || variants.default}
      ${className}
    `}>
      {children}
    </span>
  );
};

export default Badge;