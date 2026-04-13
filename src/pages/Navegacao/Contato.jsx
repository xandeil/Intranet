import React, { useState } from 'react';
import { Phone, Mail, MapPin, Search, Globe, Building2, User, Building } from 'lucide-react';

const contatosSetores = [
  {
    id: 1,
    setor: "Presidência e Gabinete",
    responsavel: "Secretaria Executiva",
    ramal: "3182-1234",
    email: "gab.presidencia@jucepe.pe.gov.br",
    local: "Sede Recife - 3º Andar"
  },
  {
    id: 2,
    setor: "TI / Suporte Técnico",
    responsavel: "Central de Chamados",
    ramal: "3182-5678",
    email: "suporte@jucepe.pe.gov.br",
    local: "Sede Recife - Térreo"
  },
  {
    id: 3,
    setor: "Recursos Humanos (RH)",
    responsavel: "Coordenação de Pessoal",
    ramal: "3182-9012",
    email: "rh@jucepe.pe.gov.br",
    local: "Sede Recife - 1º Andar"
  },
  {
    id: 4,
    setor: "Jurídico / Procuradoria",
    responsavel: "Procuradoria Geral",
    ramal: "3182-3456",
    email: "juridico@jucepe.pe.gov.br",
    local: "Sede Recife - 2º Andar"
  }
];

export default function Contato() {
  const [busca, setBusca] = useState("");

  const contatosFiltrados = contatosSetores.filter(item => 
    item.setor.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3">
          <Phone className="w-8 h-8 text-blue-600" />
          Guia de Contatos e Ramais
        </h1>
        <p className="text-gray-500 text-sm mt-1">Lista telefônica e endereços oficiais da JUCEPE</p>
      </header>

      {/* Barra de Busca */}
      <div className="relative mb-8 max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input 
          type="text" 
          placeholder="Buscar setor ou ramal..." 
          className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 shadow-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Lista de Ramais */}
        <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          {contatosFiltrados.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all border-l-4 border-l-blue-600">
              <h3 className="font-bold text-gray-800 text-lg mb-1">{c.setor}</h3>
              <p className="text-blue-600 text-xs font-bold uppercase mb-4 flex items-center gap-1">
                <User className="w-3 h-3" /> {c.responsavel}
              </p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="font-mono font-bold">{c.ramal}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="truncate">{c.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span>{c.local}</span>
                </div>
              </div>
            </div>
          ))}
          {contatosFiltrados.length === 0 && (
            <p className="text-gray-400 italic">Nenhum setor encontrado para "{busca}"</p>
          )}
        </div>

        {/* Sidebar: Unidades Regionais */}
        <div className="space-y-6">
          <div className="bg-blue-900 p-6 rounded-3xl text-white shadow-lg shadow-blue-900/20">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Building className="w-6 h-6 text-blue-400" />
              Sede Recife (Principal)
            </h3>
            <div className="space-y-4 text-blue-100 text-sm">
              <p className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                Rua Imperial, 1600 - São José, Recife - PE, 50090-000
              </p>
              <p className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                www.jucepe.pe.gov.br
              </p>
            </div>
            <button className="w-full mt-6 bg-blue-800 hover:bg-blue-700 py-3 rounded-xl font-bold transition-all text-xs uppercase tracking-widest">
              Ver no Google Maps
            </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-4">Escritórios Regionais</h3>
            <div className="space-y-3">
              {['Caruaru', 'Petrolina', 'Garanhuns', 'Serra Talhada'].map((cidade) => (
                <div key={cidade} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer group">
                  <span className="text-gray-600 font-medium group-hover:text-blue-700 transition-colors">{cidade}</span>
                  <Phone className="w-4 h-4 text-gray-300 group-hover:text-blue-500" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}