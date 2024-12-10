import React, { useState, useEffect } from "react";
import styles from "../css/Digital.module.css";
// import "../css/Digital.css";

function DigitalPage() {
  const cities = [
    {
      name: "Busan",
      url: "https://www.youtube.com/embed/F9nuCjA-cxU?enablejsapi=1&autoplay=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=F9nuCjA-cxU",
    },
    {
      name: "Busan, Youth Center",
      url: "https://www.youtube.com/embed/o7C7TCJMMNg?enablejsapi=1&autoplay=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=o7C7TCJMMNg",
    },
    {
      name: "Busan, G-Star",
      url: "https://www.youtube-nocookie.com/embed/LxP_IfH2H3A?enablejsapi=1&autoplay=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=LxP_IfH2H3A",
    },
    {
      name: "Busan, Film Festival",
      url: "https://www.youtube-nocookie.com/embed/MBWRn6BZoY0?enablejsapi=1&autoplay=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=MBWRn6BZoY0",
    },
    {
      name: "Busan, Busan Rules - BTS",
      url: "https://www.youtube.com/embed/NLxgGRElMbs?enablejsapi=1&autoplay=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=NLxgGRElMbs",
    },
    {
      name: "Busan, Boogie",
      url: "https://www.youtube.com/embed/gySTfYBTv9M?enablejsapi=1&autoplay=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=gySTfYBTv9M",
    },
  ];

  const [currentCity, setCurrentCity] = useState(cities[0]); // 영상 링크
  const [isMuted, setIsMuted] = useState(true); // 초기 상태를 음소거로 설정
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      console.log("YouTube API Ready");
      const iframePlayer = new window.YT.Player("videoPlayer", {
        events: {
          onReady: (event) => {
            console.log("player Ready");
            if (isMuted) {
              event.target.mute();
            } else {
              event.target.unMute();
            }
            event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(0); // 영상의 처음으로 이동
              event.target.playVideo(); // 반복 재생
            }
          },
        },
      });
      setPlayer(iframePlayer);
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      document.body.appendChild(tag);
    } else {
      onYouTubeIframeAPIReady();
    }
  }, []);

  const toggleSound = () => {
    if (!player) return; // player가 준비되지 않은 경우 호출 방지
    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  const changeVideo = (city) => {
    if (!player || typeof player.loadVideoById !== "function") {
      console.error("Player is not ready!");
      return;
    } // player가 준비되지 않은 경우 호출 방지

    const videoId = city.url.split("/embed/")[1].split("?")[0];
    player.loadVideoById(videoId);

    // 비디오 로드 후 음소거 상태를 재설정
    setTimeout(() => {
      if (isMuted) {
        player.mute(); // 음소거 유지
      } else {
        player.unMute(); // 활성화 상태 유지
      }
    }, 1000); // 약간의 딜레이를 주어 API가 완전히 적용된 후 음소거 상태를 설정

    setCurrentCity(city);
  };

  return (
    <div
      className={styles.container}
      style={{ width: "99vw", height: "100vh", left: "-22%", display: "flex" }}
    >
      <div
        className={styles.sidebar}
        style={{
          width: "250px",
          background: "rgba(0,0,0,0.8)",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2 style={{ margin: "0 0 20px 0" }}>Busan Introduction</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cities.map((city, index) => (
            <li
              key={index}
              onClick={() => changeVideo(city)}
              style={{
                padding: "10px",
                cursor: "pointer",
                background: "rgba(255,255,255,0.2)",
                marginBottom: "10px",
                borderRadius: "5px",
              }}
            >
              {city.name}
            </li>
          ))}
        </ul>
        <div
          className={styles.toggleSound}
          onClick={toggleSound}
          style={{ marginTop: "20px" }}
        >
          <input
            type="checkbox"
            checked={!isMuted}
            readOnly
            style={{ marginRight: "10px" }}
          />
          <label>City sounds</label>
        </div>
      </div>
      <div className={styles.content} style={{ flex: 1, position: "relative" }}>
        <iframe
          id="videoPlayer"
          width="100%"
          height="100%"
          className={styles.iframe}
          src={currentCity.url}
          allow="autoplay; fullscreen"
          allowFullScreen
          title="City Walks"
          style={{ border: "none" }}
        ></iframe>
      </div>
    </div>
  );
}

export default DigitalPage;
