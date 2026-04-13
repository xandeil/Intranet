import React from 'react';
import {
  User, Mail, Building, Shield, MapPin,
  Phone, Calendar, Briefcase, Award, Edit3
} from 'lucide-react';
import { userData } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function Profile() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header / Banner do Perfil */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-40 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 relative">
            {/* Botão de Editar Capa (Opcional) */}
            <button className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all backdrop-blur-md">
              <Edit3 size={18} />
            </button>
          </div>

          <div className="px-8 pb-8">
            <div className="relative flex flex-col md:flex-row md:items-end gap-6 -mt-16 mb-6">
              <div className="relative inline-block">
                <img
                  src={userData.avatar}
                  className="w-40 h-40 rounded-3xl border-8 border-white shadow-xl object-cover bg-white"
                  alt="Avatar"
                />
                <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-sm" title="Online"></div>
              </div>

              <div className="flex-1 mb-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-black text-blue-900">{userData.name}</h1>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {userData.role || 'Servidor Público'}
                  </span>
                </div>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <Building size={16} /> {userData.area} — JUCEPE Sede Recife
                </p>
              </div>

              <div className="flex gap-3 mb-2">
                <button className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2">
                  <Link to="/perfil/editar" className="bg-blue-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20 flex items-center gap-2">
                    <Edit3 size={18} /> Editar Perfil
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Coluna Esquerda: Informações Pessoais */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Briefcase size={20} className="text-blue-600" /> Detalhes do Cargo
              </h2>

              <div className="space-y-4">
                <InfoItem label="Matrícula" value="2026.0412-1" />
                <InfoItem label="Data de Admissão" value="15 de Março de 2021" />
                <InfoItem label="Vínculo" value="Efetivo / Estatutário" />
                <InfoItem label="Superior Imediato" value="Diretoria de TI" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Phone size={20} className="text-blue-600" /> Contato Direto
              </h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">E-mail Institucional</p>
                    <p className="text-sm text-gray-700 font-semibold">{userData.email || 'servidor@jucepe.pe.gov.br'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase">Ramal / Telefone</p>
                    <p className="text-sm text-gray-700 font-semibold">(81) 3182-XXXX</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Dashboard Pessoal */}
          <div className="lg:col-span-2 space-y-6">

            {/* Grid de Stats Rápidos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 text-center">
                <p className="text-blue-900 font-black text-2xl">142</p>
                <p className="text-blue-600 text-xs font-bold uppercase tracking-widest mt-1">Tarefas Feitas</p>
              </div>
              <div className="bg-green-50 p-6 rounded-3xl border border-green-100 text-center">
                <p className="text-green-900 font-black text-2xl">100%</p>
                <p className="text-green-600 text-xs font-bold uppercase tracking-widest mt-1">Presença</p>
              </div>
              <div className="bg-purple-50 p-6 rounded-3xl border border-purple-100 text-center">
                <p className="text-purple-900 font-black text-2xl">08</p>
                <p className="text-purple-600 text-xs font-bold uppercase tracking-widest mt-1">Treinamentos</p>
              </div>
            </div>

            {/* Seção de Conquistas / Selos */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Award size={22} className="text-blue-600" /> Reconhecimento Institucional
              </h2>

              <div className="flex flex-wrap gap-6">
                <Badge icon={Shield} label="Acesso Master" color="text-blue-600 bg-blue-50" />
                <Badge icon={Award} label="Destaque 2025" color="text-yellow-600 bg-yellow-50" />
                <Badge icon={Calendar} label="5 Anos Casa" color="text-green-600 bg-green-50" />
              </div>
            </div>

            {/* Informações de Sistema / Segurança */}
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <Shield size={22} className="text-blue-600" /> Segurança e Acessos
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Último Login</p>
                  <p className="text-sm text-gray-700 font-bold uppercase italic">
                    {new Date().toLocaleDateString()} às {new Date().toLocaleTimeString()}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl">
                  <p className="text-xs text-gray-400 font-bold uppercase mb-1">Nível de Permissão</p>
                  <p className="text-sm text-gray-700 font-bold uppercase tracking-wider">
                    Administrador de Sistemas
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

// Componentes Auxiliares
function InfoItem({ label, value }) {
  return (
    <div className="border-b border-gray-50 pb-3 last:border-0 last:pb-0">
      <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-sm text-gray-700 font-bold">{value}</p>
    </div>
  );
}

function Badge({ icon: Icon, label, color }) {
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm ${color}`}>
      <Icon size={16} /> {label}
    </div>
  );
}