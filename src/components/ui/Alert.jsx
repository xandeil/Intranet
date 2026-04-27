import React from 'react';

const Alert = ({ 
  children, 
  variant = 'info', 
  icon: Icon, 
  className = "", 
  onClose 
}) => {
  const variants = {
    info: 'bg-jucepe-dark text-white',
    success: 'bg-green-600 text-white',
    warning: 'bg-orange-500 text-white',
    danger: 'bg-red-600 text-white',
  };

  return (
    <div className={`
      ${variants[variant] || variants.info}
      p-4 sm:p-6 
      rounded-2xl /* Garantindo bordas arredondadas */
      shadow-lg 
      relative
      ${className}
    `}>
      <div className="flex items-start gap-3">
        {Icon && (
          <div className="shrink-0 mt-0.5">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        <div className="flex-1 text-sm sm:text-base">
          {children}
        </div>

        {onClose && (
          <button 
            onClick={onClose}
            className="shrink-0 ml-3 hover:opacity-80 transition-opacity"
            aria-label="Fechar"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;