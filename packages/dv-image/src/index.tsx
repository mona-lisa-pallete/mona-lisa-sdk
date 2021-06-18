import { dvPxTransform } from "@davinci/core";
import { Image, View } from "@tarojs/components";
import React from "react";
import "./index.less";
import { DvImageProps } from "./types";

const DvImage: React.FC<DvImageProps> = (props) => {
  const { url, onClick, edit, style } = props;
  const ref = React.createRef();

  if (edit && !url) {
    return (
      <View className="dv-image--no-data">
        <Image
          style={{ userSelect: "none" }}
          src="https://static.guorou.net/course-static/345f26dde8c94fefb9e2e4c5259083c9.png"
        ></Image>
        <View>请上传图片</View>
      </View>
    );
  }

  return (
    <Image
      style={{
        position: style?.position || "static",
        width: dvPxTransform(style?.width),
        left: dvPxTransform(style?.left),
        top: dvPxTransform(style?.top),
      }}
      className="dv-image"
      onClick={onClick}
      ref={ref}
      src={url}
      mode="widthFix"
    />
  );
};

export default DvImage;