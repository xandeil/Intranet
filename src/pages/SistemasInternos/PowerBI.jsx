import React from 'react';
import { BarChart3, Filter, ExternalLink, RefreshCw, LayoutDashboard } from 'lucide-react';

export default function PowerBI() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Cabeçalho da Página */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
            <LayoutDashboard className="w-8 h-8 text-blue-600" />
            Business Intelligence (Power BI)
          </h1>
          <p className="text-gray-500 text-sm">Relatórios Estratégicos e Análise de Dados JUCEPE</p>
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
            <RefreshCw className="w-4 h-4" /> Atualizar Dados
          </button>
          <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-all">
            <ExternalLink className="w-4 h-4" /> Abrir no App
          </button>
        </div>
      </header>

      {/* Barra de Filtros Rápida */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-gray-500 mr-4">
          <Filter className="w-4 h-4" />
          <span className="text-sm font-semibold uppercase tracking-wider">Filtros:</span>
        </div>
        <select className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500">
          <option>Ano Referência: 2026</option>
          <option>2025</option>
        </select>
        <select className="bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500">
          <option>Todas as Diretorias</option>
          <option>Presidência</option>
          <option>Financeiro</option>
          <option>TI</option>
        </select>
      </div>

      {/* Área do Relatório (Iframe) */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden relative min-h-[600px] flex flex-col">
        {/* Simulação de Barra de Carregamento/Top do Power BI */}
        <div className="bg-gray-100 p-2 border-b border-gray-200 flex justify-between items-center">
          <span className="text-xs font-bold text-gray-400 ml-2">Microsoft Power BI - Relatório de Gestão Semanal</span>
          <div className="flex gap-2 mr-2">
             <div className="w-3 h-3 rounded-full bg-gray-300"></div>
             <div className="w-3 h-3 rounded-full bg-gray-300"></div>
          </div>
        </div>

        {/* Onde o Power BI realmente ficaria */}
        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 relative group">
          {/* Placeholder visual para o chefe entender */}
          <div className="text-center p-10">
            <div className="bg-blue-100 p-6 rounded-full inline-block mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-16 h-16 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Aguardando Conexão com o Servidor</h2>
            <p className="text-gray-500 max-w-md">
              O ambiente de BI está configurado. Para exibir os dados reais, insira o <b>URL de Incorporação (Embed)</b> nas configurações do módulo.
            </p>
          </div>
          
          {/* Marca d'água de segurança (comum em Intranets governamentais) */}
          <div className="absolute bottom-4 right-4 opacity-20 pointer-events-none select-none">
            <p className="text-xs font-bold text-blue-900 uppercase tracking-widest text-right">
              Documento Interno<br/>Uso Restrito JUCEPE
            </p>
          </div>
        </div>
      </div>

      {/* Notas de Rodapé */}
      <footer className="text-center py-4 text-gray-400 text-xs">
        Dados atualizados pela última vez em: {new Date().toLocaleDateString()} às 08:00
      </footer>
    </div>
  );
}