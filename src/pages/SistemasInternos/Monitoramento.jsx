import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { Activity, Clock, Users, Database } from 'lucide-react';

// Dados fictícios para o pessoal de TI
const performanceData = [
  { name: 'Seg', prog: 45, redes: 32 },
  { name: 'Ter', prog: 52, redes: 40 },
  { name: 'Qua', prog: 48, redes: 55 },
  { name: 'Qui', prog: 61, redes: 42 },
  { name: 'Sex', prog: 55, redes: 38 },
];

const setorDistribui = [
  { name: 'Programação', value: 60, color: '#1e3a8a' }, // Blue-900
  { name: 'Redes/Infra', value: 40, color: '#3b82f6' }, // Blue-500
];

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-xl font-bold text-gray-800">{value}</h3>
    </div>
  </div>
);

export default function Monitoramento() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Cabeçalho */}
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-blue-900">Monitoramento de Desempenho TI</h1>
        <p className="text-gray-500 text-sm">Painel de métricas: Programação & Redes</p>
      </header>

      {/* Cards de Métricas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard icon={Clock} label="Total Horas/Sem" value="480h" color="bg-blue-600" />
        <StatCard icon={Activity} label="Sprints Ativas" value="12" color="bg-indigo-600" />
        <StatCard icon={Users} label="Colaboradores" value="18" color="bg-blue-900" />
        <StatCard icon={Database} label="Uptime Servidores" value="99.9%" color="bg-cyan-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Gráfico de Barras - Produção Diária */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Produção Diária (Tarefas)</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip cursor={{fill: '#f1f5f9'}} />
                <Legend />
                <Bar dataKey="prog" name="Programação" fill="#1e3a8a" radius={[4, 4, 0, 0]} />
                <Bar dataKey="redes" name="Redes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Pizza - Distribuição de Carga */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Carga de Trabalho por Setor</h2>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={setorDistribui}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {setorDistribui.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-400 mt-2 italic">Valores baseados em tickets fechados no mês</p>
        </div>

      </div>

      {/* Gráfico de Linha - Uptime/Estabilidade */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Tendência de Estabilidade do Sistema (%)</h2>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis domain={[90, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="prog" stroke="#1e3a8a" strokeWidth={3} dot={{ r: 6 }} />
              <Line type="monotone" dataKey="redes" stroke="#3b82f6" strokeWidth={3} strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}