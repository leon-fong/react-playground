import { PropsWithChildren, useState } from "react";
import { Files, PlayGroundContext } from "./Context";
import { fileName2Language } from "../../libs/file";
import { initFiles } from "./files";
export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [files, setFiles] = useState<Files>(initFiles);
  const [selectedFileName, setSelectedFileName] = useState("App.tsx");

  function addFile(name: string) {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: "",
    };
    setFiles({ ...files });
  }

  function removeFile(name: string) {
    delete files[name];
    setFiles({ ...files });
  }

  function updateFileName(oldFieldName: string, newFieldName: string) {
    if (
      !files[oldFieldName] ||
      newFieldName === undefined ||
      newFieldName === null
    )
      return;
    const { [oldFieldName]: value, ...rest } = files;
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileName2Language(newFieldName),
        name: newFieldName,
      },
    };

    setFiles({
      ...rest,
      ...newFile,
    });
  }

  return (
    <PlayGroundContext.Provider
      value={{
        files,
        setFiles,
        selectedFileName,
        setSelectedFileName,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlayGroundContext.Provider>
  );
};