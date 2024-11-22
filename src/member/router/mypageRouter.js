import { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import Loading from "../etc/Loading";

const Info = lazy(() => import("../component/mypage/Info"));
const InfoModify = lazy(() => import("../component/mypage/InfoMofiy"));

const mypageRouter = () => {
  return [
    { path: "", element: <Navigate replace to="custom" /> },
    {
      path: "custom",
      element: <Suspense fallback={<Loading />}></Suspense>,
    },
    {
      path: "bookmark",
      element: <Suspense fallback={<Loading />}></Suspense>,
    },
    {
      path: "doc",
      element: <Suspense fallback={<Loading />}></Suspense>,
    },
    {
      path: "info",
      element: (
        <Suspense fallback={<Loading />}>
          <Info />
        </Suspense>
      ),
    },
    {
      path: "info/modify",
      element: (
        <Suspense fallback={<Loading />}>
          <InfoModify />
        </Suspense>
      ),
    },
  ];
};

export default mypageRouter;
