import React from "react";
import Header from "../main/Header"; // Header를 대문자로 수정
import Footer from "../main/Footer";
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
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10">
        {/* Header에 isWhite prop을 true로 전달하고, pageTitle을 '청년관'으로 설정 */}
        <Header
          navs={youths}
          isWhite={true}
          pageTitle="청년관"
          titleBg="#6E00FF"
          borderB={false}
        />
      </div>

      <div className="flex-grow w-[70%] ml-[15%]">
        <Outlet />
      </div>

      <div className="bg-gray-800 text-white text-center">
        <Footer />
      </div>
    </div>
  );
}

export default YouthPage;
