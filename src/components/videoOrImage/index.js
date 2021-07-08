import { Image } from "antd";
import React from "react";

function VideoOrImage({ e, title }) {
  const condition =
    e.toString().endsWith("mp4") || e.toString().endsWith("MOV");

  return (
    <div>
      {condition ? (
        <video key={e} width="100%" controls>
          <source src={e} type="video/mp4" />
          <source src={e} type="video/mov" />
        </video>
      ) : (
        <Image key={e} preview={true} alt={title} src={e} />
      )}
    </div>
  );
}

export default VideoOrImage;
