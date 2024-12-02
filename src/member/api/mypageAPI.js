import axios from "axios";
import { getCookie } from "../../etc/util/cookieUtil";

const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/mypage`;

// 커스텀 설정 불러오기
export const loadSetting = async () => {
  const res = await axios.get(`${host}/custom/setting`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    params: {
      userId: getCookie("userId"),
    },
  });

  return res.data;
};

// 커스텀 설정 저장
export const saveSetting = async (yListStr, eListStr, rListStr, kListStr) => {
  const res = await axios.post(`${host}/custom/setting`, null, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    params: {
      userId: getCookie("userId"),
      yListStr,
      eListStr,
      rListStr,
      kListStr,
    },
  });

  return res.data;
};

// 커스텀 조회
export const getCustom = async (
  pageParam,
  yListStr,
  eListStr,
  rListStr,
  kListStr
) => {
  const { page } = pageParam;

  const res = await axios.get(`${host}/custom/list`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    params: {
      page: page,
      size: 6,
      address: getCookie("address"),
      yListStr: yListStr,
      eListStr: eListStr,
      rListStr: rListStr,
      kListStr: kListStr,
    },
  });

  return res.data;
};

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
export const getBoard = async (pageParam, dto) => {
  const { page, size } = pageParam;
  const res = await axios.get(`${host}/doc`, {
    headers: {
      Authorization: `Bearer ${getCookie("jwt")}`,
    },
    params: {
      page: page,
      size: size,
      userId: getCookie("userId"),
      boardType: dto.type,
      category: dto.category,
    },
  });

  return res.data;
};
