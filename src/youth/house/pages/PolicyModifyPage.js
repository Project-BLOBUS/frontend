import { useParams } from "react-router";
import PolicyModifyComponent from "../components/PolicyModifyComponent";

const PolicyModifyPage = () => {
  const { policyId } = useParams();
  return (
    <>
      <PolicyModifyComponent policyId={policyId} />
    </>
  );
};

export default PolicyModifyPage;
