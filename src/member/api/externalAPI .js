import axios from "axios";

// export const getAddressList = async (setAddress, regionCode) => {
//   const key = "fbf556c8d8a044b7a60b";
//   const secret = "484c7af49e1c4a2188d9";

//   try {
//     const resForToken = await axios.get(
//       "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json",
//       { params: { consumer_key: key, consumer_secret: secret } }
//     );

//     const resForRegion = await axios.get(
//       "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
//       { params: { accessToken: resForToken.data.result.accessToken } }
//     );

//     const regionList = resForRegion.data.result.map((region) => ({
//       key: region.cd * 1,
//       name: region.addr_name,
//     }));

//     setAddress((prev) => ({
//       ...prev,
//       regionList: regionList,
//     }));

//     const resForCity = await axios.get(
//       "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
//       {
//         params: {
//           accessToken: resForToken.data.result.accessToken,
//           cd: regionCode,
//         },
//       }
//     );

//     const cityList = resForCity.data.result.map((city) => ({
//       key: city.cd * 1,
//       name: city.addr_name,
//     }));

//     setAddress((prev) => ({
//       ...prev,
//       cityList: cityList,
//     }));
//   } catch (error) {
//     console.error("데이터를 불러오는 데 실패했습니다:", error);
//   }
// };

export const checkBusinessCode = async (businessCode) => {
  const serviceKey =
    "EwmP2oanUlpkJWfofdXEssb2YGDaaogKxgemEsM39xdajSXql1xsIAnE/DMLYFSG9Iv06Siy0gmw5hkAAZgyYw==";

  try {
    const { data } = await axios.post(
      `https://api.odcloud.kr/api/nts-businessman/v1/status?serviceKey=${serviceKey}`,
      {
        b_no: [businessCode.replace(/-/g, "")],
      }
    );
    return data.data[0];
  } catch (error) {
    console.error("사업자등록 인증 오류 : ", error);
    throw error;
  }
};
