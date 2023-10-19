import React from 'react';
import { IoMdRefresh } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { style } from './style';

const Header = () => {
  return (
    <div className={style.formHeader}>
      <div>Swap</div>
      {/* <div className="flex gap-x-4">
        <IoMdRefresh />
        <HiAdjustmentsHorizontal />
      </div> */}
    </div>
  );
};

export default Header;
