import React from 'react';

// Mock data — thay bằng props thật khi implement logic
const MOCK_ACTIVITIES = [
  {
    id: 1,
    icon: '📥',
    iconBg: 'bg-emerald-100',
    text: <><strong>Nguyễn Văn A</strong> đã apply vào <span className="text-indigo-600 font-medium">AI Chatbot Platform</span></>,
    time: '2 giờ trước',
  },
  {
    id: 2,
    icon: '✅',
    iconBg: 'bg-blue-100',
    text: <><strong>Trần Thị B</strong> hoàn thành task <span className="text-indigo-600 font-medium">Design UI Dashboard</span></>,
    time: '5 giờ trước',
  },
  {
    id: 3,
    icon: '👥',
    iconBg: 'bg-amber-100',
    text: <><strong>Lê Văn C</strong> tham gia dự án <span className="text-indigo-600 font-medium">E-Commerce App</span></>,
    time: '1 ngày trước',
  },
  {
    id: 4,
    icon: '📝',
    iconBg: 'bg-purple-100',
    text: <>Bạn đã tạo task mới <span className="text-indigo-600 font-medium">Setup CI/CD Pipeline</span></>,
    time: '2 ngày trước',
  },
  {
    id: 5,
    icon: '⭐',
    iconBg: 'bg-rose-100',
    text: <><strong>Phạm Văn D</strong> đánh giá 5⭐ cho <span className="text-indigo-600 font-medium">FinTech Mobile</span></>,
    time: '3 ngày trước',
  },
];

export default function RecentActivity() {
  // TODO: Thay MOCK_ACTIVITIES bằng data thật từ API
  const activities = MOCK_ACTIVITIES;

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-base font-semibold text-gray-900">Hoạt Động Gần Đây</h2>
      </div>
      <div className="p-5 space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex gap-3">
            <div className={`w-8 h-8 rounded-full ${activity.iconBg} flex items-center justify-center text-sm flex-shrink-0`}>
              {activity.icon}
            </div>
            <div>
              <p className="text-sm text-gray-700">{activity.text}</p>
              <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
