import React from "react";
import "../css/SightseePage.css";

const handleButtonClick = () => {
  // _blank -> 클리 시 새로운 창 띄움
  window.open("https://www.visitbusan.net/kr/index.do", "_blank");
};

const SightseePage = () => {
  return (
    <div className="gg-container">
      <div className="gg-content-left">
        <a href="https://imgbb.com/">
          <img
            src="https://i.ibb.co/QYDKJ77/visitbusan.jpg"
            alt="visitbusan"
            border="0"
            className=""
          ></img>
        </a>
      </div>
      <div className="gg-content-right">
        <div>
          <h1 className="sightsee-title">Visit Busan</h1>
          <p className="sightsee-description">
            '비짓부산'은 부산여행가서 보고, 먹고, <br />
            체험할 때 부산에 방문해야 되는 명소, 축제정보, 테마여행 정보를
            <br />한 눈에 볼 수 있는 부산여행 커뮤니티로, <br />
            최근 이를 활용하여 부산 여행을 즐기는 2030세대가 늘어나고 있는
            것으로 보인다
          </p>
        </div>
        <div>
          <button className="sightsee-button color" onClick={handleButtonClick}>
            홈페이지 바로가기
          </button>
        </div>
      </div>
    </div>

    // <div className="sightsee-container">
    //   <div className="sightsee-img-box">
    //     <a href="https://imgbb.com/">
    //       <img
    //         src="https://i.ibb.co/QYDKJ77/visitbusan.jpg"
    //         alt="visitbusan"
    //         border="0"
    //         className="sightsee-img"
    //       ></img>
    //     </a>
    //   </div>
    //   <div className="sightsee-text">
    //     <h1 className="sightsee-title">Visit Busan</h1>
    //     <p className="sightsee-description">
    //       '비짓부산'은 부산여행가서 보고, 먹고, <br />
    //       체험할 때 부산에 방문해야 되는 명소, 축제정보, 테마여행 정보를
    //       <br />한 눈에 볼 수 있는 부산여행 커뮤니티로, <br />
    //       최근 이를 활용하여 부산 여행을 즐기는 2030세대가 늘어나고 있는 것으로
    //       보인다
    //     </p>
    //   </div>
    //   <button className="sightsee-button color" onClick={handleButtonClick}>
    //     홈페이지 바로가기
    //   </button>
    // </div>
  );
};

export default SightseePage;
