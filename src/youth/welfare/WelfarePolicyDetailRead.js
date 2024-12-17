import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { deletePolicy, fetchPolicyById } from "./WelfareApi";
import { getCookie } from "../../etc/util/cookieUtil";
import ShareModal from "./ShareModal";
import Swal from "sweetalert2";
import BookBtn from "../../member/component/mypage/BookBtn";

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
    return text.split("\n").map((line, index) => (
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
        deletePolicy(policy.policyId)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "삭제되었습니다.",
              showConfirmButton: false,
              timer: 1000,
            });
            navigate(`/youth/welfare`, { state: { searchs } });
          })
          .catch((error) => {
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
          timer: 1500,
        });
      }
    });
  };

  const isValidUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // 프로토콜
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // 도메인 이름
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR IP (v4) 주소
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // 포트 및 경로
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // 쿼리 문자열
        "(\\#[-a-z\\d_]*)?$",
      "i" // 프래그먼트 로케이터
    );
    return !!urlPattern.test(url);
  };

  return (
    <div className="guide-line">
      <h1 className="text-3xl font-bold mb-6 pb-4 border-b-2 border-b-gray-200">
        청년 복지 정책
      </h1>
      <div className="w-full bg-white p-8 rounded-md shadow-md border">
        {/* 정책명 */}
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold mb-3">{policy.policyName}</h2>
          <BookBtn main="청년" sub="복지" targetId={policy.policyId} />
        </div>
        <p className="text-lg mb-6">{policy.policyOverview}</p>
        {/* <div className="flex justify-end">
          <button className="border-2 border-red-600 m-2">즐겨찾기</button>
          <button
            className="border-2 border-red-600 m-2"
            onClick={() => setIsShareModalOpen(true)}
          >
            공유하기
          </button>
        </div> */}

        {/* 정책 설명 */}
        <div className="mb-8">
          <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            정책 설명
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">지원내용</td>
                <td className="leading-6">
                  {replaceNewlinesWithBr(policy.policyContent1)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">사업신청기간</td>
                <td className="leading-6">
                  {replaceNewlinesWithBr(policy.policyApplicationPeriod)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">지원 규모</td>
                <td className="leading-6">
                  {replaceNewlinesWithBr(policy.supportScale)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 지원 대상 */}
        <div className="mb-8">
          <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            지원 대상
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">연령</td>
                <td className="leading-6">
                  {replaceNewlinesWithBr(policy.ageRequirement)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">거주지 및 소득</td>
                <td className="leading-6">
                  {replaceNewlinesWithBr(policy.proposerRequirement)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">학력</td>
                <td className="leading-6">{policy.academicBackground}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">전공</td>
                <td className="leading-6">{policy.majorIn}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">취업상태</td>
                <td className="leading-6">
                  {replaceNewlinesWithBr(policy.employmentStatus)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">추가 세부 사항</td>
                <td className="leading-6">
                  {replaceNewlinesWithBr(policy.additionalRequirement)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">참여제한대상</td>
                <td className="leading-6">
                  {replaceNewlinesWithBr(policy.participationRestriction)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 신청 방법 */}
        <div className="mb-8">
          <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            신청 방법
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">신청방법 및 절차</td>
                <td className="leading-6">
                  {replaceNewlinesWithBr(policy.applicationProcedure)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">심사 및 발표</td>
                <td className="leading-6">
                  {replaceNewlinesWithBr(policy.judgingPresentation)}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">신청 사이트</td>
                <td className="leading-6">
                  {policy.applicationSite &&
                  isValidUrl(policy.applicationSite) ? (
                    <a
                      href={policy.applicationSite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {policy.applicationSite}
                    </a>
                  ) : (
                    <span className="text-gray-500">링크 없음</span>
                  )}
                </td>
              </tr>
              <tr>
                <td className="font-semibold w-1/4 py-2">제출서류</td>
                <td className="leading-6">
                  {replaceNewlinesWithBr(policy.submitionDocument)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 추가 정보 */}
        <div className="mb-8">
          <h3 className="w-full text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
            추가 정보
          </h3>
          <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
            <tbody>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">주관기관</td>
                <td className="leading-6">{policy.hostOrganization}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">주관기관 연락처</td>
                <td className="leading-6">{policy.hstOrgManagerPhone}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">운영기관</td>
                <td className="leading-6">{policy.operatingAgency}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">운영기관 연락처</td>
                <td className="leading-6">{policy.operAgenManagerPhone}</td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">참고 사이트1</td>
                <td className="leading-6">
                  {policy.referenceSite1 &&
                  policy.referenceSite1 !== "null" &&
                  policy.referenceSite1 !== "-" ? (
                    <a
                      href={policy.referenceSite1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {policy.referenceSite1}
                    </a>
                  ) : (
                    <span className="text-gray-500">링크 없음</span>
                  )}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">참고 사이트2</td>
                <td className="leading-6">
                  {policy.referenceSite2 &&
                  policy.referenceSite2 !== "null" &&
                  policy.referenceSite2 !== "-" ? (
                    <a
                      href={policy.referenceSite2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      {policy.referenceSite2}
                    </a>
                  ) : (
                    <span className="text-gray-500">링크 없음</span>
                  )}
                </td>
              </tr>
              <tr className="border-b">
                <td className="font-semibold w-1/4 py-2">첨부파일</td>
                <td className="leading-6">첨부파일 로직 추가 필요</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* 관리자용 수정버튼 */}
        {userRole === "ADMIN" && (
          <div className="w-full text-right">
            <button
              className="w-1/12 py-3 me-1 border rounded-sm bg-gray-50 hover:bg-gray-300 text-gray-600 font-bold transition-colors duration-500"
              onClick={() => {
                handlePolicyModifyClick(policy.policyId);
              }}
            >
              수정
            </button>
            <button
              className="w-1/12 py-3 ms-1 border rounded-sm bg-gray-50 hover:bg-gray-300 text-gray-600 font-bold transition-colors duration-500"
              onClick={() => {
                handleDeleteClick();
              }}
            >
              삭제
            </button>
          </div>
        )}
      </div>
      {/* 이전 페이지 버튼 */}
      <div className="w-full text-center">
        <button
          className="px-10 py-3 border rounded-sm bg-gray-50 hover:bg-gray-300 text-gray-600 font-bold my-10 transition-colors duration-500"
          onClick={handlePreviousPage}
        >
          목록으로
        </button>
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
