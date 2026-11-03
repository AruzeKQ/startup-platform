import React from 'react';

const PRIORITY_BADGES = {
  High: { label: 'High', className: 'bg-red-50 text-red-700', dot: '🔴' },
  Medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700', dot: '🟡' },
  Low: { label: 'Low', className: 'bg-emerald-50 text-emerald-700', dot: '🟢' },
};

const STATUS_BADGES = {
  'In progress': { label: 'In progress', className: 'bg-amber-50 text-amber-700' },
  'Finished': { label: 'Finished ✓', className: 'bg-emerald-50 text-emerald-700' },
};

// Mock data — thay bằng props thật khi implement logic
const MOCK_TASKS = [
  {
    _id: '1',
    title: 'Design UI Dashboard',
    description: 'Tạo giao diện dashboard chính cho startup',
    asignee: { name: 'Nguyễn Văn An', initial: 'A', color: 'bg-blue-400' },
    priority: 'High',
    status: 'In progress',
  },
  {
    _id: '2',
    title: 'Setup Database Schema',
    description: 'Thiết kế MongoDB schema cho project',
    asignee: { name: 'Trần Thị Bình', initial: 'B', color: 'bg-pink-400' },
    priority: 'Medium',
    status: 'Finished',
  },
  {
    _id: '3',
    title: 'Implement Auth API',
    description: 'JWT authentication endpoints cho backend',
    asignee: { name: 'Trần Thị Bình', initial: 'B', color: 'bg-pink-400' },
    priority: 'Low',
    status: 'In progress',
  },
  {
    _id: '4',
    title: 'Setup CI/CD Pipeline',
    description: 'Cấu hình GitHub Actions cho auto deploy',
    asignee: { name: 'Lê Văn Cường', initial: 'C', color: 'bg-amber-400' },
    priority: 'Medium',
    status: 'In progress',
  },
];

export default function TaskTable({ tasks = MOCK_TASKS, onEdit, onDelete }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">
          Danh sách tasks ({tasks.length})
        </h3>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1 cursor-pointer">
          + Tạo Task
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left text-xs font-medium text-gray-500 uppercase py-2.5">Task</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase py-2.5">Assignee</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase py-2.5">Ưu tiên</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase py-2.5">Trạng thái</th>
            <th className="text-center text-xs font-medium text-gray-500 uppercase py-2.5">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => {
            const priorityBadge = PRIORITY_BADGES[task.priority] || PRIORITY_BADGES.Medium;
            const statusBadge = STATUS_BADGES[task.status] || STATUS_BADGES['In progress'];
            return (
              <tr key={task._id} className="border-b border-gray-50">
                <td className="py-3">
                  <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  <p className="text-xs text-gray-400">{task.description}</p>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-full ${task.asignee.color} text-white text-xs flex items-center justify-center`}>
                      {task.asignee.initial}
                    </div>
                    <span className="text-sm text-gray-600">{task.asignee.name}</span>
                  </div>
                </td>
                <td className="py-3">
                  <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-md ${priorityBadge.className}`}>
                    {priorityBadge.dot} {priorityBadge.label}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusBadge.className}`}>
                    {statusBadge.label}
                  </span>
                </td>
                <td className="py-3 text-center">
                  <button
                    onClick={() => {
                      /* TODO: Implement task action menu */
                      console.log('TODO: Task actions', task._id);
                    }}
                    className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer"
                  >
                    ⋮
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
