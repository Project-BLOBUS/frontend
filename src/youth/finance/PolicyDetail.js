import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { fetchPolicyById } from "./FinanceApi";
import ShareModal from "./ShareModal";

const PolicyDetail = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  // const location = useLocation();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getPolicy = async () => {
      try {
        const data = await fetchPolicyById(id); // API 호출
        setPolicy(data);
      } catch (err) {
        setError("Failed to load policy.");
      } finally {
        setLoading(false);
      }
    };

    getPolicy();
  }, [id]);

  // //  목록으로 돌아가기(이전 페이지로 이동)
  // const handlePreviousPage = () => {
  //   const searchs = location.state?.searchs || {};
  //   const searchParams = new URLSearchParams({
  //     page: searchs.currentPage + 1,
  //     ...(searchs.searchKeyword && { keyword: searchs.searchKeyword }),
  //     category: searchs.selectedCategory,
  //   });
  //   navigate(`/youth/finance?${searchParams.toString()}`);    
  // };
  // ==> 위에꺼는 그냥 버튼에다가 
  // onClick={() => {
  //   navigate(-1);
  // }}
  // 이거 넣어주는걸로 대체됨

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!policy) return <p>No data available.</p>;

  const currentUrl = window.location.href;

  return (
    <div>
      <div className="w-[70%] h-[600px] ml-[15%]  border-2 border-red-600">
        <div className="border-2 border-blue-400 h-[70px]">
          <h1>{policy.title}</h1>
          <button className="border-2 border-red-600 m-2">즐겨찾기</button>
          <button
            className="border-2 border-red-600 m-2"
            onClick={() => setIsShareModalOpen(true)}
          >
            공유하기
          </button>
        </div>

        <div className="border-2 border-blue-400 h-[68%] mt-[2%]">
          <p>{policy.overview}</p>
          <p>
            Application Period: {policy.applicationPeriodStart} to {policy.applicationPeriodEnd}
          </p>
          <p>Contact Info: {policy.contactInfo}</p>
          <p>Contact Phone: {policy.contactPhone}</p>
        </div>

        <div className="w-[200px] h-[20px] ml-[40%] mt-[5px]">
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="border-2 border-red-600 m-2"
          >
            목록으로 돌아가기
          </button>
        </div>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={currentUrl}
      />

    </div>
  );
};

export default PolicyDetail;
