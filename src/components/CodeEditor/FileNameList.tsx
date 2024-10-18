import React, { useContext, useEffect, useRef, useState } from "react";
import { PlayGroundContext } from "../playground/Context";
import { cn } from "../../libs/classnames";
import styles from  "./index.module.css";
import { ENTRY_FILE_NAME, readonlyFileNames } from "../playground/files";
interface FileNameItemProps {
  value: string;
  checked: boolean;
  creating: boolean;
  readonly: boolean;
  onClick: () => void;
  onEditComplete: (name: string) => void;
  onRemove: () => void;
}

const FileNameItem: React.FC<FileNameItemProps> = (props) => {
  const {
    value,
    checked,
    creating,
    readonly,
    onClick,
    onRemove,
    onEditComplete,
  } = props;

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

  const handleRemove = () => {
    const isComfirmedRemove = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (isComfirmedRemove) onRemove();
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
        <>
          <span onDoubleClick={!readonly ? handleDoubleClick : () => {}}>
            {name}
          </span>
          {!readonly ? (
            <span
              style={{ marginLeft: 5, display: "flex" }}
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24">
                <line stroke="#999" x1="18" y1="6" x2="6" y2="18"></line>
                <line stroke="#999" x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </span>
          ) : null}
        </>
      )}
    </div>
  );
};

const FileNameList = () => {
  const {
    files,
    selectedFileName,
    addFile,
    removeFile,
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

  const handleRemove = (name: string) => {
    removeFile(name);
    setSelectedFileName(ENTRY_FILE_NAME);
  };

  return (
    <div className={cn('flex items-center h-9 overflow-x-auto overflow-y-hidden border-b box-border text-neutral-900 bg-white', styles.tabs)}>
      {tabs.map((item, index, arr) => (
        <FileNameItem
          key={item + index}
          value={item}
          readonly={readonlyFileNames.includes(item)}
          creating={creating && index === arr.length - 1}
          checked={selectedFileName === item}
          onClick={() => setSelectedFileName(item)}
          onRemove={() => handleRemove(item)}
          onEditComplete={(name) => handleEditComplete(name, item)}
        />
      ))}
      <div
        className="cursor-pointer flex items-center justify-center py-0 px-2 hover:bg-neutral-200"
        onClick={addTab}
      >
        +
      </div>
    </div>
  );
};

export default FileNameList;
