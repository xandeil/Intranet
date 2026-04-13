import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, ClipboardList, Plus, Search, Calendar } from 'lucide-react';

export default function TimesheetJucepe() {
  const [timer, setTimer] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [tarefaAtual, setTarefaAtual] = useState("");

  // Histórico fake para o layout
  const historico = [
    { id: 1, tarefa: "Análise de Requisitos - Portal Jucepe", inicio: "08:00", fim: "10:30", total: "02:30h", status: "Finalizado" },
    { id: 2, tarefa: "Reunião de Alinhamento TI", inicio: "11:00", fim: "12:00", total: "01:00h", status: "Finalizado" },
  ];

  // Lógica do Cronômetro
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const formatTime = () => {
    const getSeconds = `0${(timer % 60)}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Cabeçalho */}
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-blue-900 uppercase">Registros TimeSheet</h1>
          <p className="text-gray-500 text-sm italic">JUCEPE - Controle de Fluxo Operacional</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100 flex items-center gap-2">
          <Calendar className="text-blue-600 w-4 h-4" />
          <span className="text-sm font-bold text-gray-700">{new Date().toLocaleDateString()}</span>
        </div>
      </header>

      {/* Área de Registro Ativo */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          <div className="lg:col-span-2 space-y-4">
            <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">O que você está realizando agora?</label>
            <div className="relative">
              <ClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={20} />
              <input 
                type="text" 
                placeholder="Ex: Desenvolvimento de tela de perfil..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-medium"
                value={tarefaAtual}
                onChange={(e) => setTarefaAtual(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
               <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-lg uppercase">#Sistemas_Internos</span>
               <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-lg uppercase">#Desenvolvimento</span>
            </div>
          </div>

          <div className="bg-blue-900 p-6 rounded-3xl text-center space-y-4 shadow-xl shadow-blue-900/20">
            <div className="text-4xl font-mono font-black text-white">{formatTime()}</div>
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`w-full py-3 rounded-xl font-black uppercase text-sm flex items-center justify-center gap-2 transition-all ${
                isActive 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg shadow-red-500/30' 
                : 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/30'
              }`}
            >
              {isActive ? <><Square size={18}/> Parar Tarefa</> : <><Play size={18}/> Iniciar Tarefa</>}
            </button>
          </div>

        </div>
      </div>

      {/* Histórico de Hoje */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="font-black text-gray-800 uppercase text-sm tracking-widest flex items-center gap-2">
            <Clock className="text-blue-600 w-5 h-5" /> Atividades Recentes
          </h2>
          <button className="text-blue-600 text-xs font-bold hover:underline">Ver Histórico Completo</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
              <tr>
                <th className="px-6 py-4">Tarefa / Atividade</th>
                <th className="px-6 py-4 text-center">Início</th>
                <th className="px-6 py-4 text-center">Fim</th>
                <th className="px-6 py-4 text-center">Duração</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {historico.map((h) => (
                <tr key={h.id} className="hover:bg-blue-50/50 transition-colors group">
                  <td className="px-6 py-4 font-bold text-gray-700">{h.tarefa}</td>
                  <td className="px-6 py-4 text-center text-gray-500 font-mono">{h.inicio}</td>
                  <td className="px-6 py-4 text-center text-gray-500 font-mono">{h.fim}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-black">
                      {h.total}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-300 hover:text-blue-600 transition-colors">
                      <Plus size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}