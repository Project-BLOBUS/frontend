import React from "react";
import { useNavigate } from "react-router-dom";

const InfoListComponent = () => {
  const navigate = useNavigate();
  return (
    <div
      className="relative border border-gray-200 rounded-md p-3 shadow-sm hover:shadow-md transition cursor-pointer mb-2 transition-shadow duration-500"
      onClick={() => {
        navigate("/youth/job/infoRead");
      }}
    >
      <div className="absolute top-0 right-4 w-24 bg-gray-200 text-center text-gray-600 font-bold text-sm py-2 mb-2 rounded-b-md inline-block">
        마감 D-60
      </div>

      <div className="flex">
        <div>
          <h2 className="font-semibold text-xl mr-4">(주)우리기연</h2>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">
            (주)우리기연 시스템사업부 영업부 경력직 채용
          </p>
          <div className="mb-1 text-sm">
            <span className="pr-2">연차무관</span>
            <span className="px-2 border-l border-r border-gray-400">
              초대졸이상
            </span>
            <span className="pl-2">서울→서초구</span>
          </div>
          <div className="flex flex-wrap gap-2 text-xs text-gray-500">
            <span className="px-2 py-1 bg-gray-100 rounded-full">
              #전기소방설비
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded-full">
              #기계금속 기능
            </span>
            <span className="px-2 py-1 bg-gray-100 rounded-full">
              #기술영역
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoListComponent;
