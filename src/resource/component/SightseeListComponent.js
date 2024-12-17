import React from "react";
import "../css/SightseePage.css";

const handleButtonClick = () => {
  // _blank -> 클리 시 새로운 창 띄움
  window.open("https://www.visitbusan.net/kr/index.do", "_blank");
};

const SightseePage = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/sightsee_bg.png')",
      }}
      className="flex items-center justify-between bg-white shadow-lg p-10 rounded-md w-full bg-cover bg-center"
    >
      {/* 왼쪽 네모 컨텐츠 */}
      <div className="w-1/2 flex justify-center items-center">
        <div className="rounded-md shadow-md w-3/4 h-full flex flex-col items-center justify-center">
          <img
            src="/visit_busan_logo.jpg"
            alt="visitbusan"
            border="0"
            className="w-full h-full rounded-md mx-auto"
          ></img>
        </div>
      </div>

      {/* 오른쪽 텍스트 */}
      <div className="w-1/2 text-gray-800 text-center">
        <h2 className="text-3xl font-semibold mb-4">Visit Busan</h2>
        <p className="text-lg leading-relaxed">
          '비짓부산'은 부산여행가서 보고, 먹고, <br />
          체험할 때 부산에 방문해야 되는 명소, 축제정보, 테마여행 정보를
          <br />
          한 눈에 볼 수 있는 부산여행 커뮤니티로, <br />
          최근 이를 활용하여 부산 여행을 즐기는 2030세대가
          <br /> 늘어나고 있는것으로 보인다
        </p>
        <div className="text-center mt-4">
          <button
            className="sightsee-button-custom color"
            onClick={handleButtonClick}
          >
            홈페이지 바로가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default SightseePage;
