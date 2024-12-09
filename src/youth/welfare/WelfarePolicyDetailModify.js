import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPolicyById, modifyPolicy } from './WelfareApi'; // API 함수 임포트

const WelfarePolicyDetailModify = () => {
  const navigate = useNavigate();
  const { id: policyId } = useParams(); // URL에서 policyId 추출

  const [policy, setPolicy] = useState({
    policyId: policyId,
    policyName: '',
    policyOverview: '',
    policyContent1: '',
    supportScale: '',
    policyOperatePeriod: '',
    policyDateType: '',
    policyApplicationPeriod: '',
    applicationProcedure: '',
    judgingPresentation: '',
    applicationSite: '',
    submitionDocument: '',
    ageRequirement: '',
    proposerRequirement: '',
    academicBackground: '',
    majorIn: '',
    employmentStatus: '',
    additionalRequirement: '',
    hostOrganization: '',
    hstOrgManagerName: '',
    hstOrgManagerPhone: '',
    operatingAgency: '',
    operAgenManagerName: '',
    operAgenManagerPhone: '',
    referenceSite1: '',
    referenceSite2: '',
    etc: ''
  });


  useEffect(() => {

    fetchPolicyById(policyId).then((data) => setPolicy(data))

    console.log("policy: " + policy.policyId);

  }, [policyId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPolicy(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

//policy를 json으로 만들어서 보내야함
  const handleClickModify = () => { //버튼 클릭시 

    modifyPolicy(policy.policyId, policy).then(data => {
      console.log("modify result: " + data)
    })

    navigate(`/youth/welfare/${policyId}`); //수정한 상세 페이지로 이동
  }

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
          <h1 className="text-3xl font-bold mb-6">
            <input 
              className="w-full border-2 border-gray-500 rounded-md"
              type="text"
              name="policyName"
              value={policy.policyName}
              onChange={handleChange}
            />
          </h1>
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
                  <td>
                    <input
                      className='w-full'
                      type="text"
                      name="policyOverview"
                      value={policy.policyOverview}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">정책 상세 내용</td>
                  <td>
                      <input
                        className='w-full h-full'
                        type="text"
                        name="policyContent1"
                        value={policy.policyContent1}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">지원 규모</td>
                  <td>
                      <input
                        className='w-full'
                        type="text"
                        name="supportScale"
                        value={policy.supportScale}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">사업 운영 기간</td>
                  <td>
                      <input
                        type="text"
                        name="policyOperatePeriod"
                        value={policy.policyOperatePeriod}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">사업 분기</td>
                  <td>
                      <input
                        type="text"
                        name="policyDateType"
                        value={policy.policyDateType}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">신청기간</td>
                  <td>
                      <input
                        type="text"
                        name="policyApplicationPeriod"
                        value={policy.policyApplicationPeriod}
                        onChange={handleChange}
                      />
                  </td>
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
                  <td>
                      <input
                        type="text"
                        name="applicationProcedure"
                        value={policy.applicationProcedure}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">심사 및 발표</td>
                  <td>
                      <input
                        type="text"
                        name="judgingPresentation"
                        value={policy.judgingPresentation}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">신청 사이트</td>
                  <td>
                      <input
                        type="text"
                        name="applicationSite"
                        value={policy.applicationSite}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">제출 서류 내용</td>
                  <td>
                      <input
                        type="text"
                        name="submitionDocument"
                        value={policy.submitionDocument}
                        onChange={handleChange}
                      />
                  </td>
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
                  <td>
                      <input
                        type="text"
                        name="ageRequirement"
                        value={policy.ageRequirement}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">거주지 및 소득</td>
                  <td>
                      <input
                        type="text"
                        name="proposerRequirement"
                        value={policy.proposerRequirement}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">학력</td>
                  <td>
                      <input
                        type="text"
                        name="academicBackground"
                        value={policy.academicBackground}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">전공</td>
                  <td>
                      <input
                        type="text"
                        name="majorIn"
                        value={policy.majorIn}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">취업 상태</td>
                  <td>
                      <input
                        type="text"
                        name="employmentStatus"
                        value={policy.employmentStatus}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">추가 필요 사항</td>
                  <td>
                      <input
                        type="text"
                        name="additionalRequirement"
                        value={policy.additionalRequirement}
                        onChange={handleChange}
                      />
                  </td>
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
                  <td>
                      <input
                        type="text"
                        name="hostOrganization"
                        value={policy.hostOrganization}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">주관 기관 담당자 이름</td>
                  <td>
                      <input
                        type="text"
                        name="hstOrgManagerName"
                        value={policy.hstOrgManagerName}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">주관 기관 담당자 연락처</td>
                  <td>
                      <input
                        type="text"
                        name="hstOrgManagerPhone"
                        value={policy.hstOrgManagerPhone}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">운영 기관</td>
                  <td>
                      <input
                        type="text"
                        name="operatingAgency"
                        value={policy.operatingAgency}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">운영 기관 담당자 이름</td>
                  <td>
                      <input
                        type="text"
                        name="operAgenManagerName"
                        value={policy.operAgenManagerName}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">운영 기관 담당자 연락처</td>
                  <td>
                      <input
                        type="text"
                        name="operAgenManagerPhone"
                        value={policy.operAgenManagerPhone}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold w-1/4 py-2">참고 사이트1</td>
                  <td className=" w-3/4 ">
                      <input
                        type="text"
                        name="referenceSite1"
                        value={policy.referenceSite1}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold py-2">참고 사이트2</td>
                  <td>
                      <input
                        type="text"
                        name="referenceSite2"
                        value={policy.referenceSite2}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold py-2">기타</td>
                  <td>
                      <input
                        type="text"
                        name="etc"
                        value={policy.etc}
                        onChange={handleChange}
                      />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="border-2 border-red-400 h-auto rounded-md pt-4 pb-4 pr-4 mt-[5px]">
          <button
            onClick={() => { handleClickModify() }}
            className="border-2 border-blue-600 ml-2"
          >
            수정하기
          </button>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="border-2 border-red-600"
          >
            {/* 수정 전의 상세 페이지로 이동 */}
            수정취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelfarePolicyDetailModify;