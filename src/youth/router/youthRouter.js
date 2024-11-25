import { Suspense, lazy } from "react";
import jobRouter from "./jobRouter";
import houseRouter from "./houseRouter";

const Loading = <div>Loading....</div>;
const JobMain = lazy(() => import("../job/pages/MainPage"));
const HouseMain = lazy(() => import("../house/pages/MainPage"));

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
  ];
};

export default youthRouter;
