import React from 'react';
import { Calendar, Clock, AlertCircle } from 'lucide-react';

const Cronogramas = () => {
  const eventos = [
    { id: 1, tarefa: "Fechamento de Folha", prazo: "25/04/2026", status: "Urgente" },
    { id: 2, tarefa: "Reunião de Diretoria", prazo: "15/04/2026", status: "Planejado" },
    { id: 3, tarefa: "Manutenção de Servidores", prazo: "12/04/2026", status: "Em andamento" },
  ];

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900 flex items-center gap-2">
          <Calendar className="w-6 h-6" /> Prezidencia - Cronogramas Internos
        </h1>
        <p className="text-gray-600">Prazos e atividades da JUCEPE</p>
      </header>

      <div className="grid gap-4 max-w-4xl">
        {eventos.map((item) => (
          <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{item.tarefa}</h3>
                <p className="text-sm text-gray-500">Prazo: {item.prazo}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              item.status === 'Urgente' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cronogramas;