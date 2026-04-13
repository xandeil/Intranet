import React, { useState } from 'react';
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
import Presidencia from './pages/Rh&Comunicacao/Presidente.jsx';
import Aniversariantes from './pages/Rh&Comunicacao/Aniversariantes.jsx';
import Cronogramas from './pages/Rh&Comunicacao/Cronogramas.jsx';
import Contato from './pages/Navegacao/Contato.jsx';
import Publications from './pages/Navegacao/Publications.jsx';

// --- Documentos ---
import Documents from './pages/Navegacao/Documents.jsx';

// --- Sistemas Internos ---
import SistemasLinks from './pages/SistemasInternos/SistemasLinks.jsx';
import Monitoramento from './pages/SistemasInternos/Monitoramento.jsx';
import PowerBI from './pages/SistemasInternos/PowerBI.jsx';

// --- Relatórios ---
import Relatorios from './pages/relatorios/Relatorios.jsx';
import PontoOnline from './pages/relatorios/PontoOnline.jsx';
import Timesheet from './pages/relatorios/Timesheet.jsx';

// Pasta Perfil (Ajustado de 'user' para 'perfil')
import EditProfile from './pages/perfil/EditProfile.jsx';
import Profile from './pages/perfil/Profile.jsx';
import SettingsPage from './pages/perfil/SettingsPage.jsx';

// --- Administração ---
import Admin from "./pages/Navegacao/Admin.jsx";
import Publicar from "./pages/Header/Publicar.jsx";


// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
  const { isAuthenticated } = useAuth();

return (
    <>
      <Routes>
        {/* Rota Pública */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Rotas Protegidas */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {/* Passamos isSidebarOpen e setIsSidebarOpen com os nomes exatos */}
              <Layout 
                isSidebarOpen={isSidebarOpen} 
                setIsSidebarOpen={setIsSidebarOpen} 
              />
            </ProtectedRoute>
          }
        >
          {/* Dashboard (Home) */}
          <Route index element={<Dashboard />} />

          {/* Perfil e Configurações */}
          <Route path="perfil" element={<Profile />} />
          <Route path="perfil/editar" element={<EditProfile />} />
          <Route path="configuracoes" element={<SettingsPage />} />

          {/* Navegação Principal */}
          <Route path="documentos" element={<Documents />} />
          <Route path="publicacoes" element={<Publications />} />
          <Route path="contato" element={<Contato />} />

          {/* RH & Comunicação */}
          <Route path="presidente" element={<Presidencia />} />
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

        {/* Rota de Erro 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Overlay (Fundo escuro) - Essencial para fechar o menu no celular */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default App;