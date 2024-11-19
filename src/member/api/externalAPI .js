import axios from "axios";

const keySGIS = "fbf556c8d8a044b7a60b";
const secretSGIS = "484c7af49e1c4a2188d9";

export const addressData = async (setAddress, regionCode) => {
  try {
    const resForToken = await axios.get(
      "https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json",
      { params: { consumer_key: keySGIS, consumer_secret: secretSGIS } }
    );

    const resForRegion = await axios.get(
      "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
      { params: { accessToken: resForToken.data.result.accessToken } }
    );

    const regionList = resForRegion.data.result.map((region) => ({
      key: region.cd * 1,
      name: region.addr_name,
    }));

    setAddress((prev) => ({
      ...prev,
      regionList: regionList,
    }));

    const resForCity = await axios.get(
      "https://sgisapi.kostat.go.kr/OpenAPI3/addr/stage.json",
      {
        params: {
          accessToken: resForToken.data.result.accessToken,
          cd: regionCode,
        },
      }
    );

    const cityList = resForCity.data.result.map((city) => ({
      key: city.cd * 1,
      name: city.addr_name,
    }));

    setAddress((prev) => ({
      ...prev,
      cityList: cityList,
    }));
  } catch (error) {
    console.error("데이터를 불러오는 데 실패했습니다:", error);
  }
};
