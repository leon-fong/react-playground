import { PropsWithChildren, useEffect, useState } from "react";
import { Files, PlayGroundContext } from "./Context";
import { fileName2Language } from "../../libs/file";
import { initFiles } from "./files";

const getFilesFromUrl = () => {
  let files: Files | undefined;
  try {
    const hash = decodeURIComponent(window.location.hash.slice(1));
    files = JSON.parse(hash);
  } catch (error) {
    console.error(error);
  }

  return files;
};

export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props;

  const [files, setFiles] = useState<Files>(getFilesFromUrl() || initFiles);
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

  useEffect(() => {
    const hash = JSON.stringify(files);
    window.location.hash = encodeURIComponent(hash);
  }, [files]);

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
