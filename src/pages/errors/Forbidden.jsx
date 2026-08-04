import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home } from 'lucide-react';
import { ROUTES } from '../../config/routes.js';

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldAlert className="w-12 h-12 text-yellow-500" />
        </div>

        <h1 className="text-6xl font-bold text-gray-300 mb-4">403</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Acesso não autorizado</h2>
        <p className="text-gray-500 mb-8">
          Seu perfil não tem permissão para acessar esta área. Entre em contato com um administrador se acredita que isso é um engano.
        </p>

        <Link
          to={ROUTES.dashboard}
          className="inline-flex items-center gap-2 px-6 py-3 bg-jucepe-secondary text-white rounded-lg font-medium hover:bg-jucepe-primary transition-colors"
        >
          <Home className="w-5 h-5" />
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
