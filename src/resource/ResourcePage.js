import React from "react";
import Header from "../main/Header"; // Header를 대문자로 수정
import Footer from "../main/Footer";
import { Outlet } from "react-router";

function Resources() {

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10">
        {/* Header에 isWhite prop을 true로 전달하고, pageTitle을 '청년관'으로 설정 */}
        <Header
          pageTitle="지역자원"
           titleBg="linear-gradient(90deg, #2D26A6, #AE019B)"
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

export default Resources;
