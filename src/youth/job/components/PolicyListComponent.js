import React from "react";
import { useNavigate } from "react-router-dom";

const PolicyListComponent = ({ policy }) => {
  console.log("policy", policy);
  const navigate = useNavigate();

  // policy가 undefined이거나 null일 경우, 기본값을 사용하도록 안전하게 처리
  if (!policy) {
    return null; // policy가 없으면 컴포넌트를 렌더링하지 않음
  }

  return (
    <div
      className="relative h-44 border border-gray-200 rounded-md px-3 pb-3 shadow-sm hover:shadow-md cursor-pointer transition-shadow duration-600"
      onClick={() => {
        navigate("/youth/job/policyRead");
        // navigate(`/youth/job/policyRead/${policy.id}`); // 정책 ID로 상세 페이지 이동
      }}
    >
      {/* D-day 영역 */}
      <div className="absolute top-0 left-3 bg-[#6F00FF] text-white font-bold text-sm px-2 py-1 rounded-b-md inline-block">
        {policy.dDay ? `D-${policy.dDay}` : "D-0"}
      </div>

      {/* 제목 영역 */}
      <div className="absolute top-[40px] left-3 right-3">
        <h2 className="font-semibold text-xl overflow-hidden text-ellipsis line-clamp-1">
          {policy.title || "제목 없음"}
        </h2>
      </div>

      {/* 서브제목 영역 */}
      <div className="absolute top-[70px] left-3 right-3">
        <p className="text-sm text-gray-600 overflow-hidden text-ellipsis line-clamp-2">
          {policy.content || "서브제목 없음"}
        </p>
      </div>

      {/* 대상 영역 */}
      <div className="absolute top-[115px] left-3 right-3">
        <p className="text-xs text-gray-500 overflow-hidden text-ellipsis line-clamp-1">
          {policy.target ? `대상: ${policy.target}` : "대상 정보 없음"}
        </p>
      </div>

      {/* 하단의 출처 영역 */}
      <div className="absolute bottom-4 left-3 text-xs text-gray-500">
        {policy.organ || "주관기관 정보 없음"}
      </div>
    </div>
  );
};

export default PolicyListComponent;
