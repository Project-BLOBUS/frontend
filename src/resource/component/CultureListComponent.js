import React, { useState } from "react";
import styles from "../css/Culture.module.css";
import BookBtn from "../../member/component/mypage/BookBtn";
// import "../css/Culture.css";

const CultureListComponent = ({ culture }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className="relative border border-gray-200 rounded-md pb-3 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="relative group overflow-hidden">
          <img
            src={culture.image?._url || "https://via.placeholder.com/300x400"}
            alt={culture.title?._text || "이미지 없음"}
            className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-110"
          />
          {/* 오버레이 */}
          <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className={styles.btn}
              onClick={() => window.open(culture.card._url, "_blank")}
            >
              <span>바로가기</span>
            </button>
          </div>
        </div>
        <div className="p-4">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">
              {culture.title?._text || "제목 정보 없음"}
            </h3>
            <BookBtn main="지역" sub="문화" targetId={culture.res_no?._text} />
          </div>
          <p className="text-sm text-gray-600">
            {culture.place_nm?._text || "시설명 정보 없음"}
          </p>
          <p className="text-sm text-gray-500">
            {culture.op_st_dt?._text
              ? `시작일: ${culture.op_st_dt._text}`
              : "시작일 정보 없음"}
          </p>
          <p className="text-sm text-gray-500">
            {culture.op_ed_dt?._text
              ? `종료일: ${culture.op_ed_dt._text}`
              : "종료일 정보 없음"}
          </p>
          <p className="text-sm text-gray-500">
            {culture.pay_at?._text
              ? `입장료: ${culture.pay_at._text}`
              : "입장료 정보 없음"}
          </p>
        </div>
        {/* 이동 버튼 */}
        {/* {isHovered && (
          <button
            className={styles.btn}
            onClick={() => window.open(culture.card._url, "_blank")}
          >
            <span>바로가기</span>
          </button>
        )} */}
      </div>
    </div>
  );
};
export default CultureListComponent;
