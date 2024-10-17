import React, { useContext, useEffect, useState } from "react";
// import Editor from "../CodeEditor/Editor";
import { PlayGroundContext } from "../playground/Context";
import { compile } from "./compiler";
import iframeRaw from "./iframe.html?raw";
import { IMPORT_MAP_FILE_NAME } from "../playground/files";

const Preview = () => {
  const { files } = useContext(PlayGroundContext);
  const [compiledCode, setCompiledCode] = useState("");
  const [iframeUrl, setIframeUrl] = useState(getIframeUrl());
  useEffect(() => {
    const res = compile(files);
    setCompiledCode(res);
  }, [files]);

  function getIframeUrl() {
    const res = iframeRaw
      .replace(
        '<script type="importmap"></script>',
        `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`
      )
      .replace(
        '<script type="module" id="appSrc"></script>',
        `<script type="module" id="appSrc">${compiledCode}</script>`
      );
    return URL.createObjectURL(new Blob([res], { type: "text/html" }));
  };

  useEffect(() => {
    setIframeUrl(getIframeUrl());
  }, [files[IMPORT_MAP_FILE_NAME].value, compiledCode]);

  return (
    <div className="h-full">
      <iframe src={iframeUrl} className="w-full h-full p-0 border-none" />
      {/* <Editor
        file={{
          name: "dist.js",
          language: "javascript",
          value: compiledCode,
        }}
      /> */}
    </div>
  );
};

export default Preview;
