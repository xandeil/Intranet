import React, { useState } from 'react';
import { 
  ExternalLink, 
  Search, 
  Star,
  Clock,
  Shield,
  Globe,
  Server,
  Database,
  FileCheck,
  BarChart3,
  Activity,
  Mail,
  Phone,
  Building2,
  Leaf,
  AlertTriangle
} from 'lucide-react';

const getStatusBadge = (status) => {
  const configs = {
    online: { color: 'bg-green-500', label: 'Online' },
    warning: { color: 'bg-yellow-500', label: 'Instável' },
    maintenance: { color: 'bg-orange-500', label: 'Manutenção' },
    offline: { color: 'bg-red-500', label: 'Offline' }
  };
  return configs[status] || configs.online; // Adicionei o "|| online" por segurança
};

const SistemasLinks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState(['sei', 'regin']);

  const sistemas = [
    {
      id: 'regin',
      name: 'REGIN',
      description: 'Registro de Imóveis e Negócios',
      category: 'Registro',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      url: '#',
      status: 'online',
      users: '1.2k'
    },
    {
      id: 'sei',
      name: 'SEI',
      description: 'Sistema Eletrônico de Informações',
      category: 'Processos',
      icon: FileCheck,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      url: '#',
      status: 'online',
      users: '856'
    },
    {
      id: 'iged',
      name: 'iGED',
      description: 'Gestão Eletrônica de Documentos',
      category: 'Documentos',
      icon: Database,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      url: '#',
      status: 'online',
      users: '643'
    },
    {
      id: 'zabbix',
      name: 'Zabbix',
      description: 'Monitoramento de Infraestrutura',
      category: 'TI',
      icon: Activity,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      url: '#',
      status: 'warning',
      users: '45'
    },
    {
      id: 'powerbi',
      name: 'Power BI',
      description: 'Business Intelligence e Relatórios',
      category: 'Dados',
      icon: BarChart3,
      color: 'from-yellow-500 to-yellow-600',
      bgColor: 'bg-yellow-50',
      url: '#',
      status: 'online',
      users: '234'
    },
    {
      id: 'seloverde',
      name: 'SELOVERDE',
      description: 'Sistema de Licenciamento Ambiental',
      category: 'Meio Ambiente',
      icon: Leaf,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      url: '#',
      status: 'online',
      users: '89'
    },
    {
      id: 'expresso',
      name: 'EXPRESSO',
      description: 'Correio Eletrônico Institucional',
      category: 'Comunicação',
      icon: Mail,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      url: '#',
      status: 'online',
      users: '2.1k'
    },
    {
      id: 'sip',
      name: 'SIP',
      description: 'Sistema de Informações Pessoais',
      category: 'RH',
      icon: Phone,
      color: 'from-cyan-500 to-cyan-600',
      bgColor: 'bg-cyan-50',
      url: '#',
      status: 'maintenance',
      users: '0'
    },
    {
      id: 'csati',
      name: 'CSATI',
      description: 'Central de Atendimento TI',
      category: 'Suporte',
      icon: Server,
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      url: '#',
      status: 'online',
      users: '12'
    }
  ];

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

