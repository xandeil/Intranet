import React from 'react';
import { 
  Calendar, 
  Image, 
  Newspaper, 
  Users, 
  Database, 
  Package, 
  Monitor, 
  Shield, 
  Gift 
} from 'lucide-react';
import { quickAccessItems } from '../../data/mockData.js';

const iconMap = {
  Calendar, Image, Newspaper, Users, Database, Package, Monitor, Shield, Gift
};

const QuickAccess = () => {
  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="section-title">Acesso Rápido</h2>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickAccessItems.map((item) => {
            const IconComponent = iconMap[item.icon] || Database;
            
            return (
              <button
                key={item.id}
                className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 hover:border-jucepe-secondary/30 hover:shadow-md transition-all duration-200 group text-left"
              >
                <div className={`p-2 rounded-lg ${item.color} group-hover:scale-110 transition-transform`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 leading-tight group-hover:text-jucepe-secondary transition-colors">
                    {item.label}
                  </p>
                  {item.subtitle && (
                    <p className="text-xs text-gray-500 mt-0.5">{item.subtitle}</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;