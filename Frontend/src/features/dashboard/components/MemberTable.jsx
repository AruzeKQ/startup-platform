import React from 'react';

const ROLE_BADGES = {
  FE: { label: 'Frontend', className: 'bg-blue-50 text-blue-700' },
  BE: { label: 'Backend', className: 'bg-emerald-50 text-emerald-700' },
  none: { label: 'Chưa phân', className: 'bg-gray-100 text-gray-600' },
};

// Mock data — thay bằng props thật khi implement logic
const MOCK_MEMBERS = [
  {
    _id: '1',
    user: { _id: 'u1', name: 'Nguyễn Văn An', email: 'an.nguyen@gmail.com' },
    role: 'FE',
    joinedAt: '2026-10-28',
    color: 'bg-blue-400',
    initial: 'A',
  },
  {
    _id: '2',
    user: { _id: 'u2', name: 'Trần Thị Bình', email: 'binh.tran@gmail.com' },
    role: 'BE',
    joinedAt: '2026-10-25',
    color: 'bg-pink-400',
    initial: 'B',
  },
  {
    _id: '3',
    user: { _id: 'u3', name: 'Lê Văn Cường', email: 'cuong.le@gmail.com' },
    role: 'none',
    joinedAt: '2026-10-20',
    color: 'bg-amber-400',
    initial: 'C',
  },
];

export default function MemberTable({ members = MOCK_MEMBERS, onRemove, onChangeRole }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">
          Danh sách thành viên ({members.length})
        </h3>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1 cursor-pointer">
          + Thêm thành viên
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left text-xs font-medium text-gray-500 uppercase py-2.5">Thành viên</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase py-2.5">Email</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase py-2.5">Role</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase py-2.5">Ngày tham gia</th>
            <th className="text-center text-xs font-medium text-gray-500 uppercase py-2.5">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => {
            const roleBadge = ROLE_BADGES[member.role] || ROLE_BADGES.none;
            return (
              <tr key={member._id} className="border-b border-gray-50">
                <td className="py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full ${member.color} text-white text-sm flex items-center justify-center font-medium`}>
                      {member.initial}
                    </div>
                    <span className="text-sm font-medium text-gray-900">{member.user.name}</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-500">{member.user.email}</td>
                <td className="py-3">
                  <span className={`text-xs px-2 py-1 rounded-md font-medium ${roleBadge.className}`}>
                    {roleBadge.label}
                  </span>
                </td>
                <td className="py-3 text-sm text-gray-500">{member.joinedAt}</td>
                <td className="py-3 text-center">
                  <button
                    onClick={() => {
                      /* TODO: Implement remove member logic */
                      console.log('TODO: Remove member', member.user._id);
                    }}
                    className="text-sm text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                  >
                    ✕
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
