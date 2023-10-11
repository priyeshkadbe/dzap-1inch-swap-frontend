import React from "react";
import { style } from "./style";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default Layout;
