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

const Header = ({ onMenuToggle, isSidebarOpen }) => {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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
          <div className="font-bold text-2xl tracking-tight text-white">JUCEPE</div>
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
        <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-white" />
          {userData.notifications > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-xs rounded-full flex items-center justify-center font-bold text-white">
              {userData.notifications}
            </span>
          )}
        </button>

        {/* Messages */}
        <button className="relative p-2 hover:bg-white/10 rounded-lg transition-colors">
          <Mail className="w-5 h-5 text-white" />
          {userData.messages > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-xs rounded-full flex items-center justify-center font-bold text-white">
              {userData.messages}
            </span>
          )}
        </button>

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
                <div className="text-sm font-semibold text-gray-800">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.username}</div>
              </div>
              
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <User className="w-4 h-4" />
                Meu Perfil
              </button>
              
              <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <Settings className="w-4 h-4" />
                Configurações
              </button>
              
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