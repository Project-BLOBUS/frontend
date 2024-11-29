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
import youthRouter from "./youth/router/youthRouter";

// Header 컴포넌트를 lazy로 불러오기
const MainPage = lazy(() => import("./main/MainPage"));
const Member = lazy(() => import("./member/page/MemberPage"));
const MyPage = lazy(() => import("./member/page/MyPage"));
const YouthPage = lazy(() => import("./youth/YouthPage"));
const Enterprise = lazy(() => import("./enterprise/Enterprise"));
const Community = lazy(() => import("./community/Community"));
const Resource = lazy(() => import("./resource/Resource"));
const ListComponent = lazy(() =>
  import("../src/community/component/Listcomponent")
);
const AddComponent = lazy(() =>
  import("../src/community/component/Addcomponent")
);
const DetailComponent = lazy(() =>
  import("../src/community/component/Detailcomponent")
);
const AllSearch = lazy(() => import("./main/AllSearch"));
const BLoBusIntro = lazy(() => import("./main/BLoBusIntro"));
const BLoBusWork = lazy(() => import("./main/BLoBusWork"));
const BLoBusNews = lazy(() => import("./main/BLoBusNews"));

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

    {/* /community 커뮤니티 */}
    <Route path="/community" element={<ListComponent />} />
    <Route path="/community/add" element={<AddComponent />} />
    <Route path="/community/detail/:id" element={<DetailComponent />} />

    {/* /resource 자원 */}
    <Route path="/resource" element={<Resource />} />
  </Routes>
);

const App = () => {
  // const [posts, setPosts] = useState([]); // 게시글 상태 관리

  // // 게시글 데이터 불러오기
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/api/community"); // 백엔드에서 데이터 가져오기
  //       setPosts(response.data);
  //     } catch (error) {
  //       console.error("게시글 데이터를 불러오는데 실패했습니다.", error);
  //     }
  //   };
  //   fetchPosts();
  // }, []);

  // // 게시글 추가 함수
  // const addPost = async (newPost) => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:8080/api/community",
  //       newPost
  //     ); // 새로운 게시글 추가
  //     setPosts([response.data, ...posts]); // 새 데이터 추가 후 상태 업데이트
  //   } catch (error) {
  //     console.error("게시글 추가에 실패했습니다.", error);
  //   }
  // };

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
};

export default App;
