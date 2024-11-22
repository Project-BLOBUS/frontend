import axios from "axios";

const API_SERVER_HOST = "http://localhost:8080";
const host = `${API_SERVER_HOST}/member`;

// 로그인
export const login = async (member) => {
  const headers = {
    header: { "Content-Type": "application/x-www-form-urlencoded" },
  };

  const res = await axios.post(`${host}/login`, member, headers);

  return res.data;
};

// 회원가입 - 아이디 중복
export const duplicate = async (member) => {
  const res = await axios.get(
    `${host}/${member.roleName.toLowerCase()}/dup/${member.userId}`
  );

  return res.data;
};

// 회원가입 - 메일 전송
export const sendMail = async (member) => {
  const res = await axios.post(
    `${host}/${member.roleName.toLowerCase()}/send/${member.userId}`
  );

  return res.data;
};

// 회원가입
export const register = async (member) => {
  const res = await axios.post(
    `${host}/${member.roleName.toLowerCase()}/`,
    member
  );

  return res.data;
};

// 아이디 찾기
export const find = async (member) => {
  const res = await axios.get(
    `${host}/${member.roleName.toLowerCase()}/find/${member.name}&${
      member.phoneNum
    }`
  );

  return res.data;
};

// 회원정보 수정 (+비밀번호 변경)
export const modify = async (member) => {
  const res = await axios.put(
    `${host}/${member.roleName.toLowerCase()}/modify/`,
    member
  );

  return res.data;
};

// 회원정보 조회
export const get = async (member, userId) => {
  const res = await axios.get(
    `${host}/${member.roleName.toLowerCase()}/info/${userId}`
  );

  return res.data;
};
