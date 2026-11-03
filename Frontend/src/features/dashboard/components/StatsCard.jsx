import React from 'react';

export default function StatsCard({ icon, label, value, trend, trendType = 'neutral', bgColor = 'bg-indigo-50' }) {
  const trendColors = {
    up: 'text-emerald-600',
    down: 'text-red-600',
    neutral: 'text-gray-400',
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <span className={`w-9 h-9 rounded-lg ${bgColor} flex items-center justify-center text-lg`}>
          {icon}
        </span>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
      {trend && (
        <p className={`text-xs mt-1 font-medium ${trendColors[trendType]}`}>
          {trendType === 'up' && '↑ '}
          {trendType === 'down' && '↓ '}
          {trend}
        </p>
      )}
    </div>
  );
}
