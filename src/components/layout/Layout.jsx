import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import MensagemModal from './MensagemModal.jsx';

const Layout = ({ isSidebarOpen, setIsSidebarOpen }) => {

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    /* Adicionado overflow-x-hidden para garantir que nada escape da largura da viewport */
    <div className="min-h-screen bg-jucepe-surface flex font-sans overflow-x-hidden w-full relative">
      
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Ajuste importante: Adicionado min-w-0 para evitar que o flex-item empurre o pai. 
          Também garantimos w-full.
      */}
      <div className={`flex-1 flex flex-col min-w-0 w-full transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        
        <Header onMenuToggle={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        
        {/* MUDANÇA CHAVE: O padding agora é responsivo (p-3 no mobile, p-6 no desktop).
            Isso libera espaço para os cards não estourarem no celular.
        */}
        <main className="flex-1 p-3 sm:p-6 overflow-x-hidden">
          <Outlet />
        </main>

        <MensagemModal />

        {/* Footer ajustado para não quebrar em telas pequenas com flex-col */}
        <footer className="bg-white border-t border-jucepe-light py-4 px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-[10px] sm:text-sm text-jucepe-dark/60 text-center sm:text-left">
            <span>© 2026 JUCEPE - Junta Comercial de Pernambuco.</span>
            <span className="font-medium text-jucepe-dark shrink-0">Versão 1.0.0</span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;