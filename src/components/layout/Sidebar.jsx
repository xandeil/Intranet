import React, { useState, useEffect } from 'react'; // Adicione useEffect aqui
import { NavLink, useLocation, Link } from 'react-router-dom';
import {
  Home,
  FileText,
  BookOpen,
  Mail,
  Settings,
  User,
  Gift,
  Calendar,
  Layers,
  BarChart3,
  Activity,
  FileBarChart,
  Clock,
  Timer,
  ChevronDown,
  ChevronUp,
  Headphones,
  X
} from 'lucide-react';
import { navigationSections } from '../../data/mockData.js';

const iconMap = {
  Home, FileText, BookOpen, Mail, Settings, User, Gift, Calendar,
  Layers, BarChart3, Activity, FileBarChart, Clock, Timer
};

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  // Fecha a sidebar automaticamente ao mudar de página no mobile
  useEffect(() => {
    // Só fechamos se estiver no mobile (janela pequena)
    if (window.innerWidth < 1024) {
      setIsOpen(false);
    }
  }, [location, setIsOpen]);
  
  const [expandedSections, setExpandedSections] = useState({
    'NAVEGAÇÃO': true,
    'RH & COMUNICAÇÃO': true,
    'SISTEMAS INTERNOS': true,
    'RELATÓRIOS': true
  });

  const toggleSection = (title) => {
    setExpandedSections(prev => ({
      ...prev,
      [title]: !prev[title]
    }));
  };

  if (!isOpen) return null;

  return (
    <aside
      className={`
        fixed left-0 top-0 h-full w-64 bg-jucepe-dark text-white z-50 shadow-xl flex flex-col 
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0
      `}
    >
      {/* Botão para fechar (Apenas Mobile) */}
      <button
        onClick={() => setIsOpen(false)}
        className="lg:hidden absolute right-4 top-4 text-gray-400 hover:text-white p-2 transition-colors"
      >
        <X size={24} />
      </button>

      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 bg-jucepe-primary border-b border-blue-800 flex-shrink-0">
        <Link
          to="/"
          className="text-xl font-bold tracking-wider text-white hover:opacity-80 transition-opacity cursor-pointer"
        >
          JUCEPE
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navigationSections.map((section) => (
          <div key={section.title} className="mb-4">
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-white transition-colors"
            >
              <span>{section.title}</span>
              {expandedSections[section.title] ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {/* Section Items */}
            {expandedSections[section.title] && (
              <div className="mt-1 space-y-1">
                {section.items.map((item) => {
                  const IconComponent = iconMap[item.icon] || FileText;
                  const isActive = location.pathname === item.path ||
                    (item.path !== '/' && location.pathname.startsWith(item.path));

                  return (
                    <NavLink
                      key={item.id}
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                        ${isActive
                          ? 'bg-jucepe-primary text-white shadow-md'
                          : 'text-gray-300 hover:bg-jucepe-primary/50 hover:text-white'
                        }
                      `}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Support Section - Fixed at bottom */}
      <div className="p-4 border-t border-blue-800 bg-jucepe-dark flex-shrink-0">
        <div className="px-4 mb-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          SUPORTE
        </div>
        <div className="px-4 mb-4">
          <p className="text-xs text-gray-400 mb-3">
            Dúvidas? Entre em contato com o TI
          </p>
          <button className="w-full flex items-center gap-2 px-4 py-3 bg-jucepe-secondary hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors shadow-md">
            <Headphones className="w-4 h-4" />
            Abrir chamado
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;