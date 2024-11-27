import { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import Loading from "../etc/Loading";

const Custom = lazy(() => import("../component/mypage/Custom"));
const Bookmark = lazy(() => import("../component/mypage/Bookmark"));
const Document = lazy(() => import("../component/mypage/Document"));
const Info = lazy(() => import("../component/mypage/Info"));
const InfoModify = lazy(() => import("../component/mypage/InfoMofiy"));

const mypageRouter = () => {
  return [
    { path: "", element: <Navigate replace to="custom" /> },
    { path: "custom", element: <Navigate replace to="list" /> },
    {
      path: "custom/list",
      element: (
        <Suspense fallback={<Loading />}>
          <Custom />
        </Suspense>
      ),
    },
    { path: "bookmark", element: <Navigate replace to="list" /> },
    {
      path: "bookmark/list",
      element: (
        <Suspense fallback={<Loading />}>
          <Bookmark />
        </Suspense>
      ),
    },
    { path: "doc", element: <Navigate replace to="list" /> },
    {
      path: "doc/list",
      element: (
        <Suspense fallback={<Loading />}>
          <Document />
        </Suspense>
      ),
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
