import { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import Loading from "../etc/Loading";

const Login = lazy(() => import("../component/login/Login"));

const Choice = lazy(() => import("../component/signup/Choice"));
const Agree = lazy(() => import("../component/signup/Agree"));
const GeneralInput = lazy(() => import("../component/signup/GeneralInput"));
const BusinessInput = lazy(() => import("../component/signup/BusinessInput"));

const FindId = lazy(() => import("../component/find/FindId"));
const FindPw = lazy(() => import("../component/find/FindPw"));

const memberRouter = () => {
  return [
    {
      path: "login",
      element: (
        <Suspense fallback={<Loading />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "signup",
      element: <Navigate replace to="choice" />,
    },
    {
      path: "signup/choice",
      element: (
        <Suspense fallback={<Loading />}>
          <Choice />
        </Suspense>
      ),
    },
    {
      path: "signup/agree/:role",
      element: (
        <Suspense fallback={<Loading />}>
          <Agree />
        </Suspense>
      ),
    },
    {
      path: "signup/input/general",
      element: (
        <Suspense fallback={<Loading />}>
          <GeneralInput />
        </Suspense>
      ),
    },
    {
      path: "signup/input/business",
      element: (
        <Suspense fallback={<Loading />}>
          <BusinessInput />
        </Suspense>
      ),
    },
    {
      path: "find/id",
      element: (
        <Suspense fallback={<Loading />}>
          <FindId />
        </Suspense>
      ),
    },
    {
      path: "find/pw",
      element: (
        <Suspense fallback={<Loading />}>
          <FindPw />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
