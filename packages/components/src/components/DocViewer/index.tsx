import React, { useState } from "react";
import { View } from "@tarojs/components";
// import { Document, Page } from "react-pdf";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";

type docProps = {
  list: docItem[];
};

type docItem = {
  src: string;
  name: string;
};

function DocViewer(props: docProps) {
  const { list = [], ...p } = props;
  const [iframeSrc, setIframeSrc] = useState("");
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <View
      style={{
        width: "100vw",
      }}
    >
      {list.map(({ src, name }) => (
        <View
          style={{
            border: "1px solid",
          }}
          key={src}
          onClick={() => {
            setIframeSrc(src);
          }}
        >
          {name}
        </View>
      ))}
      {iframeSrc &&
        (/.*\.pdf$/.test(iframeSrc) ? (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Document
                loading="加载中.."
                file={iframeSrc}
                onLoadSuccess={onDocumentLoadSuccess}
              >
                {Array.from(new Array(numPages), (el, index) => (
                  <Page
                    width={375}
                    key={`page_${index + 1}`}
                    pageNumber={index + 1}
                  />
                ))}
              </Document>
            </div>
          </div>
        ) : (
          <View {...p}>
            <iframe
              src={iframeSrc}
              width="100%"
              height="100%"
              frameBorder="1"
            ></iframe>
          </View>
        ))}
    </View>
  );
}

export default DocViewer;
