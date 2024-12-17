import React from "react";
import "./blobusinfo.css";
import Header from "./Header";

function BlobusInfo() {
  return (
    <div className="blobusinfo">
      {/* 배경과 Header 부분 */}
      <div>
        <Header
          pageTitle="소개"
          titleBg="#C40052"
          isWhite={true}
          borderB={false}
        />
      </div>

      {/* 사이드바 */}
      <div className="sidebar">
        <h1>BLOBUS</h1>
        <ul>
          <li>
            <a href="#intro">소개</a>
          </li>
          <li>
            <a href="#features">기능</a>
          </li>
          <li>
            <a href="#goals">목표</a>
          </li>
        </ul>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="w-[70%] h-[600px] ml-[15%]">
        <section id="intro" className="section">
          <img src="blobus_intro.png" alt="blobus 소개" />
        </section>
        <section id="features" className="section">
          <img src="blobus_features.png" alt="blobus 기능" />
        </section>
        <section id="goals" className="section">
          <img src="blobus_goals.png" alt="blobus 목표" />
        </section>
      </div>
    </div>
  );
}

export default BlobusInfo;
