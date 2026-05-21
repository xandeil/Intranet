import React from 'react';
import { Link } from 'react-router-dom';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Activity, Server, Database, Shield,
  Globe, Cpu, HardDrive, RefreshCcw, Monitor, ExternalLink
} from 'lucide-react';

// IMPORTAÇÃO DO SEU DESIGN SYSTEM
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { monitoringData, chartData } from '../../data/mockData.js';

const Monitoramento = () => {
  const COLORS = {
    primary: "#1e4a7e",
    secondary: "#2563eb",
    success: "#22c55e",
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-jucepe-dark flex items-center gap-3">
            <Activity className="w-7 h-7 text-jucepe-secondary" />
            Centro de Monitoramento
          </h1>
          <p className="text-sm text-jucepe-dark/50 mt-1 italic">Status da infraestrutura (Zabbix/Grafana)</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <Link to="/monitoramento" className="w-full md:w-auto">
            <Button variant="primary" icon={Monitor} className="w-full">
              Ver Painéis Completos
            </Button>
          </Link>

          <Button variant="outline" icon={RefreshCcw} onClick={() => window.location.reload()}>
            Atualizar Agora
          </Button>
        </div>
      </header>

    {/* Grid de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-1">
        <MetricCard icon={Monitor} label="INTRANET" value="100%" color="text-blue-600" bg="bg-blue-50" />
        <MetricCard icon={RefreshCcw} label="Integridade de Cache" value="98.4%" color="text-green-600" bg="bg-green-50" />
        <MetricCard icon={Activity} label="Latência DNS" value="14ms" color="text-purple-600" bg="bg-purple-50" />
        <MetricCard icon={Shield} label="Ameaças Bloqueadas" value="0" color="text-emerald-600" bg="bg-emerald-50" />
      </div>  

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-1">
        {/* Gráfico Principal */}
        <div className="lg:col-span-2">
          <Card title="Histórico de Acessos" icon={Activity}>
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
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="users" stroke={COLORS.secondary} strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Lado Direito: Atalhos e Status */}
        <div className="space-y-6">
          <Card title="Atalhos do Servidor" icon={Server}>
            <div className="space-y-3 mt-2">
              <a
                href="http://10.10.10.23:3000/d/ba143049-3834-4b30-9406-7a1c0f16b09b/site-jucepe"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <span className="text-sm font-bold text-jucepe-dark/80 group-hover:text-blue-700">Link JUCEPE</span>
                <Badge variant="success">Online</Badge>
              </a>

              <a
                href="http://10.10.10.23:3000/d/14bf24d5-57f8-4fef-821a-9145007c41c5/chamados"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <span className="text-sm font-bold text-jucepe-dark/80 group-hover:text-blue-700">Gestão de Chamados</span>
                <Badge variant="success">Online</Badge>
              </a>

              <a
                href="http://10.10.10.23:3000/d/d9f82298-6691-472e-b676-ab5f050b5fab/certificados"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <span className="text-sm font-bold text-jucepe-dark/80 group-hover:text-blue-700">Certificados Digitais</span>
                <Badge variant="success">Online</Badge>
              </a>
            </div>

            {/* BOTÃO ATUALIZADO COM O LINK DO GRAFANA */}
            <a
              href="http://10.10.10.23:3000/dashboards"
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-6 p-4 bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              <p className="text-[10px] font-bold uppercase opacity-80 tracking-wider">Acesso Rápido</p>
              <h5 className="font-bold">Todos os Dashboards</h5>
              <div className="flex justify-between items-center mt-2 text-xs">
                <span>Painéis disponíveis</span>
                <Monitor size={16} />
              </div>
            </a>
          </Card>

          {/* Card de Segurança */}
          <div className="bg-jucepe-dark p-6 rounded-jucepe text-white shadow-lg relative overflow-hidden">
            <Shield className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10" />
            <div className="relative z-10">
              <h4 className="font-bold mb-2 flex items-center gap-2">
                <Shield size={18} className="text-green-400" />
                Segurança Ativa
              </h4>
              <p className="text-blue-100/80 text-xs leading-relaxed italic">
                Nenhuma vulnerabilidade detectada. Firewall FortiGate operacional.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-componentes
const MetricCard = ({ icon: Icon, label, value, color, bg }) => (
  <Card className="p-0 overflow-hidden border-none shadow-sm">
    <div className="flex items-center gap-4 p-5">
      <div className={`p-3 ${bg} ${color} rounded-xl shrink-0`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-jucepe-dark/40 text-[10px] font-bold uppercase tracking-widest">{label}</p>
        <p className="text-xl font-bold text-jucepe-dark">{value}</p>
      </div>
    </div>
  </Card>
);

const StatusItem = ({ label, status }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
    <span className="text-sm font-bold text-jucepe-dark/80">{label}</span>
    <Badge variant="success">Online</Badge>
  </div>
);

export default Monitoramento;