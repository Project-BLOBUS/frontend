import axios from "axios";
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/job`;

export const fetchPolicyList = async () => {
  // 예시: 정책 데이터를 가져오는 코드
  return [
    {
      id: 1,
      title: "일자리 정책 제목",
      content: "서브제목 내용",
      target: "청년 및 신혼부부",
      organ: "국토교통부",
      dDay: 60,
    },
    {
      id: 2,
      title: "주택 지원 정책",
      content: "청년 주택 지원 정보",
      target: "만 39세 이하",
      organ: "국토교통부",
      dDay: 30,
    },
  ];
};
