import React from "react";
import Logo from "../../assets/react.svg";
import { CarbonShare } from "../../assets/icons/ShareIcon";
import copy from "copy-to-clipboard";

const Header = () => {
  return (
    <div className="h-[50px] px-5 box-border border-b flex items-center justify-between ">
      <div className="flex text-xl items-center">
        <img src={Logo} alt="logo" className="h-6 mr-2.5" />
        <span>React Playground</span>
      </div>
      <div>
        <CarbonShare
          onClick={() => {
            copy(window.location.href);
            window.alert("Sharable URL has been copied to clipboard.");
          }}
        />
      </div>
    </div>
  );
};

export default Header;
