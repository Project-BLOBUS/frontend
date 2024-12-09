import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { deletePolicy, fetchPolicyById } from "./WelfareApi";
import { getCookie } from "../../etc/util/cookieUtil";
import ShareModal from "./ShareModal";
import Swal from "sweetalert2";

const WelfarePolicyDetailRead = () => {
  const { id } = useParams(); // URL에서 ID 가져오기
  const location = useLocation();
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const navigate = useNavigate();
  const searchs = location.state?.searchs || {};
  const userRole = getCookie("userRole");

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

    if (location.state?.updated) {
      getPolicy();
    }
  }, [id, location.state?.updated]); // 의존성 배열에 location.state?.updated 포함

  // 페이지 로드 시 스크롤을 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //  목록으로 돌아가기(이전 페이지로 이동)
  const handlePreviousPage = () => {
    const searchs = location.state?.searchs || {};
    const searchParams = new URLSearchParams({
      page: searchs.currentPage + 1,
      ...(searchs.searchKeyword && { keyword: searchs.searchKeyword }),
      category: searchs.selectedCategory,
    });
    navigate(`/youth/welfare?${searchParams.toString()}`);    
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!policy) return <p>No data available.</p>;

  const currentUrl = window.location.href;

  function replaceNewlinesWithBr(text) {
    if (!text) return text;
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  const handlePolicyModifyClick = (policyId) => {
    navigate(`/youth/welfare/modify/${policyId}`, { state: { searchs } });
  };

  const handleDeleteClick = () => {
    Swal.fire({
        icon: "warning",
        title: "삭제",
        text: `[${policy.policyName}] 정책을 삭제 하시겠습니까??`,
        showCancelButton: true,
        confirmButtonText: "삭제",
        cancelButtonText: "취소",
    }).then((res) => {
        if (res.isConfirmed) {
            deletePolicy(policy.policyId).then(() => {
                Swal.fire({
                    icon: "success",
                    title: "삭제되었습니다.",
                    showConfirmButton: false,
                    timer: 1000
                });
                navigate(`/youth/welfare`, { state: { searchs } });
            }).catch((error) => {
                console.error("Failed to delete policy:", error);
                Swal.fire({
                    icon: "error",
                    title: "정책 삭제에 실패했습니다.",
                    text: error.message,
                });
            });
        } else {
            // 취소
            Swal.fire({
                icon: "info",
                title: "삭제가 취소되었습니다.",
                showConfirmButton: false,
                timer: 1500
            });
          }
        });
    };

  return (
    <div>
      <div className="border-2 border-gray-500 rounded-md pt-4 pb-4 pr-4 bg-white">
        <div className="flex items-center space-x-4">
          <p className="text-3xl font-bold">
            청년 복지 정책
          </p>
        </div>
      </div>
      {/* <div className="w-[70%] h-[600px] ml-[15%]  border-2 border-red-600"> */}
      <div className="h-auto flex flex-col mt-1 w-full bg-white rounded-md shadow-md border">
        <div className="border-2 border-gray-500 rounded-md pl-4 pt-4">
          <h1 className="text-3xl font-bold mb-6">{policy.policyName}</h1>
          <div className="flex justify-end">
            <button className="border-2 border-red-600 m-2">즐겨찾기</button>
              <button
                className="border-2 border-red-600 m-2"
                onClick={() => setIsShareModalOpen(true)}
              >
                공유하기
              </button>
          </div>
        </div>
        {/* <div className="border-2 border-blue-400 h-[68%] mt-[2%]"> */}
        <div className="border-2 border-gray-500 rounded-md flex-grow mt-1">
          <div className="mb-8">
            <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
              정책 설명
            </h3>
            <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
              <tbody>
                <tr className="border-b">
                  <td className="font-semibold py-2">정책 소개</td>
                  <td>{policy.policyOverview}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">정책 상세 내용</td>
                  <td>{policy.policyContent1}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">지원 규모</td>
                  <td>{policy.supportScale}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">사업 운영 기간</td>
                  <td>{policy.policyOperatePeriod}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">사업 분기</td>
                  <td>{policy.policyDateType}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">신청기간</td>
                  <td>{policy.policyApplicationPeriod}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-8">
            <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
              신청 방법
            </h3>
            <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
              <tbody>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">신청 절차 내용</td>
                  <td>{policy.applicationProcedure}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">심사 및 발표</td>
                  <td>{policy.judgingPresentation}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">신청 사이트</td>
                  <td>
                    {policy.applicationSite && policy.applicationSite !== 'null' && policy.applicationSite !== '-' ? (
                      <a href={policy.applicationSite} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {policy.applicationSite}
                      </a>
                    ) : (
                      <span className="text-gray-500">
                        링크 없음
                      </span>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">제출 서류 내용</td>
                  <td>{policy.submitionDocument}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-8">
            <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
              지원 대상
            </h3>
            <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
              <tbody>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">연령 요건</td>
                  <td>{policy.ageRequirement}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">거주지 및 소득</td>
                  <td>{policy.proposerRequirement}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">학력</td>
                  <td>{policy.academicBackground}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">전공</td>
                  <td>{policy.majorIn}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">취업 상태</td>
                  <td>{policy.employmentStatus}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">추가 필요 사항</td>
                  <td>{policy.additionalRequirement}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mb-8">
            <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
              추가 정보
            </h3>
            <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
              <tbody>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">주관 기관</td>
                  <td>{policy.hostOrganization}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">주관 기관 담당자 이름</td>
                  <td>{policy.hstOrgManagerName}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">주관 기관 담당자 연락처</td>
                  <td>{policy.hstOrgManagerPhone}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">운영 기관</td>
                  <td>{policy.operatingAgency}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">운영 기관 담당자 이름</td>
                  <td>{policy.operAgenManagerName}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">운영 기관 담당자 연락처</td>
                  <td>{policy.operAgenManagerPhone}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">참고 사이트1</td>
                  <td className=" w-3/4 ">
                   {policy.referenceSite1 && policy.referenceSite1 !== 'null' && policy.referenceSite1 !== '-' ? (
                      <a href={policy.referenceSite1} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {policy.referenceSite1}
                      </a>
                    ) : (
                      <span className="text-gray-500">
                        링크 없음
                      </span>
                    )}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">참고 사이트2</td>
                  <td>
                    {policy.referenceSite2 && policy.referenceSite2 !== 'null' && policy.referenceSite2 !== '-' ? (
                      <a href={policy.referenceSite2} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {policy.referenceSite2}
                      </a>
                    ) : (
                      <span className="text-gray-500">
                        링크 없음
                      </span>
                    )}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold py-2">기타</td>
                  <td>{policy.etc}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-2 border-red-400 h-auto rounded-md pt-4 pb-4 pr-4 mt-[5px]">
          {userRole === "ADMIN" && (
            <button
              onClick={() => {
                handlePolicyModifyClick(policy.policyId);
              }}
              className="border-2 border-blue-600 ml-2"
            >
              수정하기
            </button>
          )}
          {userRole === "ADMIN" && (
            <button
              onClick={() => {
                handleDeleteClick();
              }}
              className="border-2 border-blue-600 ml-2"
            >
              삭제하기
            </button>
          )}
          <button
            onClick={handlePreviousPage}
            className="border-2 border-red-600"
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

export default WelfarePolicyDetailRead;
