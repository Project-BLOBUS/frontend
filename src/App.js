import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import youthRouter from "./youth/router/youthRouter";

// Header 컴포넌트를 lazy로 불러오기
// const Header = lazy(() => import('./components/Header'));
// const Footer = lazy(() => import('./components/Footer'));
const MainPage = lazy(() => import("./main/MainPage"));
const YouthPage = lazy(() => import("./youth/YouthPage"));
const Enterprise = lazy(() => import("./enterprise/Enterprise"));
const Comunity = lazy(() => import("./community/Community"));
const Resources = lazy(() => import("./resource/Resource"));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/main" />} />{" "}
    {/* /경로에서 /main으로 리디렉션 */}
    {/* /main 경로로 매핑 */}
    <Route path="/main" element={<MainPage />} />
    {/* /youth 청년 */}
    <Route path="/youth" element={<YouthPage />}>
      {youthRouter().map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Route>
    <Route path="/enterprise" element={<Enterprise />} />{" "}
    {/* /enterprise 기업 */}
    {/* /comunity 커뮤니티 */}
    <Route path="/comunity" element={<Comunity />} />
    {/* /resource 자원 */}
    <Route path="/resource" element={<Resources />} />
    {/* <Route path="/head" element={<Header />} /> */}
    {/* <Route path="/footer" element={<Footer />} /> */}
  </Routes>
);

const LoadingFallback = () => <div>Loading...</div>;

const App = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
};

export default App;
