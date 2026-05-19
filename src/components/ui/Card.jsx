import React from 'react';

const Card = ({ children, title, icon: Icon, className = "", onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white 
        rounded-2xl /* Usando classe padrão do Tailwind como fallback */
        shadow-card 
        p-4 sm:p-6 
        border border-jucepe-light 
        transition-all 
        duration-200
        ${onClick ? 'cursor-pointer hover:shadow-hover hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {/* Cabeçalho do Card (Opcional) */}
      {(title || Icon) && (
        <div className="flex items-center gap-3 mb-4">
          {Icon && <Icon className="w-5 h-5 text-jucepe-secondary shrink-0" />}
          {title && <h3 className="font-bold text-jucepe-dark text-base sm:text-lg leading-tight">{title}</h3>}
        </div>
      )}

      {/* Conteúdo do Card */}
      <div className="text-jucepe-text-main">
        {children}
      </div>
    </div>
  );
};

export default Card;