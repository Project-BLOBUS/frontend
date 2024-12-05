import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const PolicyList = lazy(() => import("../job/pages/PolicyListPage"));
const PolicyRead = lazy(() => import("../job/pages/PolicyReadPage"));
const InfoList = lazy(() => import("../job/pages/InfoListPage"));
const InfoRead = lazy(() => import("../job/pages/InfoReadPage"));

const jobRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace to="policyList" />,
    },
    {
      path: "policyList",
      element: (
        <Suspense fallback={Loading}>
          <PolicyList />
        </Suspense>
      ),
    },
    {
      path: "policyRead/:policyId",
      element: (
        <Suspense fallback={Loading}>
          <PolicyRead />
        </Suspense>
      ),
    },
    {
      path: "infoList",
      element: (
        <Suspense fallback={Loading}>
          <InfoList />
        </Suspense>
      ),
    },
    {
      path: "infoRead",
      element: (
        <Suspense fallback={Loading}>
          <InfoRead />
        </Suspense>
      ),
    },
  ];
};

export default jobRouter;
