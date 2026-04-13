import React, { useState } from 'react';
import { 
  FileText, Download, Filter, Search, FileBarChart, 
  Clock, CheckCircle2, AlertCircle, FileSpreadsheet, FilePieChart 
} from 'lucide-react';

export default function Relatorios() {
  const [busca, setBusca] = useState("");

  const listaRelatorios = [
    { 
      id: 1, 
      nome: "Relatório de Acessos Mensais", 
      descricao: "Análise completa de tráfego e interações dos servidores no portal.",
      data: "10/04/2026", 
      tipo: "PDF",
      categoria: "Gestão",
      status: "Disponível"
    },
    { 
      id: 2, 
      nome: "Produtividade Setorial - Q1", 
      descricao: "Métricas de desempenho e conclusão de tarefas por departamento.",
      data: "09/04/2026", 
      tipo: "XLSX",
      categoria: "RH",
      status: "Processando"
    },
    { 
      id: 3, 
      nome: "Balanço Anual JUCEPE 2025", 
      descricao: "Dados financeiros e operacionais consolidados do último ano.",
      data: "01/03/2026", 
      tipo: "PDF",
      categoria: "Presidência",
      status: "Disponível"
    },
    { 
      id: 4, 
      nome: "Auditoria de Sistemas Internos", 
      descricao: "Log de segurança e integridade das ferramentas digitais.",
      data: "12/04/2026", 
      tipo: "DOCX",
      categoria: "TI",
      status: "Aguardando"
    }
  ];

  const relatoriosFiltrados = listaRelatorios.filter(r => 
    r.nome.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header Profissional */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3 uppercase tracking-tight">
            <FileBarChart className="w-8 h-8 text-blue-600" />
            Central de Relatórios
          </h1>
          <p className="text-gray-500 text-sm font-medium">Exportação de dados e inteligência institucional</p>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Pesquisar relatório..."
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all w-64"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </header>

      {/* Grid de Relatórios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {relatoriosFiltrados.map((rel) => (
          <div key={rel.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col group hover:shadow-lg transition-all">
            
            {/* Header do Card (Azul como o Chefe pediu) */}
            <div className="bg-blue-900 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-lg text-white">
                  {rel.tipo === 'PDF' ? <FilePieChart size={18} /> : <FileSpreadsheet size={18} />}
                </div>
                <h3 className="font-bold text-white text-sm uppercase tracking-wide truncate max-w-[250px]">
                  {rel.nome}
                </h3>
              </div>
              <span className="text-[10px] font-black bg-blue-800 text-blue-200 px-2 py-1 rounded">
                {rel.tipo}
              </span>
            </div>

            {/* Corpo */}
            <div className="p-5 space-y-4">
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {rel.descricao}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold text-gray-400 uppercase">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-blue-500" />
                  Gerado em: <span className="text-gray-700">{rel.data}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText size={14} className="text-blue-500" />
                  Setor: <span className="text-gray-700">{rel.categoria}</span>
                </div>
              </div>

              {/* Ações e Status */}
              <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StatusBadge status={rel.status} />
                </div>
                
                <button 
                  disabled={rel.status !== 'Disponível'}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                    rel.status === 'Disponível' 
                    ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-md shadow-blue-900/20' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <Download size={14} /> Baixar Arquivo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Banner de Ajuda */}
      <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-3xl p-8 text-center">
        <h3 className="text-blue-900 font-black uppercase text-lg mb-2">Precisa de um relatório personalizado?</h3>
        <p className="text-blue-600 text-sm mb-6 max-w-md mx-auto italic">
          Caso não encontre os dados necessários, abra um chamado para a equipe de BI.
        </p>
        <button className="bg-white border-2 border-blue-600 text-blue-600 px-8 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all">
          Solicitar Novo Relatório
        </button>
      </div>
    </div>
  );
}

// Mini componente para o Status
function StatusBadge({ status }) {
  const config = {
    'Disponível': { color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle2 },
    'Processando': { color: 'text-orange-600', bg: 'bg-orange-50', icon: Clock },
    'Aguardando': { color: 'text-gray-500', bg: 'bg-gray-100', icon: AlertCircle },
  };
  const { color, bg, icon: Icon } = config[status] || config['Aguardando'];

  return (
    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${bg} ${color} text-[10px] font-black uppercase`}>
      <Icon size={12} className={status === 'Processando' ? 'animate-spin' : ''} />
      {status}
    </div>
  );
}