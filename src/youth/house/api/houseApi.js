import axios from "axios";
import { API_SERVER_HOST } from "../../job/api/jobApi";
const prefix = `${API_SERVER_HOST}/api/youth/house`;

export const policyList = async ({
  page,
  size,
  policyStsType,
  searchTerm,
  filterType,
}) => {
  const res = await axios.get(`${prefix}/policyList`, {
    params: {
      page: page,
      size: size,
      policyStsType: policyStsType,
      searchTerm: searchTerm,
      filterType: filterType,
    },
  });
  return res.data;
};

// 정책현황 - 정책디테일 가져오기
export const policyDetail = async (policyId) => {
  const res = await axios.get(`${prefix}/policyRead/${policyId}`);
  return res.data;
};

// 정책현황 - 수정
export const policyModify = async (house) => {
  const res = await axios.post(`${prefix}/policyRead/${house.policyId}`, house);
  return res.data;
};

// 정책현황 - 삭제
export const policyRemove = async (policyId) => {
  const res = await axios.delete(`${prefix}/policyRead/${policyId}`);
  return res.data;
};
