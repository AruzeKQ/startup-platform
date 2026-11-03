import React from 'react';

const STATUS_MAP = {
  recruiting: {
    label: 'Đang tuyển',
    className: 'bg-emerald-50 text-emerald-700',
    dot: '🟢',
  },
  working: {
    label: 'Đang làm',
    className: 'bg-amber-50 text-amber-700',
    dot: '🟡',
  },
  finished: {
    label: 'Hoàn thành',
    className: 'bg-gray-100 text-gray-600',
    dot: '⚪',
  },
};

export default function ProjectStatusBadge({ status }) {
  const config = STATUS_MAP[status] || STATUS_MAP.recruiting;

  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-full ${config.className}`}>
      {config.dot} {config.label}
    </span>
  );
}
