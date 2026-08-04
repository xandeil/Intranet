import React, { useState } from 'react';
import { Package, Search, PlusCircle, AlertTriangle } from 'lucide-react';

const estoque = [
  { id: 1, codigo: 'ALX-001', item: 'Papel A4 (resma)', categoria: 'Escritório', quantidade: 128, status: 'Em estoque' },
  { id: 2, codigo: 'ALX-002', item: 'Toner Impressora HC-05', categoria: 'Informática', quantidade: 3, status: 'Baixo estoque' },
  { id: 3, codigo: 'ALX-003', item: 'Caneta esferográfica (caixa)', categoria: 'Escritório', quantidade: 40, status: 'Em estoque' },
  { id: 4, codigo: 'ALX-004', item: 'Cartucho de tinta colorida', categoria: 'Informática', quantidade: 0, status: 'Esgotado' },
  { id: 5, codigo: 'ALX-005', item: 'Pasta suspensa', categoria: 'Escritório', quantidade: 76, status: 'Em estoque' },
];

const statusStyle = {
  'Em estoque': 'bg-green-100 text-green-700',
  'Baixo estoque': 'bg-yellow-100 text-yellow-700',
  'Esgotado': 'bg-red-100 text-red-700',
};

export default function Almoxarifado() {
  const [busca, setBusca] = useState('');

  const filtrado = estoque.filter((i) =>
    i.item.toLowerCase().includes(busca.toLowerCase()) || i.codigo.toLowerCase().includes(busca.toLowerCase())
  );

  const emFalta = estoque.filter((i) => i.status !== 'Em estoque').length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3 uppercase tracking-tight">
            <Package className="w-8 h-8 text-blue-600" />
            Inventário Almoxarifado
          </h1>
          <p className="text-gray-500 text-sm mt-1">Controle de materiais e suprimentos internos</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-800 transition-all shadow-sm">
          <PlusCircle className="w-4 h-4" /> Novo Item
        </button>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 uppercase font-bold">Itens cadastrados</p>
          <p className="text-2xl font-black text-gray-800 mt-1">{estoque.length}</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 uppercase font-bold">Categorias</p>
          <p className="text-2xl font-black text-gray-800 mt-1">
            {new Set(estoque.map((i) => i.categoria)).size}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-red-100 shadow-sm">
          <p className="text-xs text-red-400 uppercase font-bold flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> Requer atenção
          </p>
          <p className="text-2xl font-black text-red-600 mt-1">{emFalta}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por item ou código..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Código</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Categoria</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Quantidade</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtrado.map((i) => (
                <tr key={i.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-mono text-gray-500">{i.codigo}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{i.item}</td>
                  <td className="px-6 py-4 text-gray-600">{i.categoria}</td>
                  <td className="px-6 py-4 text-gray-600">{i.quantidade}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle[i.status]}`}>
                      {i.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtrado.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-400">Nenhum item encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
