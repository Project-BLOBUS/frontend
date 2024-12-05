import { Suspense, lazy } from "react";
import { Navigate } from "react-router";
import jobRouter from "./jobRouter";
import houseRouter from "./houseRouter";

const Loading = <div>Loading....</div>;
const JobMain = lazy(() => import("../job/pages/MainPage"));
const HouseMain = lazy(() => import("../house/pages/MainPage"));
const Welfare = lazy(() => import("../welfare/WelfarePage"));
const Education = lazy(() => import("../education/EducationPage"));
const WelfarePolicyDetail = lazy(() =>
  import("../welfare/WelfarePolicyDetail")
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
      path: "welfare",
      element: (
        <Suspense fallback={Loading}>
          <Welfare />
        </Suspense>
      ),
    },
    {
      path: "welfare/:id",
      element: (
        <Suspense fallback={Loading}>
          <WelfarePolicyDetail />
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
