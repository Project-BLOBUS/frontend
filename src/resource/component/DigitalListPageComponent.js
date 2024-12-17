import React, { useState, useEffect } from "react";
import styles from "../css/Digital.module.css";

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

  const [currentCity, setCurrentCity] = useState(cities[0]);
  const [isMuted, setIsMuted] = useState(true); // 초기 음소거 상태
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const onYouTubeIframeAPIReady = () => {
      const iframePlayer = new window.YT.Player("videoPlayer", {
        events: {
          onReady: (event) => {
            const playerInstance = event.target;
            setPlayer(playerInstance); // player가 준비된 후 setPlayer로 설정

            if (isMuted) {
              playerInstance.mute(); // 음소거
            } else {
              playerInstance.unMute(); // 음소거 해제
            }
            playerInstance.playVideo(); // 영상 시작
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(0);
              event.target.playVideo();
            }
          },
        },
      });
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;
      document.body.appendChild(tag);
    } else {
      onYouTubeIframeAPIReady();
    }
  }, [isMuted]); // isMuted 상태가 변경될 때마다 player를 초기화

  const toggleSound = () => {
    if (!player) {
      console.error("Player is not ready!");
      return; // player가 준비되지 않았을 경우 실행하지 않음
    }

    if (isMuted) {
      player.unMute();
    } else {
      player.mute();
    }
    setIsMuted(!isMuted);
  };

  const changeVideo = (city) => {
    if (!player) {
      console.error("Player is not ready!");
      return;
    }

    const videoId = city.url.split("/embed/")[1].split("?")[0];
    player.loadVideoById(videoId);

    setTimeout(() => {
      if (isMuted) {
        player.mute();
      } else {
        player.unMute();
      }
    }, 1000);

    setCurrentCity(city);
  };

  return (
    <div
      className={styles.container}
      style={{
        width: "99.5vw",
        height: "100vh",
        left: "-22%",
        display: "flex",
      }}
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
