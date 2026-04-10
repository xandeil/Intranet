import React from 'react';
import SummaryCards from '../components/dashboard/SummaryCards.jsx';
import ContentFeed from '../components/dashboard/ContentFeed.jsx';
import RHSocialWidget from '../components/dashboard/RHSocialWidget.jsx';
import MonitoringWidget from '../components/dashboard/MonitoringWidget.jsx';
import QuickAccess from '../components/dashboard/QuickAccess.jsx';
import RecentActivities from '../components/dashboard/RecentActivities.jsx';
import ImportantLinks from '../components/dashboard/ImportantLinks.jsx';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Cartões de Resumo */}
      <SummaryCards />

      {/* Grid Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da Esquerda - Feed de Conteúdo */}
        <div className="lg:col-span-2 space-y-6">
          <ContentFeed />
          
          {/* Seção de Monitoramento */}
          <MonitoringWidget />
        </div>

        {/* Coluna da Direita - Widgets */}
        <div className="space-y-6">
          <RHSocialWidget />
          <ImportantLinks />
        </div>
      </div>

      {/* Grid Inferior */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Acesso Rápido */}
          <QuickAccess />
        </div>
        <div>
          {/* Atividades Recentes */}
          <RecentActivities />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;