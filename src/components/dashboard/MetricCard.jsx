import React from 'react';
import { TrendingUp, AlertCircle } from 'lucide-react';

function MetricCard({ 
  title, 
  value, 
  currency, 
  suffix, 
  change, 
  changeType, 
  icon: Icon, 
  iconBg, 
  iconColor 
}) {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600';
      case 'warning':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="w-4 h-4" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <div className="flex items-baseline gap-1">
            {currency && <span className="text-3xl font-bold text-gray-900">{currency}</span>}
            <span className="text-3xl font-bold text-gray-900">{value}</span>
            {suffix && <span className="text-lg text-gray-600 ml-2">{suffix}</span>}
          </div>
        </div>
        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
      <div className={`flex items-center gap-1 text-sm ${getChangeColor()}`}>
        {getChangeIcon()}
        <span className="font-medium">{change}</span>
        {changeType === 'positive' && <span className="text-gray-500 ml-1">vs ayer</span>}
      </div>
    </div>
  );
}

export default MetricCard;