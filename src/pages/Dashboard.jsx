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
      {/* 1. Topo: Cartões de Resumo (Ocupa a largura toda) */}
      <SummaryCards />

      {/* 2. Container de Colunas: Flexbox resolve o problema do vácuo */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        
{/* COLUNA DA ESQUERDA */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          {/* Subi o Acesso Rápido para teste de layout */}
          <QuickAccess /> 
          <ContentFeed />
          <MonitoringWidget />
        </div>

        {/* COLUNA DA DIREITA (33% da largura) */}
        <div className="w-full lg:w-1/3 space-y-6">
          <RHSocialWidget />
          <ImportantLinks />
          <RecentActivities />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;