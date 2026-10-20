import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Building2, LogIn } from 'lucide-react';

const mensagensErro = {
  sso: 'Não foi possível concluir o login pelo Login Único. Por favor, tente novamente.',
};

const Login = () => {
  const { login } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(mensagensErro[searchParams.get('erro')] || '');

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      // Redireciona para o portal; a página é trocada, então não há "depois".
      await login();
    } catch (err) {
      setError('O Login Único está indisponível no momento. Tente novamente em instantes.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-jucepe-primary via-jucepe-primary to-jucepe-dark flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
            <Building2 className="w-10 h-10 text-jucepe-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">INTRANET</h1>
          <p className="text-blue-200">Junta Comercial de Pernambuco</p>
          <p className="text-blue-300 text-sm mt-1">Intranet Governamental</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Acesso ao Sistema
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          <p className="text-sm text-gray-600 text-center mb-5">
            Use sua conta do Login Único JUCEPE para acessar a Intranet.
          </p>

          {/* Login Único Button */}
          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-3 bg-jucepe-secondary hover:bg-jucepe-primary text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Redirecionando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" />
                Entrar pelo Login Único
              </span>
            )}
          </button>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Acesso restrito a servidores autorizados.
              <br />
              Todas as atividades são monitoradas.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-200 text-sm">
          © 2024 JUCEPE - Todos os direitos reservados
        </div>
      </div>
    </div>
  );
};

export default Login;
