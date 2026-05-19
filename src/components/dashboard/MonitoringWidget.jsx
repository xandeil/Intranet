import React from 'react';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Activity, Server, Database, Shield,
  Globe, Cpu, HardDrive, RefreshCcw
} from 'lucide-react';

// IMPORTAÇÃO DO SEU DESIGN SYSTEM
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { monitoringData, chartData } from '../../data/mockData.js';

const Monitoramento = () => {
  // Cores sincronizadas com seu tailwind.config.js
  const COLORS = {
    primary: "#1e4a7e",   // jucepe-primary
    secondary: "#2563eb", // jucepe-secondary
    success: "#22c55e",   // jucepe-success
    warning: "#f59e0b",   // jucepe-warning
    danger: "#ef4444",    // jucepe-danger
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header com os botões do Design System */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-jucepe-dark flex items-center gap-3">
            <Activity className="w-7 h-7 text-jucepe-secondary" />
            Centro de Monitoramento
          </h1>
          <p className="text-sm text-jucepe-dark/50 mt-1 italic">Status da infraestrutura em tempo real (Zabbix)</p>
        </div>
        <Button variant="outline" icon={RefreshCcw} className="w-full md:w-auto">
          Atualizar Agora
        </Button>
      </header>

      {/* Grid de Métricas usando o seu componente Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
        <MetricCard icon={Cpu} label="Uso de CPU" value="24%" color="text-blue-600" bg="bg-blue-50" />
        <MetricCard icon={HardDrive} label="Disco Livre" value="1.2 TB" color="text-green-600" bg="bg-green-50" />
        <MetricCard icon={Globe} label="Usuários Ativos" value={monitoringData.users.value} color="text-purple-600" bg="bg-purple-50" />
        <MetricCard icon={Database} label="Status DB" value="Online" color="text-emerald-600" bg="bg-emerald-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-1">
        
        {/* Gráfico Principal usando o seu Card */}
        <div className="lg:col-span-2">
          <Card title="Histórico de Acessos e Sessões" icon={Activity}>
            <div className="h-[350px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.secondary} stopOpacity={0.1} />
                      <stop offset="95%" stopColor={COLORS.secondary} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ 
                      borderRadius: '16px', 
                      border: 'none', 
                      boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                      fontSize: '12px'
                    }}
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
          </Card>
        </div>

        {/* Lado Direito: Status e Segurança */}
        <div className="space-y-6">
          <Card title="Status dos Ativos" icon={Server}>
            <div className="space-y-3 mt-2">
              <StatusItem label="Web Server 01" status="success" />
              <StatusItem label="API Gateway" status="success" />
              <StatusItem label="Database Cluster" status="warning" />
              <StatusItem label="Firewall FortiGate" status="success" />
              <StatusItem label="Backup Cloud" status="danger" />
            </div>
          </Card>

          {/* Card de Segurança com o Azul Escuro da JUCEPE */}
          <div className="bg-jucepe-dark p-6 rounded-jucepe text-white shadow-lg relative overflow-hidden">
            <Shield className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
            <div className="relative z-10">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Shield size={18} className="text-jucepe-accent" />
                Integridade do Sistema
              </h4>
              <p className="text-blue-100/80 text-xs leading-relaxed italic">
                Nenhuma vulnerabilidade crítica detectada nas últimas 24 horas. Certificados SSL atualizados.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

// Sub-componente de Métrica refatorado para usar o padrão de Card
const MetricCard = ({ icon: Icon, label, value, color, bg }) => (
  <Card className="p-0 overflow-hidden">
    <div className="flex items-center gap-4 p-5">
      <div className={`p-3 ${bg} ${color} rounded-xl shrink-0`}>
        <Icon size={24} />
      </div>
      <div className="min-w-0">
        <p className="text-jucepe-dark/40 text-[10px] font-bold uppercase tracking-widest truncate">{label}</p>
        <p className="text-xl font-bold text-jucepe-dark">{value}</p>
      </div>
    </div>
  </Card>
);

// Sub-componente de Status usando o seu componente Badge
const StatusItem = ({ label, status }) => {
  const statusMap = {
    success: { label: 'Online', variant: 'success' },
    warning: { label: 'Atenção', variant: 'warning' },
    danger: { label: 'Offline', variant: 'danger' },
  };

  return (
    <div className="flex items-center justify-between p-3 bg-jucepe-surface rounded-xl border border-jucepe-light/50">
      <span className="text-sm font-bold text-jucepe-dark/80">{label}</span>
      <Badge variant={statusMap[status].variant}>
        <div className={`w-1.5 h-1.5 rounded-full mr-2 bg-current ${status === 'success' ? 'animate-pulse' : ''}`} />
        {statusMap[status].label}
      </Badge>
    </div>
  );
};

export default Monitoramento;