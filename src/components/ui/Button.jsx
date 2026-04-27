import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', className = "", icon: Icon, ...props }) => {
  
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:pointer-events-none rounded-xl whitespace-nowrap shrink-0";
  
  const variants = {
    primary: "bg-jucepe-primary text-white hover:bg-jucepe-dark shadow-sm hover:shadow-md",
    secondary: "bg-jucepe-secondary text-white hover:bg-jucepe-accent shadow-sm",
    outline: "border-2 border-jucepe-primary text-jucepe-primary hover:bg-jucepe-light",
    ghost: "text-jucepe-primary hover:bg-jucepe-light",
    danger: "bg-jucepe-danger text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {Icon && <Icon className={`${children ? 'mr-2' : ''} ${size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'}`} />}
      {children}
    </button>
  );
};

export default Button;