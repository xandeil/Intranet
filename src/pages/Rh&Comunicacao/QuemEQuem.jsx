import React, { useState } from 'react';
import { Search, Phone, Mail, Users, UserX } from 'lucide-react';

const colaboradores = [
  { id: 1, nome: 'Carlos Eduardo Silva', cargo: 'Presidente', setor: 'Presidência', ramal: '3182-1000', email: 'carlos.silva@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=11' },
  { id: 2, nome: 'Camila Ferreira', cargo: 'Secretária Executiva', setor: 'Presidência', ramal: '3182-1007', email: 'camila.ferreira@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 3, nome: 'Roberto Almeida', cargo: 'Assessor da Presidência', setor: 'Presidência', ramal: '3182-1006', email: 'roberto.almeida@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=10' },
  { id: 4, nome: 'Maria Fernanda Costa', cargo: 'Analista de TI', setor: 'TI', ramal: '3182-5678', email: 'maria.costa@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=5' },
  { id: 5, nome: 'João Pedro Santos', cargo: 'Assistente Administrativo', setor: 'Administração', ramal: '3182-2003', email: 'joao.santos@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 6, nome: 'Beatriz Andrade', cargo: 'Assistente Administrativa', setor: 'Administração', ramal: '3182-2008', email: 'beatriz.andrade@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=3' },
  { id: 7, nome: 'Juliana Martins', cargo: 'Analista de RH', setor: 'RH', ramal: '3182-9012', email: 'juliana.martins@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=9' },
  { id: 8, nome: 'Rafael Oliveira', cargo: 'Analista de RH', setor: 'RH', ramal: '3182-9013', email: 'rafael.oliveira@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 9, nome: 'Ana Paula Souza', cargo: 'Analista Jurídico', setor: 'Jurídico', ramal: '3182-3004', email: 'ana.souza@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=7' },
  { id: 10, nome: 'Pedro Henrique Lima', cargo: 'Coordenador de Operações', setor: 'Operações', ramal: '3182-4005', email: 'pedro.lima@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=8' },
  { id: 11, nome: 'Lucas Barbosa', cargo: 'Analista de Comunicação', setor: 'Comunicação', ramal: '3182-6009', email: 'lucas.barbosa@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=4' },
  { id: 12, nome: 'Ricardo Mendes', cargo: 'Analista de Gestão', setor: 'Gestão', ramal: '3182-7010', email: 'ricardo.mendes@jucepe.pe.gov.br', avatar: 'https://i.pravatar.cc/150?img=13' },
];

export default function QuemEQuem() {
  const [busca, setBusca] = useState('');

  const termo = busca.trim().toLowerCase();
  const filtrados = colaboradores.filter((c) =>
    c.nome.toLowerCase().includes(termo) ||
    c.setor.toLowerCase().includes(termo) ||
    c.email.toLowerCase().includes(termo)
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      <header>
        <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3 uppercase tracking-tight">
          <Users className="w-8 h-8 text-blue-600" />
          Quem é Quem
        </h1>
        <p className="text-gray-500 text-sm mt-1">Encontre rapidamente um colega de trabalho por nome, setor ou e-mail</p>
      </header>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome, setor ou e-mail..."
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-jucepe-secondary"
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {filtrados.length} de {colaboradores.length} colaboradores
        </p>
      </div>

      {filtrados.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserX className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">Nenhum colaborador encontrado</h3>
          <p className="text-gray-500 text-sm">Tente buscar por outro nome, setor ou e-mail.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtrados.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
            >
              <img
                src={c.avatar}
                alt={c.nome}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm mb-3"
              />
              <h3 className="font-bold text-gray-800 leading-tight">{c.nome}</h3>
              <p className="text-xs text-jucepe-secondary font-bold uppercase tracking-wide mt-1">{c.cargo}</p>
              <p className="text-xs text-gray-400 mt-0.5">{c.setor}</p>

              <div className="w-full mt-4 pt-4 border-t border-gray-100 space-y-2 text-left">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  Ramal {c.ramal}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600 min-w-0">
                  <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate">{c.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
