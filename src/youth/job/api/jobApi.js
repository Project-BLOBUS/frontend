import axios from "axios";
export const API_SERVER_HOST = "http://localhost:8080";
const prefix = `${API_SERVER_HOST}/api/youth/job`;

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
export const policyModify = async (job) => {
  const res = await axios.post(`${prefix}/policyRead/${job.policyId}`, job);
  return res.data;
};

// 정책현황 - 삭제
export const policyRemove = async (policyId) => {
  const res = await axios.delete(`${prefix}/policyRead/${policyId}`);
  return res.data;
};
