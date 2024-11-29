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
// const Footer = lazy(() => import('./main/Footer'));
const MainPage = lazy(() => import("./main/MainPage"));
const YouthPage = lazy(() => import("./youth/YouthPage"));
const Enterprise = lazy(() => import("./enterprise/Enterprise"));
const Comunity = lazy(() => import("./community/Community"));
const Resources = lazy(() => import("./resource/Resources"));
const AllSearch = lazy(() => import("./main/AllSearch"));
const BLoBusIntro = lazy(() => import("./main/BLoBusIntro"));
const BLoBusWork = lazy(() => import("./main/BLoBusWork"));
const BLoBusNews = lazy(() => import("./main/BLoBusNews"));

const AppRoutes = () => (
  <Routes>
    {/* /main 경로로 매핑 */}
    <Route path="/" element={<Navigate to="/main" />} />
    <Route path="/main" element={<MainPage />} />
    {/* /youth 청년 */}
    <Route path="/youth" element={<YouthPage />}>
      {youthRouter().map((route, index) => (
        <Route key={index} path={route.path} element={route.element}>
          {route.children?.map((child, childIndex) => (
            <Route key={childIndex} path={child.path} element={child.element} />
          ))}
        </Route>
      ))}
    </Route>
    <Route path="/enterprise" element={<Enterprise />} />{" "}
    {/* /enterprise 기업 */}
    <Route path="/enterprise" element={<Enterprise />} />
    {/* /comunity 커뮤니티 */}
    <Route path="/comunity" element={<Comunity />} />
    {/* /resource 자원 */}
    <Route path="/resources" element={<Resources />} />
    {/* /allsearch 통합검색 */}
    <Route path="/allsearch" element={<AllSearch />} />
    {/* /blobusIntro 블로버스 소개 */}
    <Route path="/blobusintro" element={<BLoBusIntro />} />
    {/* /blobusIntro 블로버스 추구하는 일 */}
    <Route path="/blobuswork" element={<BLoBusWork />} />
    {/* /blobusIntro 블로버스 소식 */}
    <Route path="/blobusnews" element={<BLoBusNews />} />
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
