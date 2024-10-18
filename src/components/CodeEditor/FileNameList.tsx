import React, { useContext, useEffect, useRef, useState } from "react";
import { PlayGroundContext } from "../playground/Context";
import { cn } from "../../libs/classnames";
import "./index.modules.css";
interface FileNameItemProps {
  value: string;
  checked: boolean;
  creating: boolean;
  onClick: () => void;
  onEditComplete: (name: string) => void;
}

const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const { value, checked, creating, onClick, onEditComplete } = props;

  const [name, setName] = useState(value);
  const [editing, setEditing] = useState(creating);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDoubleClick = () => {
    setEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleBlur = () => {
    setEditing(false);
    onEditComplete(name);
  };

  useEffect(() => {
    if (creating) inputRef.current?.focus();
  }, [creating]);

  return (
    <div
      className={cn(
        "inline-flex pt-2 pb-1.5 px-2.5 text-sm cursor-pointer items-center border-b-2 border-b-transparent",
        checked ? "text-sky-500 border-b-sky-500" : ""
      )}
      onClick={onClick}
    >
      {editing ? (
        <input
          ref={inputRef}
          value={name}
          className="w-[90px] py-1 pl-0 pr-2.5 text-sm text-neutral-800 bg-neutral-200 border rounded-[4px] outline-none"
          onChange={(e) => setName(e.target.value)}
          onBlur={handleBlur}
        />
      ) : (
        <span onDoubleClick={handleDoubleClick}>{name}</span>
      )}
    </div>
  );
};

const FileNameList = () => {
  const {
    files,
    selectedFileName,
    addFile,
    setSelectedFileName,
    updateFileName,
  } = useContext(PlayGroundContext);

  const [tabs, setTabs] = useState([""]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    setTabs(Object.keys(files));
  }, [files]);

  const handleEditComplete = (name: string, preName: string) => {
    updateFileName(preName, name);
    setSelectedFileName(name);
    setCreating(false);
  };

  const addTab = () => {
    addFile("Comp" + Math.random().toString().slice(2, 8) + ".tsx");
    setCreating(true);
  };

  return (
    <div className="tabs flex items-center h-9 overflow-x-auto overflow-y-hidden border-b box-border text-neutral-900 bg-white">
      {tabs.map((item, index, arr) => (
        <FileNameItem
          key={item + index}
          value={item}
          creating={creating && index === arr.length - 1}
          checked={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
          onEditComplete={(name) => handleEditComplete(name, item)}
        />
      ))}
      <div className="cursor-pointer flex items-center justify-center py-0 px-2 hover:bg-neutral-200" onClick={addTab}>
        +
      </div>
    </div>
  );
};

export default FileNameList;
