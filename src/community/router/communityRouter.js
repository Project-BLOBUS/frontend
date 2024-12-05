import { lazy, Suspense } from "react";
import { Navigate } from "react-router-dom";
import Loading from "../../etc/component/Loading";

const List = lazy(() => import("../component/List"));
const Read = lazy(() => import("../component/Read"));
const Add = lazy(() => import("../component/Add"));
const Modify = lazy(() => import("../component/Modify"));

const communityRouter = () => {
  return [
    {
      path: "",
      element: <Navigate replace to="list" />,
    },
    {
      path: "list",
      element: (
        <Suspense fallback={<Loading />}>
          <List />
        </Suspense>
      ),
    },
    {
      path: "read/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <Read />
        </Suspense>
      ),
    },
    {
      path: "add",
      element: (
        <Suspense fallback={<Loading />}>
          <Add />
        </Suspense>
      ),
    },
    {
      path: "modify/:id",
      element: (
        <Suspense fallback={<Loading />}>
          <Modify />
        </Suspense>
      ),
    },
  ];
};
export default communityRouter;
