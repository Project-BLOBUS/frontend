import React from "react";
import Header from "../main/Header"; // Header를 대문자로 수정
import { Outlet } from "react-router";
import "./css/youthStyle.css";

function YouthPage() {
  const youths = [
    { name: "일자리", link: "job" },
    { name: "주거", link: "house" },
    { name: "복지", link: "welfare" },
    { name: "교육", link: "education" },
  ];

  return (
    <div>
      <div className="bg-[#6F00FF]">
        {/* Header에 isWhite prop을 true로 전달하고, pageTitle을 '청년관'으로 설정 */}
        <Header
          navs={youths}
          isWhite={true}
          pageTitle="청년관"
          titleBg="#420099"
          borderB={false}
        />
      </div>

      <div className="w-[70%] h-[600px] ml-[15%]">
        <Outlet />
      </div>
    </div>
  );
}

export default YouthPage;
