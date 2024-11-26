import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy Loading 컴포넌트
const MainPage = lazy(() => import("./main/MainPage"));
const YouthPage = lazy(() => import("./youth/YouthPage"));
const Enterprise = lazy(() => import("./enterprise/Enterprise"));
const Community = lazy(() => import("./community/component/Listcomponent"));
const Resources = lazy(() => import("./resource/Resource"));
const ListComponent = lazy(() =>
  import("../src/community/component/Listcomponent")
);
const AddComponent = lazy(() =>
  import("../src/community/component/Addcomponent")
);
const DetailComponent = lazy(() =>
  import("../src/community/component/Detailcomponent")
);

const LoadingFallback = () => <div>Loading...</div>;

// 더미 게시글 데이터
const initialPosts = [
  {
    id: 1,
    title: "첫 번째 게시글",
    content: "첫 번째 게시글 내용입니다.",
    email: "example@gmail.com",
    createdAt: "2024-11-21",
  },
  {
    id: 2,
    title: "두 번째 게시글",
    content: "두 번째 게시글 내용입니다.",
    email: "user@gmail.com",
    createdAt: "2024-11-20",
  },
];

const App = () => {
  const [posts, setPosts] = useState(initialPosts); // 게시글 상태 관리

  // 게시글 추가 함수
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* 기본 페이지 리디렉션 */}
          <Route path="/" element={<Navigate to="/main" />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/youth" element={<YouthPage />} />
          <Route path="/enterprise" element={<Enterprise />} />
          <Route path="/community" element={<Community />} />
          <Route path="/resource" element={<Resources />} />

          {/* 커뮤니티 관련 라우팅 */}
          <Route path="/community" element={<ListComponent posts={posts} />} />
          <Route path="/add" element={<AddComponent addPost={addPost} />} />
          <Route
            path="/detail/:id"
            element={<DetailComponent posts={posts} />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
