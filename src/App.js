import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loading from "./etc/component/Loading";
import memberRouter from "./member/router/memberRouter";
import mypageRouter from "./member/router/mypageRouter";
import youthRouter from "./youth/router/youthRouter";
import communityRouter from "./community/router/communityRouter";

// Header 컴포넌트를 lazy로 불러오기
const MainPage = lazy(() => import("./main/MainPage"));
const AllSearch = lazy(() => import("./main/AllSearch"));
const BLoBusIntro = lazy(() => import("./main/BLoBusIntro"));
const BLoBusWork = lazy(() => import("./main/BLoBusWork"));
const BLoBusNews = lazy(() => import("./main/BLoBusNews"));

const Member = lazy(() => import("./member/page/MemberPage"));
const MyPage = lazy(() => import("./member/page/MyPage"));

const YouthPage = lazy(() => import("./youth/YouthPage"));
const Enterprise = lazy(() => import("./enterprise/Enterprise"));
const Community = lazy(() => import("./community/page/Community"));

const Resource = lazy(() => import("./resource/Resource"));

const AppRoutes = () => (
  <Routes>
    {/* /경로에서 /main으로 리디렉션 */}
    <Route path="/" element={<Navigate to="/main" />} />
    {/* /main 경로로 매핑 */}
    <Route path="/main" element={<MainPage />} />
    {/* /allsearch 통합검색 */}
    <Route path="/allsearch" element={<AllSearch />} />
    {/* /blobusIntro 블로버스 소개 */}
    <Route path="/blobusintro" element={<BLoBusIntro />} />
    {/* /blobusIntro 블로버스 추구하는 일 */}
    <Route path="/blobuswork" element={<BLoBusWork />} />
    {/* /blobusIntro 블로버스 소식 */}
    <Route path="/blobusnews" element={<BLoBusNews />} />

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

    {/* /enterprise 기업 */}
    <Route path="/enterprise" element={<Enterprise />} />
    {/* /comunity 커뮤니티 */}
    <Route path="/community" element={<Community />}>
      {communityRouter().map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Route>
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
