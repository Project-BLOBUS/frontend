import React from 'react';

const ShareModal = ({ isOpen, onClose, url }) => {
  if (!isOpen) return null;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(url).then(() => {
      alert('URL이 복사되었습니다.');
    }).catch(err => {
      console.error('URL 복사 실패:', err);
    });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg w-1/3">
        <h2 className="text-xl mb-4">공유하기</h2>
        <p>이 페이지를 공유하세요</p>
        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Facebook</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Twitter</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Email</button>
        </div>
        <input
          type="text"
          value={url}
          readOnly
          className="w-full p-2 border border-gray-300 rounded mt-2"
        />
        <button
          onClick={handleCopyUrl}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          URL 복사
        </button>
        <div className="flex justify-end mt-1">
          <button
            onClick={onClose}
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;