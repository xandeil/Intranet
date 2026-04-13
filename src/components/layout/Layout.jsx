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
    <div className="min-h-screen bg-jucepe-surface flex">
      {/* Sidebar - Agora usando a prop vinda do App */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Main Content - Ajustado para usar isSidebarOpen */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : ''}`}>
        <Header onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
        <MensagemModal />
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 py-4 px-6">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>© 2024 JUCEPE - Junta Comercial de Pernambuco. Todos os direitos reservados.</span>
            <span>Versão 1.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;