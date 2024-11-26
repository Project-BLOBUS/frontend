import axios from "axios";
import { getCookie } from "../util/cookieUtil";

const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/mypage`;

// 즐겨찾기 조회
export const getBookmark = async (pageParam, category) => {
  const { page } = pageParam;
  const res = await axios.get(`${host}/bookmark`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    params: {
      page: page,
      size: 6,
      userId: getCookie("userId"),
      category: category,
    },
  });

  return res.data;
};

// 작성글 조회
export const getBoard = async (pageParam, board) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/doc`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    params: {
      page: page,
      size: size,
      userId: getCookie("userId"),
      boardType: board.type,
      boardCategory: board.category,
    },
  });

  return res.data;
};
