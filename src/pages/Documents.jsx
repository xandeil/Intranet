import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  Download, 
  Eye,
  Trash2,
  File,
  FileSpreadsheet,
  FileImage,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  Calendar,
  User,
  FolderOpen
} from 'lucide-react';

const Documents = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDocs, setSelectedDocs] = useState([]);
  
  const itemsPerPage = 5;

  const tabs = [
    { id: 'todos', label: 'Todos', count: 156 },
    { id: 'publicados', label: 'Publicados', count: 134 },
    { id: 'rascunhos', label: 'Rascunhos', count: 12 },
    { id: 'arquivados', label: 'Arquivados', count: 10 }
  ];

  const mockDocuments = [
    { 
      id: 1, 
      title: 'Relatório Mensal de Atividades - Maio 2024', 
      type: 'PDF', 
      size: '2.4 MB', 
      date: '2024-05-15', 
      author: 'Maria Silva',
      department: 'Presidência',
      status: 'published',
      downloads: 45
    },
    { 
      id: 2, 
      title: 'Edital de Licitação 045/2024 - Aquisição de Equipamentos', 
      type: 'PDF', 
      size: '1.8 MB', 
      date: '2024-05-14', 
      author: 'João Santos',
      department: 'Administração',
      status: 'published',
      downloads: 123
    },
    { 
      id: 3, 
      title: 'Ata da Reunião de Diretoria - 10/05/2024', 
      type: 'DOCX', 
      size: '890 KB', 
      date: '2024-05-13', 
      author: 'Ana Costa',
      department: 'Presidência',
      status: 'draft',
      downloads: 0
    },
    { 
      id: 4, 
      title: 'Portaria 123/2024 - Designação de Servidores', 
      type: 'PDF', 
      size: '450 KB', 
      date: '2024-05-12', 
      author: 'Carlos Lima',
      department: 'RH',
      status: 'published',
      downloads: 89
    },
    { 
      id: 5, 
      title: 'Plano de Ação Anual 2024 - Metas e Objetivos', 
      type: 'XLSX', 
      size: '3.2 MB', 
      date: '2024-05-10', 
      author: 'Pedro Oliveira',
      department: 'Planejamento',
      status: 'published',
      downloads: 234
    },
    { 
      id: 6, 
      title: 'Memorando Circular 045/2024', 
      type: 'PDF', 
      size: '320 KB', 
      date: '2024-05-09', 
      author: 'Fernanda Souza',
      department: 'Comunicação',
      status: 'archived',
      downloads: 67
    },
    { 
      id: 7, 
      title: 'Relatório de Gestão Trimestral - 1º Trimestre 2024', 
      type: 'PDF', 
      size: '5.1 MB', 
      date: '2024-05-08', 
      author: 'Ricardo Mendes',
      department: 'Gestão',
      status: 'published',
      downloads: 156
    }
  ];

  const getFileIcon = (type) => {
    switch(type) {
      case 'PDF': return <FileText className="w-5 h-5 text-red-500" />;
      case 'XLSX': return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case 'DOCX': return <File className="w-5 h-5 text-blue-500" />;
      case 'JPG':
      case 'PNG': return <FileImage className="w-5 h-5 text-purple-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const styles = {
      published: 'bg-green-100 text-green-700 border-green-200',
      draft: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      archived: 'bg-gray-100 text-gray-700 border-gray-200'
    };
    
    const labels = {
      published: 'Publicado',
      draft: 'Rascunho',
      archived: 'Arquivado'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const filteredDocs = mockDocuments.filter(doc => {
    const matchesTab = activeTab === 'todos' || doc.status === activeTab;
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const totalPages = Math.ceil(filteredDocs.length / itemsPerPage);
  const paginatedDocs = filteredDocs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleSelectAll = () => {
    if (selectedDocs.length === paginatedDocs.length) {
      setSelectedDocs([]);
    } else {
      setSelectedDocs(paginatedDocs.map(d => d.id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedDocs(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
            <FolderOpen className="w-8 h-8 text-jucepe-secondary" />
            Documentos
          </h1>
          <p className="text-gray-500 mt-1">Gerencie e publique documentos institucionais da JUCEPE</p>
        </div>
        
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Importar
          </button>
          <button className="btn-primary flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Novo Documento
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: 156, icon: FileText, color: 'blue' },
          { label: 'Este Mês', value: 24, icon: Calendar, color: 'green' },
          { label: 'Downloads', value: '1.2k', icon: Download, color: 'purple' },
          { label: 'Pendências', value: 12, icon: Filter, color: 'orange' }
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-500`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por título, autor ou conteúdo..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-jucepe-secondary focus:border-transparent outline-none"
            />
          </div>
          
          <div className="flex gap-3">
            <select className="px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 focus:ring-2 focus:ring-jucepe-secondary outline-none">
              <option>Todos os departamentos</option>
              <option>Presidência</option>
              <option>RH</option>
              <option>Administração</option>
              <option>Comunicação</option>
            </select>
            
            <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-jucepe-secondary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {tab.label}
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left">
                  <input 
                    type="checkbox" 
                    checked={selectedDocs.length === paginatedDocs.length && paginatedDocs.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-jucepe-secondary focus:ring-jucepe-secondary"
                  />
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Documento</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Departamento</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Data</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Autor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <input 
                      type="checkbox" 
                      checked={selectedDocs.includes(doc.id)}
                      onChange={() => toggleSelect(doc.id)}
                      className="rounded border-gray-300 text-jucepe-secondary focus:ring-jucepe-secondary"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm group-hover:text-jucepe-secondary transition-colors">
                          {doc.title}
                        </p>
                        <p className="text-xs text-gray-500">{doc.size} • {doc.downloads} downloads</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                      {doc.department}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-jucepe-light flex items-center justify-center text-xs font-semibold text-jucepe-secondary">
                        {doc.author.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm text-gray-600">{doc.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(doc.status)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-gray-600 hover:text-blue-600 transition-colors" title="Visualizar">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded-lg text-gray-600 hover:text-green-600 transition-colors" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-800 transition-colors">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            Mostrando {(currentPage - 1) * itemsPerPage + 1} a {Math.min(currentPage * itemsPerPage, filteredDocs.length)} de {filteredDocs.length} documentos
          </p>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-jucepe-secondary text-white'
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;