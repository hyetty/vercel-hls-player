import React from "react";
import VideoPlayer from "./player";

const Home = () => {
  const videoUrl = "https://wqqerweashmqmcnkdpmu.supabase.co/storage/v1/object/public/woori/output.m3u8"; // Supabase URL

  return (
    <div>
      <h1>보안 HLS 스트리밍 플레이어</h1>
      <VideoPlayer videoSrc={videoUrl} />
    </div>
  );
};

export default Home;
