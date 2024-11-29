import { Suspense, lazy } from "react";
import { Navigate } from "react-router";

const Loading = <div>Loading....</div>;
const Finance = lazy(() => import("../finance/FinancePage"));
const Education = lazy(() => import("../education/EducationPage"));
const FinancePolicyDetail = lazy(() => import("../finance/FinancePolicyDetail"));
const EducationPolicyDetail = lazy(() => import("../education/EducationPolicyDetail"));

const youthRouter = () => {
  return [
    // {
    //   path: "",
    //   element: <Navigate replace to="Job" />,
    // },
    { 
      path: "finance",
      element: (
        <Suspense fallback={Loading}>
          <Finance />
        </Suspense>
      ),
    },
    {
      path: "finance/:id",
      element: (
        <Suspense fallback={Loading}>
          <FinancePolicyDetail />
        </Suspense>
      ),
    },
    { 
      path: "education",
      element: (
        <Suspense fallback={Loading}>
          <Education />
        </Suspense>
      ),
    },
    {
      path: "education/:id",
      element: (
        <Suspense fallback={Loading}>
          <EducationPolicyDetail />
        </Suspense>
      ),
    },
  ];
};

export default youthRouter;