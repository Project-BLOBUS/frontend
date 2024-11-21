import { lazy, Suspense } from "react";
import { Navigate } from "react-router";
import Loading from "../etc/Loading";

const Login = lazy(() => import("../component/LoginComponent"));

const Choice = lazy(() => import("../component/signup/ChoiceComponent"));
const Agree = lazy(() => import("../component/signup/AgreeComponent"));
const GeneralInput = lazy(() =>
  import("../component/signup/GeneralInputComponent")
);
const BusinessInput = lazy(() =>
  import("../component/signup/BusinessInputComponent")
);

const FindId = lazy(() => import("../component/find/FindIdComponent"));
const FindPw = lazy(() => import("../component/find/FindPwComponent"));

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
      path: "findid",
      element: (
        <Suspense fallback={<Loading />}>
          <FindId />
        </Suspense>
      ),
    },
    {
      path: "findpw",
      element: (
        <Suspense fallback={<Loading />}>
          <FindPw />
        </Suspense>
      ),
    },
  ];
};

export default memberRouter;
