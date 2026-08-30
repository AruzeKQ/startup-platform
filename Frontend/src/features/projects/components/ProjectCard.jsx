import React from 'react';

export default function ProjectCard({ project, onApply }) {
  const { title, companyName, logo, location, salary, tags, description, postedAt } = project;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <img src={logo || 'https://via.placeholder.com/48'} alt={companyName} className="w-12 h-12 rounded-lg object-cover border border-gray-100" />
          <div>
            <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{title}</h3>
            <p className="text-sm text-gray-500">{companyName}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-xs text-gray-600 mb-4">
          <span className="bg-gray-100 px-2.5 py-1 rounded-md">📍 {location}</span>
          <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md font-medium">💰 {salary}</span>
          <span className="bg-gray-100 px-2.5 py-1 rounded-md">🕒 {postedAt}</span>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {tags?.map((tag, index) => (
            <span key={index} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onApply(project)}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm cursor-pointer"
      >
        Ứng tuyển ngay
      </button>
    </div>
  );
}