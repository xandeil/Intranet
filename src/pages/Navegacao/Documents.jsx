import React, { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Table from '../../components/ui/Table';
import Avatar from '../../components/ui/Avatar';
import {
  FileText, Upload, Search, Filter, Download, Eye,
  MoreVertical, Calendar, FolderOpen, ChevronLeft, ChevronRight
} from 'lucide-react';

const Documents = () => {
  const [activeTab, setActiveTab] = useState('todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const tabs = [
    { id: 'todos', label: 'Todos', count: 156 },
    { id: 'publicados', label: 'Pub.', count: 134 },
    { id: 'rascunhos', label: 'Rasc.', count: 12 }
  ];

  const mockDocuments = [
    { id: 1, title: 'Relatório Mensal de Atividades - Maio 2024', type: 'PDF', size: '2.4 MB', department: 'Presidência', status: 'published' },
    { id: 2, title: 'Edital de Licitação 045/2024', type: 'PDF', size: '1.8 MB', department: 'Adm.', status: 'published' },
    { id: 3, title: 'Ata da Reunião de Diretoria', type: 'DOCX', size: '890 KB', department: 'Pres.', status: 'draft' }
  ];

  const columns = [
    { 
      header: 'Documento', 
      render: (doc) => (
        <div className="flex items-center gap-2 max-w-[180px] sm:max-w-none">
          <div className="shrink-0">
             <FileText className="w-5 h-5 text-red-500" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-xs sm:text-sm text-jucepe-dark truncate">{doc.title}</p>
            <p className="text-[10px] text-jucepe-dark/50 truncate uppercase">{doc.department}</p>
          </div>
        </div>
      )
    },
    { 
      header: 'Status', 
      render: (doc) => <Badge variant={doc.status === 'published' ? 'success' : 'warning'}>{doc.status === 'published' ? 'OK' : '...'}</Badge> 
    },
    {
      header: 'Ações',
      render: () => (
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" icon={Download} />
        </div>
      )
    }
  ];

  return (
    /* overflow-x-hidden no container principal evita o scroll lateral */
    <div className="max-w-full overflow-x-hidden space-y-4 px-1">
      
      {/* Header - Empilhado no mobile para não esticar */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-6 h-6 text-jucepe-secondary shrink-0" />
          <h1 className="text-lg font-black text-jucepe-dark truncate">Documentos</h1>
        </div>
        
        <div className="flex gap-2 w-full">
          <Button variant="primary" icon={Upload} size="sm" className="flex-1 text-xs">Upload</Button>
          <Button variant="outline" icon={Filter} size="sm" className="flex-1 text-xs">Filtrar</Button>
        </div>
      </div>

      {/* Stats - Compactos */}
      <div className="grid grid-cols-2 gap-2">
        <Card className="p-3">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Total Docs</p>
          <p className="text-lg font-black text-jucepe-primary">156</p>
        </Card>
        <Card className="p-3">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Downloads</p>
          <p className="text-lg font-black text-purple-600">1.2k</p>
        </Card>
      </div>

      {/* Busca - Ocupando a largura correta */}
      <div className="w-full relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Pesquisar..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-jucepe-light rounded-lg bg-white outline-none"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Tabs com scroll lateral controlado */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-md text-[11px] font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id ? 'bg-jucepe-dark text-white' : 'bg-white text-gray-400 border border-gray-100'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Tabela - Aqui é onde o scroll lateral deve ficar "preso" */}
      <div className="w-full border border-jucepe-light rounded-lg overflow-hidden bg-white">
        <Table columns={columns} data={mockDocuments} />
      </div>

      {/* Paginação Simplificada */}
      <div className="flex justify-between items-center px-1">
        <span className="text-[10px] font-bold text-gray-400 uppercase">Pág. {currentPage}</span>
        <div className="flex gap-2">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="p-1.5 bg-white border border-gray-100 rounded-md"><ChevronLeft size={16}/></button>
          <button onClick={() => setCurrentPage(p => p + 1)} className="p-1.5 bg-white border border-gray-100 rounded-md"><ChevronRight size={16}/></button>
        </div>
      </div>
    </div>
  );
};

export default Documents;