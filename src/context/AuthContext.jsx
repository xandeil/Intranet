import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

// A sessão vive num cookie HttpOnly gravado pelo BFF (server/). O React não
// consegue ler esse cookie: ele só pergunta ao BFF quem é o usuário logado.
const buscarSessao = async () => {
  const res = await fetch('/api/auth/me', { credentials: 'include' });
  const dados = await res.json().catch(() => ({}));
  return res.ok ? { user: dados.user } : { portalUrl: dados.portalUrl };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [portalUrl, setPortalUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelado = false;

    buscarSessao()
      .then((sessao) => {
        if (cancelado) return;
        setUser(sessao.user || null);
        setPortalUrl(sessao.portalUrl || null);
      })
      .catch(() => {
        // BFF fora do ar: segue como não autenticado
      })
      .finally(() => {
        if (!cancelado) setLoading(false);
      });

    return () => {
      cancelado = true;
    };
  }, []);

  // O login acontece no portal Login Único; ele devolve o usuário em /auth/sso.
  const login = async () => {
    const url = portalUrl || (await buscarSessao()).portalUrl;
    if (!url) {
      throw new Error('Login Único indisponível');
    }
    window.location.href = url;
  };

  const logout = async () => {
    let destino = portalUrl;
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const dados = await res.json().catch(() => ({}));
      destino = dados.portalUrl || destino;
    } finally {
      setUser(null);
      window.location.href = destino || '/login';
    }
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    hasPermission
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
