import React from "react";
import { Image, View } from "@tarojs/components";
import { sendEvenLog, dvConnect } from "@gr-davinci/core";

type DvImageProps = {
  id: string;
  setAppData: () => void;
  [key: string]: any;
};
const index = (props: DvImageProps) => {
  const { id, src, onClick, setAppData, ...p } = props;

  function clickTrack() {
    sendEvenLog({
      e_c: "activity",
      e_a: "click",
      e_n: "image_click",
    });
  }
  return (
    <View>
      <Image
        src={src}
        {...p}
        onClick={() => {
          clickTrack();
          if (onClick) {
            onClick();
          }
        }}
      />
    </View>
  );
};

const DvImage = dvConnect(index, (state) => (props) => {
  const { id } = props;
  return {
    foo: (state && state[id] && state[id].foo) || "bar",
    pageId: (state && state["pageId"]) || "noPageId",
  };
});

export default DvImage;
