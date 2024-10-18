import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { cn } from "../../libs/classnames";
interface MessageProps {
  type: "error" | "warn";
  content: string;
}

const Message: React.FC<MessageProps> = (props) => {
  const { type, content } = props;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!!content);
  }, [content]);

  return visible ? (
    <div
      className={cn(
        "absolute right-2 bottom-0 left-2 z-10 flex max-h-[calc(100%-300px)] min-h-10 mb-2 border-1 rounded-md text-[var(--color)] bg-[var(--bg-color)] border-[var(--color)]",
        styles[type]
      )}
    >
      <pre
        className="py-3 px-5 m-0 overflow-auto whitespace-break-spaces"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      ></pre>
      <button
        className="absolute top-2 right-2 block w-[18px] h-[18px] p-0 text-[9px] text-center cursor-pointer border-none rounded-lg text-[var(--bg-color)] bg-[var(--color)]"
        onClick={() => setVisible(false)}
      >
        ✕
      </button>
    </div>
  ) : null;
};

export default Message;
