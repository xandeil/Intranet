import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Avatar from '../../components/ui/Avatar';
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
  Calendar, // ADICIONADO AQUI PARA CORRIGIR O ERRO
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
    { id: 1, title: 'Relatório Mensal de Atividades - Maio 2024', type: 'PDF', size: '2.4 MB', date: '2024-05-15', author: 'Maria Silva', department: 'Presidência', status: 'published', downloads: 45 },
    { id: 2, title: 'Edital de Licitação 045/2024 - Aquisição de Equipamentos', type: 'PDF', size: '1.8 MB', date: '2024-05-14', author: 'João Santos', department: 'Administração', status: 'published', downloads: 123 },
    { id: 3, title: 'Ata da Reunião de Diretoria - 10/05/2024', type: 'DOCX', size: '890 KB', date: '2024-05-13', author: 'Ana Costa', department: 'Presidência', status: 'draft', downloads: 0 },
    { id: 4, title: 'Portaria 123/2024 - Designação de Servidores', type: 'PDF', size: '450 KB', date: '2024-05-12', author: 'Carlos Lima', department: 'RH', status: 'published', downloads: 89 },
    { id: 5, title: 'Plano de Ação Anual 2024 - Metas e Objetivos', type: 'XLSX', size: '3.2 MB', date: '2024-05-10', author: 'Pedro Oliveira', department: 'Planejamento', status: 'published', downloads: 234 },
    { id: 6, title: 'Memorando Circular 045/2024', type: 'PDF', size: '320 KB', date: '2024-05-09', author: 'Fernanda Souza', department: 'Comunicação', status: 'archived', downloads: 67 },
    { id: 7, title: 'Relatório de Gestão Trimestral - 1º Trimestre 2024', type: 'PDF', size: '5.1 MB', date: '2024-05-08', author: 'Ricardo Mendes', department: 'Gestão', status: 'published', downloads: 156 }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'PDF': return <FileText className="w-5 h-5 text-red-500" />;
      case 'XLSX': return <FileSpreadsheet className="w-5 h-5 text-green-500" />;
      case 'DOCX': return <File className="w-5 h-5 text-blue-500" />;
      case 'JPG':
      case 'PNG': return <FileImage className="w-5 h-5 text-purple-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
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

  const columns = [
    {
      header: (
        <input
          type="checkbox"
          checked={selectedDocs.length === paginatedDocs.length && paginatedDocs.length > 0}
          onChange={toggleSelectAll}
          className="rounded border-gray-300 text-jucepe-secondary focus:ring-jucepe-secondary"
        />
      ),
      render: (doc) => (
        <input
          type="checkbox"
          checked={selectedDocs.includes(doc.id)}
          onChange={() => toggleSelect(doc.id)}
          className="rounded border-gray-300 text-jucepe-secondary focus:ring-jucepe-secondary"
        />
      )
    },
    {
      header: 'Documento',
      render: (doc) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-jucepe-surface flex items-center justify-center border border-jucepe-light shrink-0">
            {getFileIcon(doc.type)}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-jucepe-dark text-sm truncate">{doc.title}</p>
            <p className="text-xs text-jucepe-dark/50">{doc.size} • {doc.downloads} downloads</p>
          </div>
        </div>
      )
    },
    { header: 'Departamento', key: 'department' },
    { header: 'Tipo', key: 'type' },
    { header: 'Data', key: 'date' },
    {
      header: 'Autor',
      render: (doc) => (
        <div className="flex items-center gap-2">
          <Avatar size="sm" name={doc.author} />
          <span className="text-sm text-jucepe-dark/80 whitespace-nowrap">{doc.author}</span>
        </div>
      )
    },
    {
      header: 'Status',
      render: (doc) => (
        <Badge variant={doc.status === 'published' ? 'success' : doc.status === 'draft' ? 'warning' : 'default'}>
          {doc.status === 'published' ? 'Publicado' : doc.status === 'draft' ? 'Rascunho' : 'Arquivado'}
        </Badge>
      )
    },
    {
      header: 'Ações',
      render: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" icon={Eye} />
          <Button variant="ghost" size="sm" icon={Download} />
          <Button variant="ghost" size="sm" icon={MoreVertical} />
        </div>
      )
    }
  ];

  return (
    <div className="max-w-full overflow-x-hidden space-y-6 pb-10">
      {/* Header Adaptativo */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-3">
            <FolderOpen className="w-7 h-7 sm:w-8 h-8 text-jucepe-secondary" />
            Documentos
          </h1>
          <p className="text-sm text-gray-500 mt-1">Gerencie e publique documentos institucionais da JUCEPE</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
          <Button variant="outline" icon={Upload} className="w-full sm:w-auto text-xs">
            Importar
          </Button>
          <Button icon={FileText} className="w-full sm:w-auto text-xs">
            Novo
          </Button>
        </div>
      </div>

      {/* Stats Cards - Empilhados no celular */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 px-1">
        {[
          { label: 'Total', value: 156, icon: FileText, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Este Mês', value: 24, icon: Calendar, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Downloads', value: '1.2k', icon: Download, color: 'text-purple-500', bg: 'bg-purple-50' },
          { label: 'Pendências', value: 12, icon: Filter, color: 'text-orange-500', bg: 'bg-orange-50' }
        ].map((stat, idx) => (
          <Card key={idx} className="p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs lg:text-sm text-jucepe-dark/60 font-semibold truncate uppercase">{stat.label}</p>
                <p className="text-xl lg:text-2xl font-bold text-jucepe-dark mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg} shrink-0`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters Card Blindado */}
      <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4 mx-1 space-y-4">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative w-full flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-jucepe-secondary focus:border-transparent outline-none text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select className="w-full sm:w-48 px-4 py-2.5 border border-gray-200 rounded-lg text-gray-700 text-sm bg-white outline-none">
              <option>Todos os departamentos</option>
              <option>Presidência</option>
              <option>RH</option>
            </select>

            <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 text-sm">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </div>
        </div>

        {/* Tabs com Scroll Lateral */}
        {/* Tabs Adaptativas: No celular vira Grid (2 colunas), no PC vira Linha */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 mt-4 px-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setCurrentPage(1); }}
              className={`px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-between sm:justify-start gap-2 min-w-0 ${activeTab === tab.id
                  ? 'bg-jucepe-secondary text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {/* O truncate impede que o texto empurre a largura do botão */}
              <span className="truncate">{tab.label}</span>

              <span className={`px-1.5 py-0.5 rounded-full text-[10px] shrink-0 ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-200'
                }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* DOCUMENT VIEW: MOBILE CARDS vs DESKTOP TABLE */}
      <div className="mx-1">
        {/* VIEW MOBILE: CARDS */}
        <div className="block lg:hidden space-y-3">
          {paginatedDocs.map((doc) => (
            <div key={doc.id} className="bg-white p-4 rounded-jucepe border border-jucepe-light shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="p-2 bg-jucepe-surface rounded-lg shrink-0">
                    {getFileIcon(doc.type)}
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-jucepe-dark break-words line-clamp-2">{doc.title}</h4>
                    <p className="text-[10px] text-gray-400 uppercase font-bold mt-1">
                      {doc.department} • {doc.size}
                    </p>
                  </div>
                </div>
                <Badge variant={doc.status === 'published' ? 'success' : doc.status === 'draft' ? 'warning' : 'default'} className="shrink-0 scale-90">
                  {doc.status === 'published' ? 'Ativo' : doc.status === 'draft' ? 'Pendente' : 'Arquivado'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-jucepe-light">
                <Button variant="ghost" size="sm" icon={Eye} className="w-full bg-jucepe-surface text-[11px]">Ver</Button>
                <Button variant="ghost" size="sm" icon={Download} className="w-full bg-jucepe-surface text-jucepe-secondary text-[11px]">Baixar</Button>
              </div>
            </div>
          ))}
        </div>

        {/* VIEW DESKTOP: TABLE */}
        <div className="hidden lg:block bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
          <Table columns={columns} data={paginatedDocs} />
        </div>
      </div>

      {/* Pagination Adaptativa */}
      <div className="flex justify-between items-center px-2 py-4">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
          Página {currentPage} de {totalPages}
        </p>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={ChevronLeft}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          />
          <Button
            variant="ghost"
            size="sm"
            icon={ChevronRight}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          />
        </div>
      </div>
    </div>
  );
};

export default Documents;