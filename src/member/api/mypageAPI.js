import axios from "axios";
import { getCookie } from "../util/cookieUtil";

const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/mypage`;

// 회원정보 조회
export const getBoardList = async (pageParam, board) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/list`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`, // 동적 헤더 설정
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