//   const getStatusBadge = (status) => {
//     const configs = {
//       online: { color: 'bg-green-500', label: 'Online' },
//       warning: { color: 'bg-yellow-500', label: 'Instável' },
//       maintenance: { color: 'bg-orange-500', label: 'Manutenção' },
//       offline: { color: 'bg-red-500', label: 'Offline' }
//     };
//     return configs[status];
//   };

  const filteredSistemas = sistemas.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoritedSistemas = sistemas.filter(s => favorites.includes(s.id));
  const regularSistemas = filteredSistemas.filter(s => !favorites.includes(s.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <Globe className="w-8 h-8 text-jucepe-secondary" />
            Sistemas Internos
          </h1>
          <p className="text-gray-500 mt-1">Acesse os sistemas e ferramentas da JUCEPE</p>
        </div>
        
        <div className="relative max-w-md w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar sistemas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-jucepe-secondary focus:border-transparent outline-none shadow-sm"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Sistemas Online', value: sistemas.filter(s => s.status === 'online').length, color: 'green' },
          { label: 'Em Manutenção', value: sistemas.filter(s => s.status === 'maintenance').length, color: 'orange' },
          { label: 'Instáveis', value: sistemas.filter(s => s.status === 'warning').length, color: 'yellow' },
          { label: 'Favoritos', value: favorites.length, color: 'blue' }
        ].map((stat, idx) => (
          <div key={idx} className={`bg-${stat.color}-50 border border-${stat.color}-100 rounded-xl p-4`}>
            <p className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</p>
            <p className={`text-sm text-${stat.color}-700`}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Favorites Section */}
      {favoritedSistemas.length > 0 && !searchQuery && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            Favoritos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favoritedSistemas.map(sistema => (
       <SistemaCard 
        key={sistema.id} 
        sistema={sistema} 
        isFavorite={favorites.includes(sistema.id)}
        onToggleFavorite={() => toggleFavorite(sistema.id)}
        statusConfig={getStatusBadge(sistema.status)} // Passando o resultado aqui
       />
            ))}
          </div>
        </div>
      )}

      {/* All Systems */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Todos os Sistemas
        </h2>
        
        {regularSistemas.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600">Nenhum sistema encontrado</h3>
            <p className="text-gray-500">Tente ajustar sua busca</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularSistemas.map(sistema => (
              <SistemaCard 
                key={sistema.id} 
                sistema={sistema} 
                isFavorite={favorites.includes(sistema.id)}
                onToggleFavorite={() => toggleFavorite(sistema.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-yellow-800">Manutenção Programada</h4>
          <p className="text-sm text-yellow-700 mt-1">
            O sistema SIP estará em manutenção no dia 15/05 das 22h às 06h. 
            O SEI pode apresentar lentidão durante o período.
          </p>
        </div>
      </div>
    </div>
  );
};

// Sistema Card Component
const SistemaCard = ({ sistema, isFavorite, onToggleFavorite }) => {
  const IconComponent = sistema.icon;
  const status = getStatusBadge(sistema.status);

  return (
    <div className={`group bg-white rounded-xl border border-gray-200 hover:border-jucepe-secondary/50 hover:shadow-lg transition-all duration-300 overflow-hidden ${sistema.status === 'maintenance' ? 'opacity-75' : ''}`}>
      {/* Header with gradient */}
      <div className={`h-24 bg-gradient-to-r ${sistema.color} p-4 relative`}>
        <div className="absolute top-3 right-3 flex gap-2">
          <button 
            onClick={(e) => { e.preventDefault(); onToggleFavorite(); }}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
          >
            <Star className={`w-4 h-4 ${isFavorite ? 'text-yellow-300 fill-yellow-300' : 'text-white'}`} />
          </button>
          <a 
            href={sistema.url}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-white" />
          </a>
        </div>
        
        <div className={`w-14 h-14 ${sistema.bgColor} rounded-xl flex items-center justify-center shadow-lg`}>
          <IconComponent className="w-7 h-7 text-gray-700" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-gray-800 text-lg">{sistema.name}</h3>
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${status.color} bg-opacity-10`}>
            <div className={`w-2 h-2 rounded-full ${status.color}`} />
            <span className="text-xs font-medium text-gray-600">{status.label}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{sistema.description}</p>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2 py-1 rounded">
            {sistema.category}
          </span>
          
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            {sistema.users} usuários
          </div>
        </div>

        {sistema.status === 'maintenance' && (
          <div className="mt-3 p-2 bg-orange-50 rounded-lg flex items-center gap-2">
            <Shield className="w-4 h-4 text-orange-500" />
            <span className="text-xs text-orange-600">Em manutenção</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SistemasLinks;