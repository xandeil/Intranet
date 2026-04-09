import React from 'react';
import { FileText, Calendar, Gift, Megaphone, ChevronRight } from 'lucide-react';
import { recentActivities } from '../../data/mockData.js';

const iconMap = {
  FileText, Calendar, Gift, Megaphone
};

const RecentActivities = () => {
  return (
    <div className="bg-white rounded-xl shadow-card border border-gray-100 overflow-hidden h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-100">
        <h2 className="section-title">Atividades Recentes</h2>
        <button className="text-sm text-jucepe-secondary hover:text-jucepe-primary font-medium flex items-center gap-1">
          Ver todas
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="p-5">
        <div className="space-y-4">
          {recentActivities.map((activity) => {
            const IconComponent = iconMap[activity.icon] || FileText;
            
            return (
              <div 
                key={activity.id}
                className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 leading-snug group-hover:text-jucepe-secondary transition-colors">
                    {activity.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span>por {activity.author}</span>
                    <span>•</span>
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecentActivities;