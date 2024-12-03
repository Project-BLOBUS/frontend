import axios from "axios";
import { getCookie } from "../../etc/util/cookieUtil";

const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/post`;

// 작성글 목록 조회
export const getPostList = async (pageParam, dto) => {
  const { page } = pageParam;
  const res = await axios.get(`${host}/list`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    params: {
      page: page,
      size: 10,
      boardType: dto.type,
      category: dto.category,
      keyward: dto.keyward,
    },
  });

  return res.data;
};

// 작성글 상세 조회
export const getPost = async (no) => {
  const res = await axios.get(`${host}/${no}`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  });

  return res.data;
};

// 작성글 등록
export const registerPost = async (dto) => {
  const res = await axios.post(`${host}/`, dto, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  });
  return res.data;
};

// 작성글 수정
export const modifyPost = async (dto) => {
  const res = await axios.put(`${host}/${dto.id}`, dto, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  });
  return res.data;
};

// 작성글 삭제
export const deletePost = async (no) => {
  const res = await axios.delete(`${host}/${no}`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  });
  return res.data;
};
