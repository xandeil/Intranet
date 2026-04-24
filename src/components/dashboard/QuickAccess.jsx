import React from 'react';
import { 
  Calendar, Image, Newspaper, Users, Database, 
  Package, Monitor, Shield, Gift, LayoutGrid 
} from 'lucide-react';
import { quickAccessItems } from '../../data/mockData.js';
import Card from '../ui/Card';

const iconMap = {
  Calendar, Image, Newspaper, Users, Database, Package, Monitor, Shield, Gift
};

const QuickAccess = () => {
  return (
    <Card title="Acesso Rápido" icon={LayoutGrid}>
      {/* Mudança chave: grid-cols-2 para celulares comuns, 
        mas os itens internos vão se comportar melhor 
      */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {quickAccessItems.map((item) => {
          const IconComponent = iconMap[item.icon] || Database;
          
          return (
            <button
              key={item.id}
              className="flex flex-col xs:flex-row items-center xs:items-start gap-2 xs:gap-3 p-3 xs:p-4 rounded-jucepe border border-jucepe-light hover:border-jucepe-secondary/30 hover:shadow-hover transition-all duration-200 group text-center xs:text-left"
            >
              {/* Container do ícone - Centralizado no mobile */}
              <div className={`p-2 rounded-lg ${item.color} group-hover:scale-110 transition-transform shrink-0`}>
                <IconComponent className="w-5 h-5" />
              </div>
              
              {/* Texto - Ajustado para não quebrar o layout */}
              <div className="flex-1 min-w-0 w-full">
                <p className="text-xs xs:text-sm font-bold text-jucepe-dark leading-tight group-hover:text-jucepe-secondary transition-colors break-words">
                  {item.label}
                </p>
                {item.subtitle && (
                  <p className="hidden xs:block text-[10px] text-jucepe-dark/50 mt-0.5 truncate">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
};

export default QuickAccess;