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

// New Pages
import Aniversariantes from './pages/rh/Aniversariantes.jsx';
import Publicar from './pages/administracao/Publicar.jsx';
import SistemasLinks from './pages/sistemas/SistemasLinks.jsx';
import Cronogramas from './pages/Cronogramas.jsx';
import Contato from './pages/Contato.jsx';
import PowerBI from './pages/PowerBI.jsx';
import Monitoramento from './pages/Monitoramento.jsx';
import Relatorios from './pages/Relatorios.jsx';
import PontoOnline from './pages/PontoOnline.jsx';
import Timesheet from './pages/Timesheet.jsx';
import Profile from './pages/Profile.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

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
        {/*home*/}
        <Route index element={<Dashboard />} />

        {/* Outras rotas... */}
        <Route path="perfil" element={<Profile />} />
        <Route path="configuracoes" element={<SettingsPage />} />

        {/* Navegação Principal */}
        <Route path="documentos" element={<Documents />} />
        <Route path="publicacoes" element={<Publications />} />
        <Route path="contato" element={<Contato />} />

        {/* RH & Comunicação */}
        <Route path="presidente" element={<Cronogramas />} />
        <Route path="aniversariantes" element={<Aniversariantes />} />
        <Route path="cronogramas" element={<Cronogramas />} />

        {/* Sistemas Internos */}
        <Route path="sistemas" element={<SistemasLinks />} />
        <Route path="sistemas/links" element={<SistemasLinks />} />
        <Route path="powerbi" element={<PowerBI />} />
        <Route path="monitoramento" element={<Monitoramento />} />

        {/* Relatórios */}
        <Route path="relatorios" element={<Relatorios />} />
        <Route path="ponto" element={<PontoOnline />} />
        <Route path="timesheet" element={<Timesheet />} />

        {/* Administração */}
        <Route path="admin" element={<Admin />} />
        <Route path="administracao/publicar" element={<Publicar />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;