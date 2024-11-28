import axios from "axios";

// API 서버 호스트 및 공통 prefix 정의
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/community`;

export const getPosts = async ({ page, size, tab, category }) => {
  try {
    const response = await axios.get(`${prefix}`, {
      params: {
        page,
        size,
        boardType: tab, // tab을 boardType에 매핑
        userType: category, // category를 userType에 매핑
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("API 요청 실패: " + error.message);
  }
};

const addPost = async (postData) => {
  try {
    const response = await axios.post(`${prefix}/add`, postData);
    console.log("게시글 작성 성공:", response.data);
    alert("게시글이 작성되었습니다.");
  } catch (error) {
    console.error("게시글 작성 실패:", error.response?.data || error.message);
    alert("게시글 작성에 실패했습니다.");
  }
};
