import React, { useContext } from "react";
import Logo from "../../assets/react.svg";
import { CarbonShare } from "../../assets/icons/ShareIcon";
import copy from "copy-to-clipboard";
import { CarbonDownload } from "../../assets/icons/DownloadIcon";
import { downloadFiles } from "../../libs/download";
import { PlayGroundContext } from "../playground/Context";

const Header = () => {
  const { files } = useContext(PlayGroundContext);
  return (
    <div className="h-[50px] px-5 box-border border-b flex items-center justify-between ">
      <div className="flex text-xl items-center">
        <img src={Logo} alt="logo" className="h-6 mr-2.5" />
        <span>React Playground</span>
      </div>
      <div className="flex items-center">
        <CarbonShare
          onClick={() => {
            copy(window.location.href);
            window.alert("Sharable URL has been copied to clipboard.");
          }}
        />
        <CarbonDownload
          className="ml-3"
          onClick={async () => {
            const isConfirmedDownload = window.confirm(
              "Download project files?"
            );
            if (isConfirmedDownload) await downloadFiles(files);
          }}
        />
      </div>
    </div>
  );
};

export default Header;
