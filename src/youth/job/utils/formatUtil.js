import React from "react";

/**
 * 디데이 계산 함수
 * @param {string} dateString - 사업 기간(예: '2024-02-01~2024-12-31')
 * @returns {string|null} D-day 형식 문자열 또는 null
 */
export const calculateDDay = (dateString) => {
  // "2024-02-01~2024-12-31" 형식의 문자열을 처리
  if (!dateString || dateString === "-") return "상시"; // 날짜가 없거나 "-"일 경우 "상시" 반환

  const match = dateString.match(/\d{4}-\d{2}-\d{2}/g); // 날짜 형식에 맞는 부분만 추출
  if (!match || match.length < 2) return "상시"; // 날짜가 없거나 형식이 잘못된 경우 "상시" 반환

  const endDate = new Date(match[1]); // 두 번째 날짜(종료일)
  endDate.setHours(0, 0, 0, 0); // 종료일 시간을 00:00:00으로 설정
  const currentDate = new Date(); // 현재 날짜
  currentDate.setHours(0, 0, 0, 0); // 현재 시간을 00:00:00으로 설정

  const timeDifference = endDate - currentDate; // 두 날짜의 차이 계산
  const daysLeft = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // 일 단위로 차이 계산

  return daysLeft >= 0 ? `D-${daysLeft}` : "마감"; // 남은 날짜가 0보다 작으면 "마감"
};

/**
 * 주관기관 정보 처리 함수
 * @param {string} mngtMson - 주관기관 정보
 * @returns {string} 처리된 주관기관 정보
 */
export const formatMngtMson = (mngtMson) => {
  if (!mngtMson || mngtMson === "-") return "주관기관 정보 없음"; // 값이 없거나 "-"일 경우 "주관기관 정보 없음" 반환

  // 특수문자 제거 (□ 등 제거) 및 공백 제거
  const cleanedMngtMson = mngtMson.replace(/[□]/g, "").trim();

  // "구청" 또는 "구"를 포함한 부분 추출
  const guMatch = cleanedMngtMson.match(/(?:부산시)?\s?(\S*구청|\S*구)/); // "구청" 또는 "구" 추출
  if (guMatch) {
    const guName = guMatch[1].replace("구청", "구").replace(/^부산/, "").trim(); // "구청" -> "구", "부산" 제거
    return `부산시 ${guName}`;
  }

  // 기타 기관명 처리 (부산시가 포함된 경우 중복 방지)
  if (cleanedMngtMson.startsWith("부산시")) {
    return cleanedMngtMson;
  }

  // 중앙부처나 기타 기관명은 그대로 반환
  return cleanedMngtMson;
};

/**
 * 문자열에서 줄바꿈(\n)을 <br />로 변환하는 함수
 * @param {string} text - 줄바꿈이 포함된 문자열
 * @returns {JSX.Element} <br /> 태그로 변환된 React 컴포넌트
 */
export const formatTextWithLineBreaks = (text) => {
  if (!text || text.includes("null")) return ""; // text가 null, undefined, 빈 문자열일 경우 빈 문자열 반환

  return text.split("\n").map((line, index) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));
};

/**
 * URL이 유효한 경우 <a> 태그로 링크를 감싸는 함수
 * @param {string} url - URL 문자열
 * @returns {JSX.Element} URL이 유효하면 <a> 태그로 링크 처리, 아니면 텍스트 반환
 */
export const formatUrl = (url) => {
  if (!url || url === "null" || url === "-") return null; // URL이 null이나 "-"인 경우 아무 것도 표시하지 않음

  // URL 정규식 (http:// 또는 https://로 시작하는 URL)
  const urlRegex = /^(https?:\/\/)/;

  // URL이 유효한 경우 <a> 태그로 반환
  if (urlRegex.test(url)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="break-all inline-block text-blue-500"
      >
        {url}
      </a>
    );
  }

  // URL이 아니면 그냥 텍스트로 출력
  return <span>{url}</span>;
};
