import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loading from "./member/etc/Loading";
import memberRouter from "./member/router/memberRouter";
import mypageRouter from "./member/router/mypageRouter";

// Header 컴포넌트를 lazy로 불러오기
// const Header = lazy(() => import('./components/Header'));
// const Footer = lazy(() => import('./components/Footer'));
const Main = lazy(() => import("./main/MainPage"));
const Member = lazy(() => import("./member/page/MemberPage"));
const MyPage = lazy(() => import("./member/page/MyPage"));
const Youth = lazy(() => import("./youth/YouthPage"));
const Enterprise = lazy(() => import("./enterprise/Enterprise"));
const Community = lazy(() => import("./community/Community"));
const Resource = lazy(() => import("./resource/Resource"));

const AppRoutes = () => (
  <Routes>
    {/* /경로에서 /main으로 리디렉션 */}
    <Route path="/" element={<Navigate to="/main" />} />
    {/* /member 경로로 매핑 */}
    <Route path="/member" element={<Member />}>
      {memberRouter().map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Route>
    {/* /mypage 경로로 매핑 */}
    <Route path="/mypage" element={<MyPage />}>
      {mypageRouter().map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Route>
    {/* /main 경로로 매핑 */}
    <Route path="/main" element={<Main />} />
    {/* /youth 청년 */}
    <Route path="/youth" element={<Youth />} />
    {/* /enterprise 기업 */}
    <Route path="/enterprise" element={<Enterprise />} />
    {/* /comunity 커뮤니티 */}
    <Route path="/community" element={<Community />} />
    {/* /resource 자원 */}
    <Route path="/resource" element={<Resource />} />
  </Routes>
);

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
};

export default App;
