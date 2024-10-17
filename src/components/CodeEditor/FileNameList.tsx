import React, { useContext, useEffect, useState } from "react";
import { PlayGroundContext } from "../playground/Context";
import { cn } from "../../libs/classnames";
import "./index.modules.css";
interface FileNameItemProps {
  value: string;
  checked: boolean;
  onClick: () => void;
}

const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, checked, onClick } = props;

  return (
    <div
      className={cn(
        "inline-flex pt-2 pb-1.5 px-2.5 text-sm cursor-pointer items-center border-b-2 border-b-transparent",
        checked ? "text-sky-500 border-b-sky-500" : ""
      )}
      onClick={onClick}
    >
      <span>{value}</span>
    </div>
  );
};

const FileNameList = () => {
  const { files, selectedFileName, setSelectedFileName } =
    useContext(PlayGroundContext);

  const [tabs, setTabs] = useState([""]);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  return (
    <div className="tabs flex items-center h-9 overflow-x-auto overflow-y-hidden border-b box-border text-neutral-900 bg-white">
      {tabs.map((item, index) => (
        <FileNameItem
          key={item + index}
          value={item}
          checked={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
        />
      ))}
    </div>
  );
};

export default FileNameList;
