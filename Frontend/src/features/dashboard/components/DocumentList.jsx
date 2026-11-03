import React from 'react';

// Mock data — thay bằng props thật khi implement logic
const MOCK_DOCUMENTS = [
  {
    _id: '1',
    name: 'Project_Requirements.pdf',
    fileType: 'PDF',
    fileSize: 2457600, // bytes
    uploadedBy: { name: 'StartupABC' },
    icon: '📄',
    iconBg: 'bg-blue-50',
  },
  {
    _id: '2',
    name: 'Database_Schema.xlsx',
    fileType: 'Excel',
    fileSize: 865280,
    uploadedBy: { name: 'Trần Thị Bình' },
    icon: '📊',
    iconBg: 'bg-emerald-50',
  },
  {
    _id: '3',
    name: 'UI_Mockup_v2.fig',
    fileType: 'Figma',
    fileSize: 12689408,
    uploadedBy: { name: 'Nguyễn Văn An' },
    icon: '🎨',
    iconBg: 'bg-purple-50',
  },
];

function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(0) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

export default function DocumentList({ documents = MOCK_DOCUMENTS, onDownload, onDelete }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-900">
          Tài liệu dự án ({documents.length})
        </h3>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-1 cursor-pointer">
          + Upload tài liệu
        </button>
      </div>

      <div className="space-y-2">
        {documents.map((doc) => (
          <div
            key={doc._id}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg ${doc.iconBg} flex items-center justify-center text-lg`}>
                {doc.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-400">
                  {formatFileSize(doc.fileSize)} • Upload bởi {doc.uploadedBy?.name}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  /* TODO: Implement download logic */
                  console.log('TODO: Download document', doc._id);
                }}
                className="text-sm text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
              >
                Tải về
              </button>
              <button
                onClick={() => {
                  /* TODO: Implement delete logic */
                  console.log('TODO: Delete document', doc._id);
                }}
                className="text-sm text-red-500 hover:text-red-600 cursor-pointer"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
