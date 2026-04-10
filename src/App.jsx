import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';

// Layouts
import Layout from './components/layout/Layout.jsx';

// --- Páginas Base (Raiz de /pages) ---
import Dashboard from './pages/Dashboard.jsx';

// --- Autenticação e Erros ---
import Login from './pages/auth/Login.jsx';
import NotFound from './pages/errors/NotFound.jsx';

// --- RH & Comunicação ---
import Aniversariantes from './pages/rh/Aniversariantes.jsx';
import Cronogramas from './pages/rh/Cronogramas.jsx';
import Contato from './pages/comunicacao/Contato.jsx';
import Publications from './pages/comunicacao/Publications.jsx';

// --- Documentos ---
import Documents from './pages/documentos/Documents.jsx';

// --- Sistemas Internos ---
import SistemasLinks from './pages/sistemas/SistemasLinks.jsx';
import Monitoramento from './pages/sistemas/Monitoramento.jsx';
import PowerBI from './pages/sistemas/PowerBI.jsx';

// --- Relatórios ---
import Relatorios from './pages/relatorios/Relatorios.jsx';
import PontoOnline from './pages/relatorios/PontoOnline.jsx';
import Timesheet from './pages/relatorios/Timesheet.jsx';

// Pasta Perfil (Ajustado de 'user' para 'perfil')
import Profile from './pages/perfil/Profile.jsx';
import SettingsPage from './pages/perfil/SettingsPage.jsx';

// --- Administração ---
import Admin from './pages/administracao/Admin.jsx';
import Publicar from './pages/administracao/Publicar.jsx';


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