import React from 'react';
import { User, Mail, Building, Shield } from 'lucide-react';
import { userData } from '../../data/mockData';

export default function Profile() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Meu Perfil</h1>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="h-32 bg-jucepe-primary"></div>
        <div className="px-8 pb-8">
          <div className="relative -mt-12 mb-6">
            <img src={userData.avatar} className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover" alt="Avatar" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Nome Completo</label>
              <p className="text-gray-700 font-medium flex items-center gap-2"><User size={16}/> {userData.name}</p>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400 uppercase">Setor / Área</label>
              <p className="text-gray-700 font-medium flex items-center gap-2"><Building size={16}/> {userData.area}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}