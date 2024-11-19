import axios from "axios";

export const getPosts = async ({ page, size, tab, category, searchTerm }) => {
  const response = await axios.get("http://localhost:8080/posts", {
    params: { page, size, tab, category, searchTerm },
  });
  return response.data;
};
