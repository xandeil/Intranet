import React from 'react';
import { Calendar, Clock, CheckCircle2, AlertTriangle, ArrowRight, ListTodo, Filter } from 'lucide-react';

const Cronogramas = () => {
  const projetos = [
    { 
      id: 1, 
      tarefa: "Fechamento de Folha de Pagamento", 
      prazo: "25/04/2026", 
      setor: "Recursos Humanos",
      progresso: 85,
      prioridade: "Crítica",
      responsavel: "RH Central"
    },
    { 
      id: 2, 
      tarefa: "Reunião Geral de Diretoria (Mensal)", 
      prazo: "15/04/2026", 
      setor: "Presidência",
      progresso: 40,
      prioridade: "Alta",
      responsavel: "Secretaria Executiva"
    },
    { 
      id: 3, 
      tarefa: "Manutenção Preventiva - Servidores", 
      prazo: "12/04/2026", 
      setor: "TI / Infraestrutura",
      progresso: 10,
      prioridade: "Média",
      responsavel: "Equipe de Redes"
    },
    { 
      id: 4, 
      tarefa: "Atualização Cadastral - Selo Verde", 
      prazo: "30/05/2026", 
      setor: "Sustentabilidade",
      progresso: 60,
      prioridade: "Normal",
      responsavel: "Comissão Técnica"
    },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header com Ações */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3">
            <ListTodo className="w-8 h-8 text-blue-600" />
            Cronogramas e Prazos Institucionais
          </h1>
          <p className="text-gray-500 text-sm mt-1">Gestão de atividades e fluxos de trabalho da JUCEPE</p>
        </div>
        
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" /> Filtrar Setor
          </button>
          <button className="bg-blue-900 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">
            + Nova Tarefa
          </button>
        </div>
      </header>

      {/* Grid de Cards de Cronograma */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {projetos.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group overflow-hidden">
            {/* Barra lateral de prioridade */}
            <div className={`h-1.5 w-full ${
              item.prioridade === 'Crítica' ? 'bg-red-500' : 
              item.prioridade === 'Alta' ? 'bg-orange-500' : 'bg-blue-500'
            }`} />

            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-gray-100 text-gray-500 rounded">
                  {item.setor}
                </span>
                <div className="flex items-center gap-1 text-gray-400">
                   <Clock className="w-3.5 h-3.5" />
                   <span className="text-xs font-bold">{item.prazo}</span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-900 transition-colors">
                {item.tarefa}
              </h3>
              
              <p className="text-sm text-gray-500 mb-6 flex items-center gap-1">
                Responsável: <span className="font-semibold text-gray-700">{item.responsavel}</span>
              </p>

              {/* Seção de Progresso */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-bold text-gray-400 uppercase">Status do Fluxo</span>
                  <span className="font-black text-blue-900">{item.progresso}%</span>
                </div>
                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${item.progresso}%` }}
                  />
                </div>
              </div>

              {/* Footer do Card */}
              <div className="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {item.progresso > 80 ? (
                    <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  )}
                  <span className={`text-xs font-bold ${
                    item.prioridade === 'Crítica' ? 'text-red-500' : 'text-gray-400'
                  }`}>
                    {item.prioridade}
                  </span>
                </div>
                
                <button className="text-blue-600 hover:text-blue-800 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Resumo de Metas (Widget Inferior) */}
      <div className="mt-10 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-around gap-8">
        <div className="text-center">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Tarefas Ativas</p>
          <p className="text-3xl font-black text-blue-900">24</p>
        </div>
        <div className="h-12 w-px bg-gray-100 hidden md:block" />
        <div className="text-center">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Prazos Próximos</p>
          <p className="text-3xl font-black text-orange-500">07</p>
        </div>
        <div className="h-12 w-px bg-gray-100 hidden md:block" />
        <div className="text-center">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Concluídas (Mês)</p>
          <p className="text-3xl font-black text-green-600">142</p>
        </div>
      </div>
    </div>
  );
};

export default Cronogramas;