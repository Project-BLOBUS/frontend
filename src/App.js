import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy } from "react";
import axios from "axios";

// Lazy Loading 컴포넌트
const MainPage = lazy(() => import("./main/MainPage"));
const YouthPage = lazy(() => import("./youth/YouthPage"));
const Enterprise = lazy(() => import("./enterprise/Enterprise"));
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

const App = () => {
  const [posts, setPosts] = useState([]); // 게시글 상태 관리

  // 게시글 데이터 불러오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/community"); // 백엔드에서 데이터 가져오기
        setPosts(response.data);
      } catch (error) {
        console.error("게시글 데이터를 불러오는데 실패했습니다.", error);
      }
    };
    fetchPosts();
  }, []);

  // 게시글 추가 함수
  const addPost = async (newPost) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/community",
        newPost
      ); // 새로운 게시글 추가
      setPosts([response.data, ...posts]); // 새 데이터 추가 후 상태 업데이트
    } catch (error) {
      console.error("게시글 추가에 실패했습니다.", error);
    }
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
          <Route path="/resource" element={<Resources />} />

          {/* 커뮤니티 관련 라우팅 */}
          <Route path="/community" element={<ListComponent posts={posts} />} />
          <Route
            path="/community/add"
            element={<AddComponent addPost={addPost} />}
          />
          <Route
            path="/community/detail/:id"
            element={<DetailComponent posts={posts} />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
