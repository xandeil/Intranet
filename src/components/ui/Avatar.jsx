import React from 'react';

const Avatar = ({ src, alt, size = "md", className = "" }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-16 h-16",
    xl: "w-24 h-24"
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <img
        className={`${sizes[size]} rounded-full object-cover border-2 border-white shadow-sm`}
        src={src || 'https://via.placeholder.com/150'}
        alt={alt || "Usuário"}
      />
      {/* Ponto de status online */}
      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-jucepe-success ring-2 ring-white" />
    </div>
  );
};

// ESSA LINHA ABAIXO É A QUE ESTÁ FALTANDO E CAUSANDO A TELA BRANCA:
export default Avatar;