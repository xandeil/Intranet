import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3, Activity, CheckCircle, Eye } from 'lucide-react';
import { monitoringData, chartData } from '../../data/mockData.js';

const MonitoringWidget = () => {
  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h2 className="section-title">Monitoramento & Dados</h2>
        <button className="text-sm text-jucepe-secondary hover:text-jucepe-primary font-medium flex items-center gap-1">
          Ver painel
          <Eye className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Power BI Metrics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <BarChart3 className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-700">Controle Interno (Power BI)</h3>
            </div>
            
            <p className="text-xs text-gray-500 mb-3">Métricas do mês atual</p>
            
            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-800">{monitoringData.users.value}</p>
                <p className="text-xs text-gray-500">{monitoringData.users.label}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-800">{monitoringData.sessions.value}</p>
                <p className="text-xs text-gray-500">{monitoringData.sessions.label}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-800">{monitoringData.rejectionRate.value}</p>
                <p className="text-xs text-gray-500">{monitoringData.rejectionRate.label}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-lg font-bold text-gray-800">{monitoringData.avgTime.value}</p>
                <p className="text-xs text-gray-500">{monitoringData.avgTime.label}</p>
              </div>
            </div>

            {/* Chart */}
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 10 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={{ fill: '#2563eb', strokeWidth: 0, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sessions" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 0, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Zabbix Server Status */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-green-600" />
              <h3 className="text-sm font-semibold text-gray-700">Módulo de Monitoramento Zabbix</h3>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>

            {/* Server Status Circle */}
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative w-40 h-40">
                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border-4 border-gray-100"></div>
                {/* Progress ring */}
                <svg className="absolute inset-0 w-full h-full -rotate-90">
                  <circle
                    cx="80"
                    cy="80"
                    r="76"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 76 * 0.95} ${2 * Math.PI * 76 * 0.05}`}
                    strokeLinecap="round"
                    className="drop-shadow-md"
                  />
                </svg>
                {/* Inner content */}
                <div className="absolute inset-4 rounded-full bg-white shadow-inner flex flex-col items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-500 mb-1" />
                  <p className="text-xs font-semibold text-gray-600 text-center leading-tight">
                    Servidor<br/>Servidor<br/>OK
                  </p>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm font-medium text-gray-700">{monitoringData.serverName}</p>
                <p className="text-xs text-gray-500 mt-1">Última verificação: há 2 minutos</p>
              </div>
            </div>

            {/* Additional Status Indicators */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-700 font-medium">Banco de Dados</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-700 font-medium">API REST</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-700 font-medium">Servidor Web</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-xs text-yellow-700 font-medium">Backup</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringWidget;