import React from "react";
import { AiOutlineDown } from "react-icons/ai";
import { Token } from "@/types/index"; // Import the Token type from the correct path

interface TokenSelectorDropdownProps {
  token: Token | null;
}

const TokenSelectorDropdown: React.FC<TokenSelectorDropdownProps> = ({
  token,
}) => {
  return (
    <div className="text-gray-300 cursor-pointer flex items-center gap-x-2 bg-[#44556f] p-2 rounded-md ">
      {token ? (
        <>
          <div className="h-6 w-6">
            <img src={token.logoURI} alt="token logo" />
          </div>
          <h4 className="text-sm">{token.symbol}</h4>
        </>
      ) : (
        <h4 className="text-sm">Select</h4>
      )}
      <AiOutlineDown size={18} />
    </div>
  );
};

export default TokenSelectorDropdown;
