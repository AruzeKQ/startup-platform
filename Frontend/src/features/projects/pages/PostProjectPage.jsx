import React from 'react';
import PostProjectForm from '../components/PostProjectForm';

export default function PostProjectPage() {
    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Đăng Dự Án Mới</h1>
                    <p className="mt-3 text-gray-500">
                        Chia sẻ dự án của bạn để tìm kiếm ứng viên phù hợp.
                    </p>
                </div>

                {/* Form do bạn tự viết logic */}
                <PostProjectForm />

            </div>
        </div>
    );
}