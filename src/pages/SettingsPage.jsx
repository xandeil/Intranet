import React from 'react';
import { Bell, Lock, Eye } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Configurações</h1>
      <div className="space-y-4">
        {[
          { icon: Bell, title: 'Notificações', desc: 'Gerenciar alertas e avisos do sistema' },
          { icon: Lock, title: 'Segurança', desc: 'Alterar senha e autenticação' },
          { icon: Eye, title: 'Privacidade', desc: 'Controlar visibilidade do perfil' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><item.icon size={20}/></div>
              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}