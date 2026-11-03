import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projectApi } from '../services/projectApi';

export default function PostProjectForm() {
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState([]);
    const [status, setStatus] = useState(false);
    const [file, setFile] = useState(null);

    const handleSelectTag = (tag) => {
        setSelectedTags((prev) => {
            if (prev.includes(tag)) {
                return prev.filter((item) => item !== tag);
            }
            return [...prev, tag];
        })
    }

    const handlePress = () => navigate('/');

    const handleCancel = () => navigate(-1)

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            selectedTags.forEach(tag => formData.append('tags', JSON.stringify(tag)));
            const response = await projectApi.postProject(formData);
            console.log("Đã đẩy data lên thành công!!!")
            setStatus(true);
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
                        type="file"
                        accept='image/*'
                        name='logoFile'
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                        Upload logo Start-up tại đây.
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
                        name='projectName'
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
                        name='companyName'
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
                            name='location'
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
                            name='salary'
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
                        name='description'
                        placeholder="Mô tả về dự án, yêu cầu kỹ năng, tiến độ, thưởng..."
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all resize-y"
                    />
                </div>

                {/* Nút */}
                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={handleCancel}
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

                {/* Thông báo skibidi */}

                {status && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-6 max-w-sm w-full text-center">
                            <p className="text-gray-900 font-semibold mb-4">Tạo dự án thành công!</p>
                            <button
                                type='button'
                                onClick={handlePress}
                                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}