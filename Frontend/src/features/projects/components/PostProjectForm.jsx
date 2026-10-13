import React from 'react';
import { useState } from 'react';
import { projectApi } from '../services/projectApi';

export default function PostProjectForm() {
    const [selectedTags, setSelectedTags] = useState([])
    const [submitData, setSubmitData] = useState({
        logoUrl: '',
        projectName: '',
        companyName: '',
        location: '',
        salary: '',
        tags: [],
        description: ''
    })

    const handleSelectTag = (tag) => {
        setSelectedTags((prev) => {
            if (prev.includes(tag)) {
                return prev.filter((item) => item !== tag);
            }
            return [...prev, tag];
        })
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const response = await projectApi.postProject({
                ...submitData,
                tags: selectedTags
            });
            console.log("Đã đẩy data lên thành công!!!")
            setSubmitData({
                logoUrl: '',
                projectName: '',
                companyName: '',
                location: '',
                salary: '',
                tags: [],
                description: ''
            })
        } catch (error) {
            console.error(`Đang bị lỗi rồi ${error}`)
        }
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900">Thông tin dự án</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Điền đầy đủ thông tin để thu hút ứng viên phù hợp.
                </p>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-5">
                {/* Logo */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Logo công ty
                    </label>
                    <input
                        type="url"
                        value={submitData.logoUrl}
                        onChange={(e) => setSubmitData({ ...submitData, logoUrl: e.target.value })}
                        placeholder="https://example.com/logo.png"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                        Dùng đường dẫn ảnh (URL), kích thước nên nhỏ dưới 200KB.
                    </p>
                </div>

                {/* Tên dự án */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tên dự án
                    </label>
                    <input
                        type="text"
                        required
                        value={submitData.projectName}
                        onChange={(e) => setSubmitData({ ...submitData, projectName: e.target.value })}
                        placeholder="VD: Nền tảng quản lý chi tiêu cá nhân"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
                    />
                </div>

                {/* Tên công ty */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tên công ty / Startup
                    </label>
                    <input
                        type="text"
                        required
                        value={submitData.companyName}
                        onChange={(e) => setSubmitData({ ...submitData, companyName: e.target.value })}
                        placeholder="VD: TechMatch JSC"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
                    />
                </div>

                {/* Địa điểm + Mức lương */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Địa điểm
                        </label>
                        <select
                            value={submitData.location}
                            onChange={(e) => setSubmitData({ ...submitData, location: e.target.value })}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white outline-none focus:ring-2 focus:ring-indigo-500 transition-all">
                            <option value="">Chọn địa điểm</option>
                            <option value="hanoi">Hà Nội</option>
                            <option value="hcm">TP. Hồ Chí Minh</option>
                            <option value="da-nang">Đà Nẵng</option>
                            <option value="remote">Remote</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Mức lương
                        </label>
                        <input
                            type="text"
                            value={submitData.salary}
                            onChange={(e) => setSubmitData({ ...submitData, salary: e.target.value })}
                            placeholder="VD: 10-15 triệu/tháng"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
                        />
                    </div>
                </div>

                {/* Tags - chọn nhiều */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Công nghệ / Kỹ năng cần tìm
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {['Frontend', 'Backend', 'Fullstack', 'React', 'Node.js',
                            'Express.js', 'MongoDB', 'MySQL', 'Flutter', 'Java',
                            'Python', 'AI', 'Machine Learning', 'DevOps'].map((tag) => (
                                <label
                                    key={tag}
                                    className={`
                                        cursor-pointer
                                        border rounded-lg
                                        px-3 py-1.5
                                        text-xs
                                        transition-colors

            ${selectedTags.includes(tag)
                                            ? 'font-bold text-indigo-600 border-indigo-500 bg-indigo-50'
                                            : 'font-medium text-gray-600 border-gray-200'
                                        }
        `}
                                >
                                    <input
                                        type="checkbox"
                                        value={tag}
                                        checked={selectedTags.includes(tag)}
                                        onChange={() => handleSelectTag(tag)}
                                        className="hidden"
                                    />
                                    {tag}
                                </label>
                            ))}
                    </div>
                </div>

                {/* Mô tả */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mô tả dự án
                    </label>
                    <textarea
                        rows={6}
                        required
                        value={submitData.description}
                        onChange={(e) => setSubmitData({ ...submitData, description: e.target.value })}
                        placeholder="Mô tả về dự án, yêu cầu kỹ năng, tiến độ, thưởng..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all resize-y"
                    />
                </div>

                {/* Nút */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors text-sm cursor-pointer"
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors text-sm shadow-sm cursor-pointer"
                    >
                        Đăng dự án
                    </button>
                </div>
            </form>
        </div>
    );
}