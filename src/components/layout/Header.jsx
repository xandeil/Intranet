import React, { useState } from 'react';
import {
  Search,
  Bell,
  Mail,
  ChevronDown,
  Menu,
  LogOut,
  User,
  Settings
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { userData } from '../../data/mockData.js';
import { Link } from 'react-router-dom';

const Header = ({ onMenuToggle, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-jucepe-primary text-white h-16 flex items-center justify-between px-6 sticky top-0 z-40 shadow-md">
      {/* Left Section */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onMenuToggle}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="hidden md:block text-sm text-blue-200 font-medium border-l border-blue-400 pl-3">
            Intranet Gov
          </div>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        {/* Notifications (Caixa de Notificações) */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <Bell className="w-5 h-5 text-white" />
            {userData.notifications > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-xs rounded-full flex items-center justify-center font-bold text-white">
                {userData.notifications}
              </span>
            )}
          </button>

          {/* Caixinha estilo Facebook */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden text-gray-800">
              <div className="p-4 border-b border-gray-100 font-bold">
                Notificações
              </div>
              <div className="max-h-64 overflow-y-auto">
                <div className="p-4 hover:bg-gray-50 border-b border-gray-50 cursor-pointer">
                  <p className="text-sm"><b>RH</b> postou um novo comunicado sobre o ponto.</p>
                  <p className="text-xs text-gray-400 mt-1">Há 10 minutos</p>
                </div>
                {/* Adicione mais itens aqui ou faça um map */}
              </div>
              <div className="p-2 text-center bg-gray-50">
                <button className="text-xs text-blue-600 font-bold hover:underline">Ver tudo</button>
              </div>
            </div>
          )}
        </div>

        {/* Messages (Link Direto para o Webmail) */}
        <a
          href="https://webmail-seguro.com.br/pscs.com.br/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative p-2 hover:bg-white/10 rounded-lg transition-colors flex items-center"
          title="Acessar Webmail"
        >
          <Mail className="w-5 h-5 text-white" />
          {userData.messages > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-xs rounded-full flex items-center justify-center font-bold text-white">
              {userData.messages}
            </span>
          )}
        </a>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-3 hover:bg-white/10 rounded-lg p-2 transition-colors"
          >
            <img
              src={user?.avatar || userData.avatar}
              alt="User"
              className="w-8 h-8 rounded-full border-2 border-blue-300 object-cover"
            />
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-white">{user?.name || userData.name}</div>
              <div className="text-xs text-blue-200">Área: {user?.area || userData.area}</div>
            </div>
            <ChevronDown className={`w-4 h-4 text-white transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="text-sm font-semibold text-gray-800">{user?.name || userData.name}</div>
                <div className="text-xs text-gray-500">{user?.area || userData.area}</div>
              </div>

              {/* LINK PARA PERFIL */}
              <Link
                to="/perfil"
                onClick={() => setShowUserMenu(false)} // Fecha o menu ao clicar
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <User className="w-4 h-4" />
                Meu Perfil
              </Link>

              {/* LINK PARA CONFIGURAÇÕES */}
              <Link
                to="/configuracoes"
                onClick={() => setShowUserMenu(false)} // Fecha o menu ao clicar
                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Configurações
              </Link>

              <div className="border-t border-gray-100 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;