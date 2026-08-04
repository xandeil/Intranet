import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import { ROUTES, ROUTE_SEGMENTS } from './config/routes.js';

// Layouts
import Layout from './components/layout/Layout.jsx';

// --- Páginas Base (Raiz de /pages) ---
import Dashboard from './pages/Dashboard.jsx';

// --- Autenticação e Erros ---
import Login from './pages/auth/Login.jsx';
import NotFound from './pages/errors/NotFound.jsx';
import Forbidden from './pages/errors/Forbidden.jsx';

// --- RH & Comunicação ---
import Presidencia from './pages/Rh&Comunicacao/Presidente.jsx';
import Aniversariantes from './pages/Rh&Comunicacao/Aniversariantes.jsx';
import Cronogramas from './pages/Rh&Comunicacao/Cronogramas.jsx';
import Galeria from './pages/Rh&Comunicacao/Galeria.jsx';
import Contato from './pages/Navegacao/Contato.jsx';
import Publications from './pages/Navegacao/Publications.jsx';

// --- Operacional ---
import Almoxarifado from './pages/Operacional/Almoxarifado.jsx';
import Equipamentos from './pages/Operacional/Equipamentos.jsx';
import Plenaria from './pages/Operacional/Plenaria.jsx';

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
    return <Navigate to={ROUTES.login} replace />;
  }

  return children;
};

// Rota protegida que também exige uma permissão específica (ex: 'admin')
const PermissionRoute = ({ permission, children }) => {
  const { isAuthenticated, hasPermission } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} replace />;
  }

  if (!hasPermission(permission)) {
    return <Forbidden />;
  }

  return children;
};

function App() {
  /* REATIVADO: Estado essencial para a Sidebar funcionar e não dar erro de função */
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);


  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        {/* Rota Pública */}
        <Route
          path={ROUTES.login}
          element={isAuthenticated ? <Navigate to={ROUTES.dashboard} replace /> : <Login />}
        />

        {/* Rotas Protegidas
            ROUTES.dashboard é o ponto de montagem do Layout (Sidebar/Header) e de todas
            as rotas filhas abaixo. Vem de VITE_ROUTE_DASHBOARD (padrão "/"). As páginas
            filhas usam ROUTE_SEGMENTS (relativo) aqui — e ROUTES (absoluto, já com o
            prefixo do dashboard somado) em todo o resto do app (Sidebar, Header, mockData
            etc.) — por isso trocar VITE_ROUTE_DASHBOARD para "/dashboard" não deixa nada
            para trás: cada página passa a viver em "/dashboard/perfil", "/dashboard/admin"
            etc. de forma consistente nos dois lugares. */}
        <Route
          path={ROUTES.dashboard}
          element={
            <ProtectedRoute>
              {/* ATUALIZADO: Agora passamos as props que estavam comentadas */}
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
          <Route path={ROUTE_SEGMENTS.perfil} element={<Profile />} />
          <Route path={ROUTE_SEGMENTS.perfilEditar} element={<EditProfile />} />
          <Route path={ROUTE_SEGMENTS.configuracoes} element={<SettingsPage />} />

          {/* Navegação Principal */}
          <Route path={ROUTE_SEGMENTS.documentos} element={<Documents />} />
          <Route path={ROUTE_SEGMENTS.publicacoes} element={<Publications />} />
          <Route path={ROUTE_SEGMENTS.contato} element={<Contato />} />

          {/* RH & Comunicação */}
          <Route path={ROUTE_SEGMENTS.presidente} element={<Presidencia />} />
          <Route path={ROUTE_SEGMENTS.aniversariantes} element={<Aniversariantes />} />
          <Route path={ROUTE_SEGMENTS.cronogramas} element={<Cronogramas />} />
          <Route path={ROUTE_SEGMENTS.galeria} element={<Galeria />} />

          {/* Sistemas Internos */}
          <Route path={ROUTE_SEGMENTS.sistemas} element={<SistemasLinks />} />
          <Route path={ROUTE_SEGMENTS.sistemasLinks} element={<SistemasLinks />} />
          <Route path={ROUTE_SEGMENTS.powerbi} element={<PowerBI />} />
          <Route path={ROUTE_SEGMENTS.monitoramento} element={<Monitoramento />} />

          {/* Relatórios */}
          <Route path={ROUTE_SEGMENTS.relatorios} element={<Relatorios />} />
          <Route path={ROUTE_SEGMENTS.ponto} element={<PontoOnline />} />
          <Route path={ROUTE_SEGMENTS.timesheet} element={<Timesheet />} />

          {/* Operacional */}
          <Route path={ROUTE_SEGMENTS.almoxarifado} element={<Almoxarifado />} />
          <Route path={ROUTE_SEGMENTS.equipamentos} element={<Equipamentos />} />
          <Route path={ROUTE_SEGMENTS.plenaria} element={<Plenaria />} />

          {/* Administração (exige permissão 'admin') */}
          <Route
            path={ROUTE_SEGMENTS.admin}
            element={
              <PermissionRoute permission="admin">
                <Admin />
              </PermissionRoute>
            }
          />
          <Route
            path={ROUTE_SEGMENTS.publicar}
            element={
              <PermissionRoute permission="write">
                <Publicar />
              </PermissionRoute>
            }
          />
        </Route>

        {/* Se o Dashboard não estiver na raiz (VITE_ROUTE_DASHBOARD != "/"),
            manda quem acessa "/" direto pra área protegida. */}
        {ROUTES.dashboard !== '/' && (
          <Route path="/" element={<Navigate to={ROUTES.dashboard} replace />} />
        )}

        {/* Rota de Erro 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* Overlay (Fundo escuro) - REATIVADO para permitir fechar o menu no celular ao clicar fora */}
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