import React from 'react';

export default function EmptyState({ icon = '📁', title, description, actionLabel, onAction }) {
  return (
    <div className="text-center py-16">
      <span className="text-5xl mb-4 block">{icon}</span>
      <h3 className="text-lg font-semibold text-gray-900 mt-4">{title}</h3>
      <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-6 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors shadow-sm cursor-pointer"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
