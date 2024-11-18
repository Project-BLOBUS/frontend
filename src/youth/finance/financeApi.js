import axiosInstance from "./axiosInstance";

// 모든 정책 가져오기
export const fetchAllPolicies = async () => {
  try {
    const response = await axiosInstance.get("/policies");
    return response.data; // 데이터 반환
  } catch (error) {
    console.error("Failed to fetch policies:", error);
    throw error; // 에러 전달
  }
};

// 특정 ID의 정책 가져오기
export const fetchPolicyById = async (id) => {
  try {
    const response = await axiosInstance.get(`/policies/${id}`);
    return response.data; // 데이터 반환
  } catch (error) {
    console.error(`Failed to fetch policy with ID ${id}:`, error);
    throw error; // 에러 전달
  }
};
