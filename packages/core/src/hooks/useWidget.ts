import { useEffect, useState } from "react";

const loadScript = (src: string, id: string, cb: Function) => {
  return new Promise((resolve: Function, reject) => {
    const _id = `__widget_entity_${id}`;
    if (document.querySelector(_id)) {
      resolve();
    } else {
      const script = document.createElement("script");
      script.id = _id;
      script.src = src;
      script.onload = () => {
        resolve();
        cb();
      };
      script.onerror = () => {
        reject(`【${src}】下载失败`);
      };
      document.head.appendChild(script);
    }
  });
};

function useWidget(dllCdnPaths) {
  const [isReady, setIsReady] = useState(false);
  const [UIColl, setUI] = useState({});
  useEffect(() => {
    const requestQueue: Promise<any>[] = [];
    if (Array.isArray(dllCdnPaths) && dllCdnPaths.length > 0) {
      dllCdnPaths.forEach((url) => {
        // e.g. url: https://static-zy-com.oss-cn-hangzhou.aliyuncs.com/davinci/component/DvImage/20210521165439/index.js
        const id = url.match(/component\/(.*?)\//)[1];
        requestQueue.push(
          loadScript(url, id, () => {
            UIColl[id] = window?.[id]["default"] || "div";
          })
        );
      });
    }
    Promise.all(requestQueue).then(() => {
      setIsReady(true);
      setUI(UIColl);
    });
  }, []);
  return [UIColl, isReady];
}

export default useWidget;
