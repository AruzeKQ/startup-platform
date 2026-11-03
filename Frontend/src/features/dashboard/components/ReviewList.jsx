import React from 'react';

// Mock data — thay bằng props thật khi implement logic
const MOCK_REVIEWS = [
  {
    _id: '1',
    reviewer: { name: 'Nguyễn Văn An', initial: 'A', color: 'bg-blue-400' },
    reviewee: { name: 'Trần Thị Bình', initial: 'B', color: 'bg-pink-400' },
    rating: 5,
    comment: 'Backend code rất clean và well-documented. Team work rất tốt!',
  },
  {
    _id: '2',
    reviewer: { name: 'Trần Thị Bình', initial: 'B', color: 'bg-pink-400' },
    reviewee: { name: 'Nguyễn Văn An', initial: 'A', color: 'bg-blue-400' },
    rating: 4,
    comment: 'UI đẹp, responsive tốt. Cần cải thiện thêm performance một chút.',
  },
];

function StarRating({ rating }) {
  return (
    <span className="text-sm text-amber-500">
      {'⭐'.repeat(rating)}
    </span>
  );
}

export default function ReviewList({ reviews = MOCK_REVIEWS }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-gray-900 mb-4">
        Đánh giá thành viên ({reviews.length})
      </h3>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {/* Reviewer */}
                <div className={`w-7 h-7 rounded-full ${review.reviewer.color} text-white text-xs flex items-center justify-center font-medium`}>
                  {review.reviewer.initial}
                </div>
                <span className="text-sm font-medium text-gray-900">{review.reviewer.name}</span>

                <span className="text-xs text-gray-400">→</span>

                {/* Reviewee */}
                <div className={`w-7 h-7 rounded-full ${review.reviewee.color} text-white text-xs flex items-center justify-center font-medium`}>
                  {review.reviewee.initial}
                </div>
                <span className="text-sm font-medium text-gray-900">{review.reviewee.name}</span>
              </div>

              <StarRating rating={review.rating} />
            </div>
            <p className="text-sm text-gray-600">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}
