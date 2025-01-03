import React from "react";
import { Outlet, useLocation } from "react-router";

const MainPage = () => {
  const location = useLocation();

  // 라우팅 경로에 따른 title 설정
  const getTitle = () => {
    if (
      location.pathname.includes("/house/policyList") ||
      location.pathname.includes("/house/policyRead") ||
      location.pathname.includes("/house/policyModify")
    )
      return "청년 주거 정책";
  };

  const title = getTitle();

  return (
    <div className="guide-line">
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-b-gray-200">
        {title}
      </h1>
      {/* 컨텐츠 영역 */}
      <Outlet />
    </div>
  );
};

export default MainPage;
