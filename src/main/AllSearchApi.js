import axios from "axios";

// 기본 API URL 설정
const BASE_URL = "http://localhost:8080/allSearch"; // Spring Boot 서버 주소

// 검색 API 호출 함수
export const fetchPolicyTitles = async (search, page, category) => {
  try {
    // GET 요청을 보내고 응답을 받음
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        search: search, // 검색어
        page: page, // 페이지 번호
        category: category,
      },
      headers: {
        "Content-Type": "application/json", // 요청 헤더 설정
      },
    });

    // 응답이 성공적인 경우, 응답 데이터 리턴
    return response.data;
  } catch (error) {
    // 오류가 발생하면 에러를 던짐
    console.error("Error fetching data:", error);
    throw error;
  }
};

// 커뮤니티 관련 검색 API 호출 함수 추가
export const fetchCommunityTitles = async (
  search,
  page,
  category,
  community
) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        search: search,
        page: page,
        category: category,
        community: community,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching community data:", error);
    throw error;
  }
};
