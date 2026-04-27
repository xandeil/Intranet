import React from 'react';

const Badge = ({ children, variant = 'default', className = "" }) => {
  // Mapeamento de estilos baseados nos seus tokens da JUCEPE
  const variants = {
    // Adicionei um fundo leve e fonte mais forte para o padrão
    default: 'bg-jucepe-light text-jucepe-primary',
    success: 'bg-green-100 text-jucepe-success',
    warning: 'bg-orange-100 text-jucepe-warning',
    danger: 'bg-red-100 text-jucepe-danger',
    outline: 'border border-jucepe-light text-jucepe-dark/70',
  };

  return (
    <span className={`
      inline-flex items-center px-2 py-0.5 
      /* Troquei rounded-full por rounded-lg ou rounded-md para alinhar com o sistema */
      rounded-lg text-[10px] font-bold uppercase tracking-wider
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