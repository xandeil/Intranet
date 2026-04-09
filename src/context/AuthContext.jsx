import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se há sessão salva
    const savedUser = localStorage.getItem('jucepe_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (username, password, authType = 'AD') => {
    // Simulação de autenticação
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username && password) {
          const mockUser = {
            id: 1,
            name: 'Carlos Eduardo Silva',
            username: username,
            area: 'Presidência',
            role: 'admin',
            avatar: 'https://i.pravatar.cc/150?img=11',
            authType: authType, // 'AD' ou 'Oracle'
            permissions: ['read', 'write', 'admin']
          };
          
          setUser(mockUser);
          setIsAuthenticated(true);
          localStorage.setItem('jucepe_user', JSON.stringify(mockUser));
          resolve(mockUser);
        } else {
          reject(new Error('Credenciais inválidas'));
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('jucepe_user');
  };

  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false;
  };

  const value = {
    user,
    isAuthenticated,
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