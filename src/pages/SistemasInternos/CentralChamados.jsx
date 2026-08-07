import React, { useState } from 'react';
import { Headphones, Send, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const categorias = ['Hardware', 'Software', 'Rede / Internet', 'Acesso e Permissões', 'Outros'];

const prioridades = [
  { id: 'baixa', label: 'Baixa', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  { id: 'media', label: 'Média', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'alta', label: 'Alta', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { id: 'urgente', label: 'Urgente', color: 'bg-red-100 text-red-700 border-red-200' },
];

const chamadosRecentes = [
  { id: 'CH-1042', assunto: 'Impressora do 2º andar sem tonner', categoria: 'Hardware', prioridade: 'media', status: 'Em atendimento', data: '04/08/2026' },
  { id: 'CH-1038', assunto: 'Acesso ao sistema SEI bloqueado', categoria: 'Acesso e Permissões', prioridade: 'alta', status: 'Resolvido', data: '02/08/2026' },
  { id: 'CH-1029', assunto: 'Lentidão na rede da Presidência', categoria: 'Rede / Internet', prioridade: 'media', status: 'Resolvido', data: '29/07/2026' },
];

const statusStyle = {
  'Aberto': 'bg-blue-100 text-blue-700',
  'Em atendimento': 'bg-yellow-100 text-yellow-700',
  'Resolvido': 'bg-green-100 text-green-700',
};

export default function CentralChamados() {
  const [formData, setFormData] = useState({
    categoria: categorias[0],
    prioridade: 'media',
    assunto: '',
    descricao: '',
  });
  const [protocolo, setProtocolo] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sem back-end ainda: simula a abertura do chamado gerando um protocolo local.
    const novoProtocolo = `CH-${Math.floor(1000 + Math.random() * 9000)}`;
    setProtocolo(novoProtocolo);
  };

  const novoChamado = () => {
    setProtocolo(null);
    setFormData({ categoria: categorias[0], prioridade: 'media', assunto: '', descricao: '' });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <header>
        <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3 uppercase tracking-tight">
          <Headphones className="w-8 h-8 text-blue-600" />
          Central de Chamados
        </h1>
        <p className="text-gray-500 text-sm mt-1">Abra um chamado para o suporte técnico de TI da JUCEPE</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário / Confirmação */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
          {protocolo ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-lg font-bold text-gray-800 mb-1">Chamado aberto com sucesso!</h2>
              <p className="text-gray-500 text-sm mb-4">
                Protocolo <span className="font-mono font-bold text-blue-900">{protocolo}</span> — a equipe de TI vai retornar em breve.
              </p>
              <button
                onClick={novoChamado}
                className="text-sm font-bold text-jucepe-secondary hover:text-jucepe-primary transition-colors"
              >
                Abrir outro chamado
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-jucepe-secondary"
                  >
                    {categorias.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioridade</label>
                  <div className="flex flex-wrap gap-2">
                    {prioridades.map((p) => (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setFormData({ ...formData, prioridade: p.id })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                          formData.prioridade === p.id ? p.color : 'bg-white text-gray-500 border-gray-200'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
                <input
                  type="text"
                  required
                  value={formData.assunto}
                  onChange={(e) => setFormData({ ...formData, assunto: e.target.value })}
                  placeholder="Ex: Computador não liga"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-jucepe-secondary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                <textarea
                  required
                  rows={5}
                  value={formData.descricao}
                  onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                  placeholder="Descreva o problema com o máximo de detalhes possível..."
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-jucepe-secondary resize-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-900 text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-blue-800 transition-all shadow-sm"
              >
                <Send className="w-4 h-4" /> Abrir Chamado
              </button>
            </form>
          )}
        </div>

        {/* Chamados recentes */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" /> Meus Chamados Recentes
          </h2>

          <div className="space-y-3">
            {chamadosRecentes.map((c) => (
              <div key={c.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-xs text-gray-400">{c.id}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${statusStyle[c.status]}`}>
                    {c.status}
                  </span>
                </div>
                <p className="text-sm font-medium text-gray-800 leading-tight">{c.assunto}</p>
                <p className="text-xs text-gray-400 mt-1">{c.categoria} • {c.data}</p>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 leading-relaxed">
              Chamados urgentes também podem ser abertos por telefone com o CSATI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
