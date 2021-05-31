import React from "react";
import { Video } from "@tarojs/components";
import { VideoProps } from "@tarojs/components/types/Video";

function VideoViewer(props: VideoProps) {
  return (
    <Video
      object-fit="contain"
      // controls={false}
      autoplay
      show-center-play-btn={false}
      // enable-progress-gesture={false}
      {...props}
    ></Video>
  );
}

export default VideoViewer;
