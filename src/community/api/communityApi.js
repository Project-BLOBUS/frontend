import axios from "axios";
import { getCookie } from "../../etc/util/cookieUtil";

const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/community`;

// 작성글 목록 조회
export const getList = async (pageParam, dto) => {
  const { page } = pageParam;
  const res = await axios.get(`${host}/list`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    params: {
      page: page,
      size: 20,
      boardType: dto.type,
      category: dto.category,
      keyward: dto.keyward,
    },
  });

  return res.data;
};

// 작성글 목록 조회
export const getOne = async (no) => {
  const res = await axios.get(`${host}/${no}`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  });

  return res.data;
};
