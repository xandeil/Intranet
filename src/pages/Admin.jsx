import React, { useState } from 'react';
import { 
  Users, 
  Shield, 
  Settings, 
  Database, 
  Activity,
  ChevronRight,
  UserPlus,
  Lock,
  Eye
} from 'lucide-react';

const Admin = () => {
  const [activeSection, setActiveSection] = useState('users');

  const sections = [
    { id: 'users', label: 'Usuários', icon: Users, description: 'Gerenciar usuários e permissões' },
    { id: 'security', label: 'Segurança', icon: Shield, description: 'Configurações de segurança e logs' },
    { id: 'system', label: 'Sistema', icon: Settings, description: 'Configurações gerais do sistema' },
    { id: 'database', label: 'Banco de Dados', icon: Database, description: 'Backup e manutenção' },
    { id: 'logs', label: 'Logs', icon: Activity, description: 'Monitoramento de atividades' }
  ];

  const users = [
    { id: 1, name: 'Carlos Eduardo Silva', email: 'carlos.silva@jucepe.pe.gov.br', role: 'Administrador', status: 'active', lastAccess: 'Há 2 horas' },
    { id: 2, name: 'Maria Fernanda Costa', email: 'maria.costa@jucepe.pe.gov.br', role: 'Editor', status: 'active', lastAccess: 'Há 5 horas' },
    { id: 3, name: 'João Pedro Santos', email: 'joao.santos@jucepe.pe.gov.br', role: 'Visualizador', status: 'inactive', lastAccess: 'Há 2 dias' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Administração</h1>
        <p className="text-gray-500 mt-1">Gerencie configurações e usuários do sistema</p>
      </div>

      {/* Admin Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Menu */}
        <div className="lg:col-span-1 space-y-2">
          {sections.map((section) => {
            const IconComponent = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${
                  isActive 
                    ? 'bg-jucepe-secondary text-white shadow-lg' 
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-100'
                }`}
              >
                <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                <div className="flex-1">
                  <p className="font-semibold text-sm">{section.label}</p>
                  <p className={`text-xs ${isActive ? 'text-blue-100' : 'text-gray-500'}`}>
                    {section.description}
                  </p>
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {activeSection === 'users' && (
            <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Gerenciamento de Usuários</h2>
                <button className="btn-primary flex items-center gap-2">
                  <UserPlus className="w-4 h-4" />
                  Novo Usuário
                </button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Usuário</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Função</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Último Acesso</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-800">{user.name}</p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 text-sm ${
                            user.status === 'active' ? 'text-green-600' : 'text-gray-500'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${
                              user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                            }`} />
                            {user.status === 'active' ? 'Ativo' : 'Inativo'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{user.lastAccess}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-jucepe-secondary">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-jucepe-secondary">
                              <Lock className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeSection !== 'users' && (
            <div className="bg-white rounded-xl shadow-card border border-gray-100 p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Em Desenvolvimento</h3>
              <p className="text-gray-500">Esta seção está sendo implementada.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;