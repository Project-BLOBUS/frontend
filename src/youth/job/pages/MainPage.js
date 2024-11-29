import React from "react";
import { Outlet, useLocation } from "react-router";
import JobSidebarComponent from "../components/JobSidebarComponent";

const MainPage = () => {
  const location = useLocation();

  // 라우팅 경로에 따른 title 설정
  const getTitle = () => {
    if (
      location.pathname.includes("/job/policyList") ||
      location.pathname.includes("/job/policyRead")
    )
      return "청년 일자리 정책";
    else if (
      location.pathname.includes("/job/infoList") ||
      location.pathname.includes("/job/infoRead")
    )
      return "청년 일자리 정보";
  };

  const title = getTitle();

  return (
    <>
      <div className="guide-line">
        <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-b-gray-200">
          {title}
        </h1>
        {/* 컨텐츠 영역 */}
        <Outlet />
      </div>

      {/* 사이드바 영역 */}
      <JobSidebarComponent />
    </>
  );
};

export default MainPage;
