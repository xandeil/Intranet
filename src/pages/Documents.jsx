import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Search, 
  Filter, 
  MoreVertical, 
  Download, 
  Eye,
  Trash2,
  Folder
} from 'lucide-react';

const Documents = () => {
  const [activeTab, setActiveTab] = useState('todos');
  
  const tabs = [
    { id: 'todos', label: 'Todos', count: 156 },
    { id: 'publicados', label: 'Publicados', count: 134 },
    { id: 'rascunhos', label: 'Rascunhos', count: 12 },
    { id: 'arquivados', label: 'Arquivados', count: 10 }
  ];

  const mockDocuments = [
    { id: 1, title: 'Relatório Mensal - Maio 2024', type: 'PDF', size: '2.4 MB', date: '2024-05-15', author: 'Maria Silva', status: 'published' },
    { id: 2, title: 'Edital de Licitação 045/2024', type: 'DOCX', size: '1.8 MB', date: '2024-05-14', author: 'João Santos', status: 'published' },
    { id: 3, title: 'Ata da Reunião de Diretoria', type: 'PDF', size: '890 KB', date: '2024-05-13', author: 'Ana Costa', status: 'draft' },
    { id: 4, title: 'Portaria 123/2024', type: 'PDF', size: '450 KB', date: '2024-05-12', author: 'Carlos Lima', status: 'published' },
    { id: 5, title: 'Plano de Ação 2024', type: 'XLSX', size: '3.2 MB', date: '2024-05-10', author: 'Pedro Oliveira', status: 'archived' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Documentos</h1>
          <p className="text-gray-500 mt-1">Gerencie e publique documentos institucionais</p>
        </div>
        
        <button className="btn-primary flex items-center gap-2 self-start">
          <Upload className="w-4 h-4" />
          Novo Documento
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-card border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-jucepe-secondary focus:border-transparent outline-none"
            />
          </div>
          
          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700">
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-jucepe-secondary text-white'
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

      {/* Documents List */}
      <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Documento</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tipo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Tamanho</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Data</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Autor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockDocuments.map((doc) => (
                <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium text-gray-800">{doc.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.type}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.date}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{doc.author}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doc.status === 'published' ? 'bg-green-100 text-green-700' :
                      doc.status === 'draft' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {doc.status === 'published' ? 'Publicado' :
                       doc.status === 'draft' ? 'Rascunho' : 'Arquivado'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-jucepe-secondary transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-jucepe-secondary transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-red-600 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Documents;