import React, { useContext } from "react";
import FileNameList from "./FileNameList";
import Editor from "./Editor";
import { PlayGroundContext } from "../playground/Context";
import { debounce } from "lodash-es";

const CodeEditor = () => {
  const { files, setFiles, selectedFileName } = useContext(PlayGroundContext);

  const file = files[selectedFileName];

  function onEditorChange(value?: string) {
    files[file.name].value = value!;
    setFiles({ ...files });
  }
  return (
    <div className="flex flex-col h-full">
      <FileNameList />
      <Editor file={file} onChange={debounce(onEditorChange, 500)} />
    </div>
  );
};

export default CodeEditor;
