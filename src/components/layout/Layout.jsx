import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import MensagemModal from './MensagemModal.jsx';

// Atualizado para receber isSidebarOpen e setIsSidebarOpen do App.jsx
const Layout = ({ isSidebarOpen, setIsSidebarOpen }) => {

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    // O fundo geral agora segue o token de superfície da JUCEPE e a fonte padrão
    <div className="min-h-screen bg-jucepe-surface flex font-sans">

      {/* Sidebar - Agora usando a prop vinda do App */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content - Ajustado para usar isSidebarOpen */}
      <div className={`
        flex-1 flex flex-col min-h-screen transition-all duration-300 
        /* MÁGICA AQUI: No desktop, a margem é fixa em 64, 
        independente se a sidebar mobile sumiu ou não */
        lg:ml-64
      `}>
        <Header onMenuToggle={toggleSidebar} />
        <main className="p-6 bg-jucepe-surface flex-1">
          <Outlet />
        </main>

        <MensagemModal />

        {/* Footer padronizado com as bordas leves e cores do seu sistema */}
        <footer className="bg-white border-t border-jucepe-light py-4 px-6">
          <div className="flex justify-between items-center text-xs sm:text-sm text-jucepe-dark/60">
            <span>© 2026 JUCEPE - Junta Comercial de Pernambuco. Todos os direitos reservados.</span>
            <span className="font-medium text-jucepe-dark">Versão 1.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;