import React from "react";
import { IoMdRefresh } from "react-icons/io";
import { AiOutlinePlus } from "react-icons/ai";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import {style} from "./style"; // Import your CSS file if necessary

const SwapHeader = () => {
  return (
    <div className={style.formHeader}>
      <div>Swap</div>
      <div className="flex gap-x-4">
        <IoMdRefresh />
        <AiOutlinePlus />
        <HiAdjustmentsHorizontal />
      </div>
    </div>
  );
};

export default SwapHeader;
