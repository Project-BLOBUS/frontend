import axios from "axios";

export const getPosts = async ({ page, size, tab, category, searchTerm }) => {
  const response = await axios.get("http://localhost:8080/posts", {
    params: {
      page,
      size,
      boardType: tab, // tab을 boardType에 매핑
      userType: category, // category를 userType에 매핑
      searchTerm, // 검색어
    },
  });
  return response.data;
};

export const createPost = async (postData) => {
  const response = await axios.post(
    "http://localhost:8080/posts/add",
    postData
  );
  return response.data;
};
