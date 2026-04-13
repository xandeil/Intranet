import React, { useState } from 'react';
import { 
  Bell, Lock, Eye, Monitor, Globe, 
  Smartphone, ShieldCheck, Mail, ChevronRight 
} from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifEmail: true,
    notifPush: false,
    darkMode: false,
    perfilPublico: true
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Cabeçalho */}
        <header>
          <h1 className="text-3xl font-black text-blue-900 uppercase tracking-tight">Configurações</h1>
          <p className="text-gray-500 text-sm">Personalize sua experiência na Intranet JUCEPE</p>
        </header>

        {/* Seção: Preferências do Sistema */}
        <section className="space-y-4">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Monitor size={14} /> Interface e Sistema
          </h2>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

            <SettingItem 
              icon={Globe} 
              title="Idioma do Sistema" 
              desc="Português (Brasil)" 
              action="Alterar"
            />
          </div>
        </section>

        {/* Seção: Notificações */}
        <section className="space-y-4">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Bell size={14} /> Comunicações e Alertas
          </h2>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <SettingToggle 
              icon={Mail} 
              title="Notificações por E-mail" 
              desc="Receba resumos de processos e avisos da presidência" 
              active={settings.notifEmail}
              onToggle={() => toggleSetting('notifEmail')}
            />
            <SettingToggle 
              icon={Smartphone} 
              title="Alertas Push" 
              desc="Notificações em tempo real no navegador" 
              active={settings.notifPush}
              onToggle={() => toggleSetting('notifPush')}
            />
          </div>
        </section>

        {/* Seção: Segurança e Conta */}
        <section className="space-y-4">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
            <Lock size={14} /> Segurança e Privacidade
          </h2>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <SettingItem 
              icon={ShieldCheck} 
              title="Senha de Acesso" 
              desc="Última alteração há 3 meses" 
              action="Atualizar"
            />
            <SettingToggle 
              icon={UserCircle} // Se o ícone falhar, use 'User'
              title="Visibilidade no Guia de Ramais" 
              desc="Permitir que outros servidores vejam meu contato" 
              active={settings.perfilPublico}
              onToggle={() => toggleSetting('perfilPublico')}
            />
            <div className="p-5 flex items-center justify-between hover:bg-red-50 transition-colors cursor-pointer group">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-red-100 text-red-600 rounded-2xl group-hover:scale-110 transition-transform">
                   <Lock size={20}/>
                 </div>
                 <div>
                   <h3 className="font-bold text-red-900 text-sm md:text-base">Encerrar todas as sessões</h3>
                   <p className="text-xs text-red-400 font-medium italic">Desconectar sua conta de outros dispositivos</p>
                 </div>
               </div>
               <ChevronRight className="text-red-200" size={20} />
            </div>
          </div>
        </section>

        <footer className="text-center pt-8">
          <p className="text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">
            Versão do Sistema: 2.4.0-release.2026
          </p>
        </footer>
      </div>
    </div>
  );
}

// Sub-componente para itens com Toggle (Chave liga/desliga)
function SettingToggle({ icon: Icon, title, desc, active, onToggle }) {
  return (
    <div className="p-5 flex items-center justify-between border-b border-gray-50 last:border-0">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
          <Icon size={20}/>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm md:text-base">{title}</h3>
          <p className="text-xs text-gray-400 font-medium">{desc}</p>
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-blue-600' : 'bg-gray-200'}`}
      >
        <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${active ? 'left-7' : 'left-1'}`} />
      </button>
    </div>
  );
}

// Sub-componente para itens com Ação de Clique
function SettingItem({ icon: Icon, title, desc, action }) {
  return (
    <div className="p-5 flex items-center justify-between border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
          <Icon size={20}/>
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-sm md:text-base">{title}</h3>
          <p className="text-xs text-gray-400 font-medium">{desc}</p>
        </div>
      </div>
      <span className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">{action}</span>
    </div>
  );
}

// Ícone reserva caso o UserCircle não esteja no seu Lucide
const UserCircle = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);