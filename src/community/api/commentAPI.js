import axios from "axios";
import { getCookie } from "../../etc/util/cookieUtil";

const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/comment`;

// 댓글 목록 조회
export const getCommentList = async (pageParam, no) => {
  const { page } = pageParam;
  const res = await axios.get(`${host}/list`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    params: {
      page: page,
      size: 100,
      postId: no,
    },
  });

  return res.data;
};

// 댓글 등록
export const registerComment = async (dto) => {
  const res = await axios.post(`${host}/`, dto, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  });
  return res.data;
};

// 댓글 수정
export const modifyComment = async (dto) => {
  const res = await axios.put(`${host}/${dto.id}`, dto, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  });
  return res.data;
};

// 댓글 삭제
export const deleteComment = async (no) => {
  const res = await axios.delete(`${host}/${no}`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
  });
  return res.data;
};
