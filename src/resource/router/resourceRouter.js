import { Suspense, lazy } from "react";
import { Navigate } from "react-router";

// 로딩 중 표시할 컴포넌트
const Loading = <div>Loading....</div>;

// CulturePage 컴포넌트를 lazy 로딩
const CulturePage = lazy(() => import("../page/CultureListPage"));
const SightseePage = lazy(() => import("../page/SightseeListPage"));

const resourceRouter = () => {
  return [
    { path: "", element: <Navigate replace to="culture" /> },
    {
      path: "culture", // 이 경로에 대해 CulturePage를 렌더링
      element: (
        <Suspense fallback={Loading}>
          <CulturePage />
        </Suspense>
      ),
    },
    {
      path: "sightsee",
      element: (
        <Suspense fallback={Loading}>
          <SightseePage />
        </Suspense>
      ),
    },
  ];
};

export default resourceRouter;
