import { Suspense, lazy } from "react";
import jobRouter from "./jobRouter";
import houseRouter from "./houseRouter";

const Loading = <div>Loading....</div>;
const JobMain = lazy(() => import("../job/pages/MainPage"));
const HouseMain = lazy(() => import("../house/pages/MainPage"));
const Finance = lazy(() => import("../finance/FinancePage"));
const Education = lazy(() => import("../education/EducationPage"));
const FinancePolicyDetail = lazy(() =>
  import("../finance/FinancePolicyDetail")
);
const EducationPolicyDetail = lazy(() =>
  import("../education/EducationPolicyDetail")
);

const youthRouter = () => {
  return [
    {
      path: "job",
      element: (
        <Suspense fallback={Loading}>
          <JobMain />
        </Suspense>
      ),
      children: jobRouter(),
    },
    {
      path: "house",
      element: (
        <Suspense fallback={Loading}>
          <HouseMain />
        </Suspense>
      ),
      children: houseRouter(),
    },
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
