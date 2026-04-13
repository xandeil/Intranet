import React, { useState } from 'react';
import { 
  ExternalLink, Search, Star, Clock, Shield, Globe, Server, 
  Database, FileCheck, BarChart3, Activity, Mail, Phone, 
  Building2, Leaf, AlertTriangle, LayoutGrid
} from 'lucide-react';

// 1. Movi para fora para o SistemaCard conseguir enxergar e aumentei as cores/fontes
const getStatusConfig = (status) => {
  const configs = {
    online: { color: 'text-green-700', bg: 'bg-green-100', dot: 'bg-green-500', label: 'Operacional' },
    warning: { color: 'text-yellow-700', bg: 'bg-yellow-100', dot: 'bg-yellow-500', label: 'Instável' },
    maintenance: { color: 'text-orange-700', bg: 'bg-orange-100', dot: 'bg-orange-500', label: 'Manutenção' },
    offline: { color: 'text-red-700', bg: 'bg-red-100', dot: 'bg-red-500', label: 'Indisponível' }
  };
  return configs[status] || configs.online;
};

// 2. Componente de Card (Aumentei o Status aqui)
const SistemaCard = ({ sistema, isFavorite, onToggleFavorite }) => {
  const Icon = sistema.icon;
  const status = getStatusConfig(sistema.status);

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col min-h-[220px] group ${sistema.status === 'maintenance' ? 'opacity-85' : ''}`}>
      
      {/* Cabeçalho Azul */}
      <div className="bg-blue-900 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg text-white group-hover:bg-white/20 transition-colors">
            <Icon size={20} />
          </div>
          <h3 className="font-bold text-white text-sm md:text-base tracking-tight uppercase">
            {sistema.name}
          </h3>
        </div>
        
        <button 
          onClick={(e) => { e.preventDefault(); onToggleFavorite(); }}
          className={`p-1.5 rounded-lg transition-colors ${isFavorite ? 'text-yellow-400' : 'text-white/40 hover:text-white'}`}
        >
          <Star size={18} className={isFavorite ? 'fill-yellow-400' : ''} />
        </button>
      </div>

      {/* Corpo Branco */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          <div className="flex items-center gap-2 mb-3">
            {/* STATUS AUMENTADO AQUI (text-11px e animação no ponto) */}
            <div className={`${status.bg} ${status.color} text-[11px] font-black uppercase px-3 py-1 rounded-lg flex items-center gap-2 border border-black/5 shadow-sm`}>
              <div className={`w-2 h-2 rounded-full ${status.dot} animate-pulse`} />
              {status.label}
            </div>
            
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
              {sistema.category}
            </span>
          </div>
          
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 italic">
            {sistema.description}
          </p>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400">
            <Clock size={12} />
            {sistema.users} usuários
          </div>
          
          <a 
            href={sistema.url}
            className="flex items-center gap-1.5 text-blue-700 text-xs font-black hover:text-blue-900 transition-all group-hover:gap-3"
          >
            ACESSAR SISTEMA <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Faixa de Manutenção */}
      {sistema.status === 'maintenance' && (
        <div className="bg-orange-500 text-white text-[10px] font-bold text-center py-1 uppercase tracking-tighter">
          Sistema em Manutenção
        </div>
      )}
    </div>
  );
};

const SistemasInternos = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(['sei', 'regin']);

  const sistemas = [
    { id: 'regin', name: 'REGIN', description: 'Sistema de Registro de Imóveis e Negócios para integração mercantil.', category: 'Registro', icon: Building2, url: '#', status: 'online', users: '1.2k' },
    { id: 'sei', name: 'SEI', description: 'Sistema Eletrônico de Informações - Gestão de processos administrativos.', category: 'Processos', icon: FileCheck, url: '#', status: 'online', users: '856' },
    { id: 'iged', name: 'iGED', description: 'Gestão Eletrônica de Documentos e arquivamento digital.', category: 'Documentos', icon: Database, url: '#', status: 'online', users: '643' },
    { id: 'zabbix', name: 'Zabbix', description: 'Painel de monitoramento de ativos e infraestrutura de rede.', category: 'TI', icon: Activity, url: '#', status: 'warning', users: '45' },
    { id: 'powerbi', name: 'Power BI', description: 'Dashboards de Business Intelligence e análise de dados.', category: 'Dados', icon: BarChart3, url: '#', status: 'online', users: '234' },
    { id: 'seloverde', name: 'SELOVERDE', description: 'Licenciamento e controle ambiental de empresas.', category: 'Meio Ambiente', icon: Leaf, url: '#', status: 'online', users: '89' },
    { id: 'expresso', name: 'EXPRESSO', description: 'Servidor de correio eletrônico e comunicação interna.', category: 'Comunicação', icon: Mail, url: '#', status: 'online', users: '2.1k' },
    { id: 'sip', name: 'SIP', description: 'Sistema de Informações Pessoais e gestão de RH.', category: 'RH', icon: Phone, url: '#', status: 'maintenance', users: '0' },
    { id: 'csati', name: 'CSATI', description: 'Abertura de chamados e suporte técnico de TI.', category: 'Suporte', icon: Server, url: '#', status: 'online', users: '12' }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredSistemas = sistemas.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoritedSistemas = sistemas.filter(s => favorites.includes(s.id));
  const regularSistemas = filteredSistemas.filter(s => !favorites.includes(s.id));

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3 uppercase tracking-tight">
            <Globe className="w-8 h-8 text-blue-600" />
            Sistemas Internos
          </h1>
          <p className="text-gray-500 text-sm font-medium">Ecossistema de ferramentas digitais JUCEPE</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisar sistema..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </header>

      {/* Grid de Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Sistemas Online', value: sistemas.filter(s => s.status === 'online').length, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Instáveis', value: sistemas.filter(s => s.status === 'warning').length, color: 'text-yellow-600', bg: 'bg-yellow-50' },
          { label: 'Manutenção', value: sistemas.filter(s => s.status === 'maintenance').length, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Meus Atalhos', value: favorites.length, color: 'text-blue-600', bg: 'bg-blue-50' }
        ].map((stat, idx) => (
          <div key={idx} className={`${stat.bg} p-4 rounded-2xl border border-gray-100 flex flex-col`}>
            <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Favoritos */}
      {favoritedSistemas.length > 0 && !searchQuery && (
        <section className="space-y-4">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> Atalhos Rápidos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritedSistemas.map(s => (
              <SistemaCard key={s.id} sistema={s} isFavorite={true} onToggleFavorite={() => toggleFavorite(s.id)} />
            ))}
          </div>
        </section>
      )}

      {/* Galeria */}
      <section className="space-y-4">
        <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-blue-600" /> Galeria de Aplicações
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {regularSistemas.map(s => (
            <SistemaCard key={s.id} sistema={s} isFavorite={false} onToggleFavorite={() => toggleFavorite(s.id)} />
          ))}
        </div>
      </section>

      {/* Banner */}
      <div className="bg-blue-900 rounded-3xl p-6 text-white flex items-center gap-6 relative overflow-hidden">
        <div className="relative z-10">
          <h4 className="font-bold flex items-center gap-2 mb-1">
            <AlertTriangle className="w-5 h-5 text-blue-300" /> 
            Aviso de Manutenção
          </h4>
          <p className="text-blue-100 text-sm italic">
            O sistema SIP (RH) passará por atualização crítica em 15/05. Programe seus envios.
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] opacity-10">
          <Server size={120} />
        </div>
      </div>
    </div>
  );
};

export default SistemasInternos;