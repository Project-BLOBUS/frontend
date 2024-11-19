import { Suspense, lazy } from "react";
import { Navigate } from "react-router";

const Loading = <div>Loading....</div>;
const Finance = lazy(() => import("../finance/FinancePage"));

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
  ];
};

export default youthRouter;
