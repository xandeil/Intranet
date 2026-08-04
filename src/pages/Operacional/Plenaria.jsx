import React from 'react';
import { Shield, PlusCircle, Users, Calendar, Gavel } from 'lucide-react';

const sessoes = [
  {
    id: 1,
    numero: '012/2026',
    data: '08/04/2026',
    pauta: 'Deliberação sobre recadastramento de leiloeiros e homologação de atas societárias.',
    status: 'Agendada',
    quorum: '7/9',
  },
  {
    id: 2,
    numero: '011/2026',
    data: '01/04/2026',
    pauta: 'Julgamento de recursos administrativos referentes a registros empresariais.',
    status: 'Encerrada',
    quorum: '9/9',
  },
  {
    id: 3,
    numero: '010/2026',
    data: '25/03/2026',
    pauta: 'Aprovação de novos procedimentos para o Selo Empresa Verde.',
    status: 'Encerrada',
    quorum: '8/9',
  },
];

const statusStyle = {
  'Agendada': 'bg-blue-100 text-blue-700',
  'Em andamento': 'bg-yellow-100 text-yellow-700',
  'Encerrada': 'bg-green-100 text-green-700',
};

export default function Plenaria() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3 uppercase tracking-tight">
            <Shield className="w-8 h-8 text-blue-600" />
            Controle da Plenária
          </h1>
          <p className="text-gray-500 text-sm mt-1">Sessões deliberativas do colegiado da JUCEPE</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-all shadow-sm">
          <PlusCircle className="w-4 h-4" /> Nova Sessão
        </button>
      </header>

      <div className="space-y-4">
        {sessoes.map((s) => (
          <div key={s.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3 md:w-40 shrink-0">
              <Gavel className="w-5 h-5 text-blue-600" />
              <span className="font-black text-blue-900">Sessão {s.numero}</span>
            </div>

            <p className="text-sm text-gray-600 flex-1">{s.pauta}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500 shrink-0">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" /> {s.data}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" /> Quórum {s.quorum}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[s.status]}`}>
                {s.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
