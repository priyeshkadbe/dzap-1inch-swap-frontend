import Link from "next/link";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";


const Header: React.FC = () => {
  return (
    <div className="px-2 flex items-center justify-between font-semibold text-xl">
      <Link href="/">
        <IoIosArrowBack />
      </Link>
      <div>Search A Token</div>
      <div className="flex gap-x-4"></div>
    </div>
  );
};

export default Header;
