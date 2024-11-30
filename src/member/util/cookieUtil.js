import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (key, value, day) => {
  if (day !== undefined) {
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + day);

    return cookies.set(key, value, { path: "/", expires: expires });
  } else {
    return cookies.set(key, value, { path: "/" });
  }
};

export const getCookie = (key) => {
  return cookies.get(key);
};

export const removeCookie = (key, path = "/") => {
  cookies.remove(key, { path });
};
