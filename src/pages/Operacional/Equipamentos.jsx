import React, { useState } from 'react';
import { Monitor, Search, PlusCircle } from 'lucide-react';

const saidas = [
  { id: 1, equipamento: 'Notebook Dell Latitude', responsavel: 'Carlos Eduardo Silva', setor: 'Presidência', saida: '01/04/2026', previsao: '05/04/2026', status: 'Em uso' },
  { id: 2, equipamento: 'Projetor Epson', responsavel: 'Maria Fernanda Costa', setor: 'Comunicação', saida: '28/03/2026', previsao: '29/03/2026', status: 'Atrasado' },
  { id: 3, equipamento: 'Notebook Lenovo ThinkPad', responsavel: 'João Pedro Santos', setor: 'TI', saida: '20/03/2026', previsao: '22/03/2026', status: 'Devolvido' },
  { id: 4, equipamento: 'Câmera Fotográfica Canon', responsavel: 'Ana Souza', setor: 'Comunicação', saida: '02/04/2026', previsao: '03/04/2026', status: 'Em uso' },
];

const statusStyle = {
  'Em uso': 'bg-blue-100 text-blue-700',
  'Devolvido': 'bg-green-100 text-green-700',
  'Atrasado': 'bg-red-100 text-red-700',
};

export default function Equipamentos() {
  const [busca, setBusca] = useState('');

  const filtrado = saidas.filter((s) =>
    s.equipamento.toLowerCase().includes(busca.toLowerCase()) ||
    s.responsavel.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3 uppercase tracking-tight">
            <Monitor className="w-8 h-8 text-blue-600" />
            Saída de Equipamentos
          </h1>
          <p className="text-gray-500 text-sm mt-1">Controle de retirada e devolução de equipamentos do patrimônio</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-all shadow-sm">
          <PlusCircle className="w-4 h-4" /> Registrar Saída
        </button>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por equipamento ou responsável..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Equipamento</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Responsável</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Setor</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Saída</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Previsão</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtrado.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{s.equipamento}</td>
                  <td className="px-6 py-4 text-gray-600">{s.responsavel}</td>
                  <td className="px-6 py-4 text-gray-600">{s.setor}</td>
                  <td className="px-6 py-4 text-gray-600">{s.saida}</td>
                  <td className="px-6 py-4 text-gray-600">{s.previsao}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[s.status]}`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtrado.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-400">Nenhum registro encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
