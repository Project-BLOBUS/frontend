import { useEffect, useState } from "react";
import { policyDetail, policyModify } from "../api/houseApi";
import useCustomMove from "../hooks/useCustomMove";
import { toast } from "react-toastify";

const PolicyModifyComponent = ({ policyId }) => {
  const initState = {
    policyId: 0,
    polyBizSjnm: "",
    polyItcnCn: "",
    sporCn: "",
    rqutPrdCn: "",
    sporScvl: "",
    ageInfo: "",
    prcpCn: "",
    accrRqisCn: "",
    majrRqisCn: "",
    empmSttsCn: "",
    aditRscn: "",
    prcpLmttTrgtCn: "",
    rqutProcCn: "",
    jdgnPresCn: "",
    rqutUrla: "",
    pstnPaprCn: "",
    mngtMson: "",
    cherCtpcCn: "",
    cnsgNmor: "",
    tintCherCtpcCn: "",
    rfcSiteUrla1: "",
    rfcSiteUrla2: "",
  };
  const [policy, setPolicy] = useState(initState);
  const { moveToPolicyRead } = useCustomMove();

  useEffect(() => {
    policyDetail(policyId).then((data) => setPolicy(data));
  }, [policyId]);

  const handleChangePolicy = (e) => {
    policy[e.target.name] = e.target.value;
    setPolicy({ ...policy });
  };

  const handleClickModify = () => {
    // 수정하기 버튼 클릭시 호출
    policyModify(policy).then((data) => {
      toast.success("수정되었습니다.");
      moveToPolicyRead(policyId);
    });
  };

  const renderInputField = (name, value, label, isTextarea = false) => (
    <tr className="border-b">
      <td className="font-semibold w-1/4 py-2">{label}</td>
      <td className="h-full py-2">
        {isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={handleChangePolicy}
            className="w-full p-2 outline-none border rounded resize-none h-full"
            style={{ minHeight: "100%" }} // 부모의 높이에 맞춤
            rows="3"
          ></textarea>
        ) : (
          <input
            name={name}
            type="text"
            value={value}
            onChange={handleChangePolicy}
            className="w-full p-2 outline-none border rounded h-full"
            style={{ minHeight: "100%" }} // 부모의 높이에 맞춤
          />
        )}
      </td>
    </tr>
  );

  return (
    <div className="w-full bg-white p-8 rounded-md shadow-md border">
      <h3 className="text-2xl font-bold text-gray-700 mb-6">정책 수정</h3>
      {/* 정책명 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
          정책명
        </h3>
        <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
          <tbody>
            {renderInputField("polyBizSjnm", policy.polyBizSjnm, "정책명")}
            {renderInputField(
              "polyItcnCn",
              policy.polyItcnCn,
              "정책소개",
              true
            )}
          </tbody>
        </table>
      </div>
      {/* 정책 설명 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
          정책 설명
        </h3>
        <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
          <tbody>
            {renderInputField("sporCn", policy.sporCn, "지원내용", true)}
            {renderInputField("rqutPrdCn", policy.rqutPrdCn, "사업신청기간")}
            {renderInputField("sporScvl", policy.sporScvl, "지원 규모")}
          </tbody>
        </table>
      </div>
      {/* 지원 대상 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
          지원 대상
        </h3>
        <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
          <tbody>
            {renderInputField("ageInfo", policy.ageInfo, "연령")}
            {renderInputField("prcpCn", policy.prcpCn, "거주지 및 소득", true)}
            {renderInputField("accrRqisCn", policy.accrRqisCn, "학력")}
            {renderInputField("majrRqisCn", policy.majrRqisCn, "전공")}
            {renderInputField("empmSttsCn", policy.empmSttsCn, "취업상태")}
            {renderInputField(
              "aditRscn",
              policy.aditRscn,
              "추가 세부 사항",
              true
            )}
            {renderInputField(
              "prcpLmttTrgtCn",
              policy.prcpLmttTrgtCn,
              "참여제한대상"
            )}
          </tbody>
        </table>
      </div>
      {/* 신청 방법 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
          신청 방법
        </h3>
        <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
          <tbody>
            {renderInputField(
              "rqutProcCn",
              policy.rqutProcCn,
              "신청방법 및 절차",
              true
            )}
            {renderInputField("jdgnPresCn", policy.jdgnPresCn, "심사 및 발표")}
            {renderInputField("rqutUrla", policy.rqutUrla, "신청 사이트")}
            {renderInputField(
              "pstnPaprCn",
              policy.pstnPaprCn,
              "제출서류",
              true
            )}
          </tbody>
        </table>
      </div>
      {/* 추가 정보 */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-gray-600 mb-3 p-2 bg-gray-50">
          추가 정보
        </h3>
        <table className="table-auto w-full text-left text-sm text-gray-700 border-t-2 border-b-2">
          <tbody>
            {renderInputField("mngtMson", policy.mngtMson, "주관기관")}
            {renderInputField(
              "cherCtpcCn",
              policy.cherCtpcCn,
              "주관기관 연락처"
            )}
            {renderInputField("cnsgNmor", policy.cnsgNmor, "운영기관")}
            {renderInputField(
              "tintCherCtpcCn",
              policy.tintCherCtpcCn,
              "운영기관 연락처"
            )}
            {renderInputField(
              "rfcSiteUrla1",
              policy.rfcSiteUrla1,
              "참고사이트1"
            )}
            {renderInputField(
              "rfcSiteUrla2",
              policy.rfcSiteUrla2,
              "참고사이트2"
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full text-right">
        <button
          onClick={handleClickModify}
          className="w-1/12 py-3 me-1 border rounded-sm bg-gray-50 hover:bg-gray-300 text-gray-600 font-bold transition-colors duration-500"
        >
          수정
        </button>
        <button
          onClick={() => {
            moveToPolicyRead(policy.policyId);
          }}
          className="w-1/12 py-3 ms-1 border rounded-sm bg-gray-50 hover:bg-gray-300 text-gray-600 font-bold transition-colors duration-500"
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default PolicyModifyComponent;
