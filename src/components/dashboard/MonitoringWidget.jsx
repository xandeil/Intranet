import React from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import {
  Activity, Server, Database, Shield,
  Globe, Cpu, HardDrive, RefreshCcw
} from 'lucide-react';
import { monitoringData, chartData } from '../../data/mockData.js';

const Monitoramento = () => {
  // Cores padronizadas com o projeto
  const COLORS = {
    primary: "#1e3a8a", // blue-900 (JUCEPE)
    secondary: "#2563eb", // blue-600
    success: "#22c55e", // green-500
    warning: "#eab308", // yellow-500
    danger: "#ef4444",  // red-500
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Header Padronizado */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-blue-900 flex items-center gap-3 uppercase tracking-tight">
            <Activity className="w-8 h-8 text-blue-600" />
            Centro de Monitoramento (Zabbix)
          </h1>
          <p className="text-gray-500 text-sm font-medium italic">Dados de infraestrutura em tempo real</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-blue-700 font-bold hover:bg-blue-50 transition-all shadow-sm">
          <RefreshCcw className="w-4 h-4" /> Atualizar Agora
        </button>
      </header>

      {/* Grid de Métricas Rápidas (Sincronizado com Widget) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard icon={Cpu} label="Uso de CPU" value="24%" color="text-blue-600" bg="bg-blue-50" />
        <MetricCard icon={HardDrive} label="Disco Livre" value="1.2 TB" color="text-green-600" bg="bg-green-50" />
        <MetricCard icon={Globe} label={monitoringData.users.label} value={monitoringData.users.value} color="text-purple-600" bg="bg-purple-50" />
        <MetricCard icon={Database} label="Status DB" value="Online" color="text-emerald-600" bg="bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Gráfico de Tráfego Principal (Estilo Widget) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Onde estava <div className="bg-blue-900 ...">, troque por: */}

          <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <Activity size={20} />
              </div>
              <h3 className="font-bold text-gray-800 text-sm md:text-base tracking-tight uppercase">
                Histórico de Acessos e Sessões
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">
                Tempo Real
              </span>
            </div>
          </div>
          <div className="p-6 h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.1} />
                    <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke={COLORS.secondary}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
                <Area
                  type="monotone"
                  dataKey="sessions"
                  stroke={COLORS.success}
                  strokeWidth={3}
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status de Servidores (Lado Direito) */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 uppercase text-xs tracking-widest text-gray-400">
              <Server size={16} /> Status dos Ativos
            </h3>
            <div className="space-y-4">
              <StatusIndicator label="Web Server 01" status="online" />
              <StatusIndicator label="API Gateway" status="online" />
              <StatusIndicator label="Database Cluster" status="warning" />
              <StatusIndicator label="Firewall FortiGate" status="online" />
              <StatusIndicator label="Backup Cloud" status="offline" />
            </div>
          </div>

          {/* Card Informativo de Segurança */}
          <div className="bg-blue-900 p-6 rounded-3xl text-white shadow-lg relative overflow-hidden">
            <Shield className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
            <div className="relative z-10">
              <h4 className="font-bold mb-2">Integridade do Sistema</h4>
              <p className="text-blue-100 text-xs leading-relaxed italic">
                Nenhuma vulnerabilidade crítica detectada nas últimas 24 horas. Certificados SSL atualizados.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Componentes Auxiliares para manter a limpeza do código
const MetricCard = ({ icon: Icon, label, value, color, bg }) => (
  <div className={`bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md`}>
    <div className={`p-4 ${bg} ${color} rounded-2xl`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">{label}</p>
      <p className="text-xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const StatusIndicator = ({ label, status }) => {
  const configs = {
    online: { bg: 'bg-green-100', text: 'text-green-700', dot: 'bg-green-500' },
    warning: { bg: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-yellow-500' },
    offline: { bg: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
  };
  const config = configs[status];

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl border border-gray-100/50">
      <span className="text-sm font-bold text-gray-700">{label}</span>
      <div className={`${config.bg} ${config.text} text-[10px] font-black uppercase px-2 py-1 rounded-lg flex items-center gap-2`}>
        <div className={`w-1.5 h-1.5 rounded-full ${config.dot} ${status === 'online' ? 'animate-pulse' : ''}`} />
        {status}
      </div>
    </div>
  );
};

export default Monitoramento;