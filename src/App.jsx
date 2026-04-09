import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

// Layouts
import Layout from './components/layout/Layout.jsx';

// Pages
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Documents from './pages/Documents.jsx';
import Publications from './pages/Publications.jsx';
import Admin from './pages/Admin.jsx';
import NotFound from './pages/NotFound.jsx';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/" replace /> : <Login />} 
      />
      
      {/* Protected Routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="documentos" element={<Documents />} />
        <Route path="publicacoes" element={<Publications />} />
        <Route path="admin" element={<Admin />} />
        <Route path="contato" element={<div className="p-8 text-center text-gray-500">Página de Contato em desenvolvimento</div>} />
        <Route path="presidente" element={<div className="p-8 text-center text-gray-500">Agenda do Presidente em desenvolvimento</div>} />
        <Route path="aniversariantes" element={<div className="p-8 text-center text-gray-500">Lista de Aniversariantes em desenvolvimento</div>} />
        <Route path="cronogramas" element={<div className="p-8 text-center text-gray-500">Cronogramas em desenvolvimento</div>} />
        <Route path="sistemas" element={<div className="p-8 text-center text-gray-500">Sistemas Internos em desenvolvimento</div>} />
        <Route path="powerbi" element={<div className="p-8 text-center text-gray-500">Power BI em desenvolvimento</div>} />
        <Route path="monitoramento" element={<div className="p-8 text-center text-gray-500">Monitoramento Zabbix em desenvolvimento</div>} />
        <Route path="relatorios" element={<div className="p-8 text-center text-gray-500">Relatórios em desenvolvimento</div>} />
        <Route path="ponto" element={<div className="p-8 text-center text-gray-500">Ponto Online em desenvolvimento</div>} />
        <Route path="timesheet" element={<div className="p-8 text-center text-gray-500">Timesheet em desenvolvimento</div>} />
      </Route>
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;