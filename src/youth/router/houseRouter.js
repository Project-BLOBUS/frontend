import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading....</div>;
const PolicyList = lazy(() => import("../house/pages/PolicyListPage"));
const PolicyRead = lazy(() => import("../house/pages/PolicyReadPage"));

const houseRouter = () => {
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
      path: "policyRead",
      element: (
        <Suspense fallback={Loading}>
          <PolicyRead />
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
  ];
};

export default houseRouter;
