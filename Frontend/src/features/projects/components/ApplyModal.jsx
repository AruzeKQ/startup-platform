
import React from 'react';

export default function ApplyModal({ isOpen, onClose, projectTitle }) {
  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Đã gửi form! (Logic do bạn tự hoàn thiện)');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 cursor-pointer">✕</button>
        <h2 className="text-xl font-bold text-gray-900 mb-1">Ứng tuyển vị trí</h2>
        <p className="text-sm text-indigo-600 font-medium mb-6">{projectTitle}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
            <input type="text" required placeholder="Nguyễn Văn A" className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email liên hệ</label>
            <input type="email" required placeholder="email@example.com" className="w-full px-3.5 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm cursor-pointer">
              Hủy
            </button>
            <button type="submit" className="flex-1 px-4 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors text-sm cursor-pointer">
              Gửi hồ sơ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}