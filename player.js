import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false }); // Web Worker 비활성화 (Neocities CSP 문제 해결)
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoRef.current.play();
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSrc;
    }
  }, [videoSrc]);

  // ✅ **캡처 방지 & 개발자 도구 차단**
  useEffect(() => {
    const blockDevTools = (e) => {
      if (e.key === "F12" || (e.ctrlKey && e.shiftKey && e.key === "I")) {
        e.preventDefault();
        alert("개발자 도구 사용이 제한되었습니다.");
      }
    };

    const blockPrintScreen = (e) => {
      if (e.key === "PrintScreen") {
        navigator.clipboard.writeText(""); // 클립보드에 빈값 저장
        alert("스크린샷이 차단되었습니다.");
      }
    };

    const detectScreenRecording = () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices.getDisplayMedia({ video: true }).then(() => {
          alert("화면 녹화가 감지되었습니다. 재생을 중지합니다.");
          videoRef.current.pause();
        }).catch(() => {});
      }
    };

    document.addEventListener("keydown", blockDevTools);
    document.addEventListener("keyup", blockPrintScreen);
    setInterval(detectScreenRecording, 2000); // 2초마다 녹화 감지

    return () => {
      document.removeEventListener("keydown", blockDevTools);
      document.removeEventListener("keyup", blockPrintScreen);
    };
  }, []);

  return <video ref={videoRef} controls width="640" height="360" />;
};

export default VideoPlayer;
