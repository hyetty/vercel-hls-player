import { useEffect, useRef } from "react";
import Hls from "hls.js";

const Home = () => {
  const videoRef = useRef(null);
  const videoSrc = "https://wqqerweashmqmcnkdpmu.supabase.co/storage/v1/object/public/woori/output.m3u8"; // Supabase URL

  useEffect(() => {
    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false }); // Web Worker 비활성화
      hls.loadSource(videoSrc);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        console.log("✅ HLS 파일이 정상적으로 로드되었습니다.");
        videoRef.current.play();
      });

      hls.on(Hls.Events.ERROR, function(event, data) {
        console.error("🚨 HLS.js Error:", data);
      });

      return () => {
        hls.destroy();
      };
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      videoRef.current.src = videoSrc;
      videoRef.current.addEventListener("loadedmetadata", () => {
        console.log("✅ HLS가 직접 지원됩니다.");
        videoRef.current.play();
      });
    } else {
      console.error("🚨 HLS를 지원하지 않는 브라우저입니다.");
    }
  }, []);

  return (
    <div>
      <h1>HLS Video Streaming</h1>
      <video ref={videoRef} controls width="640" height="360" />
    </div>
  );
};

export default Home;
