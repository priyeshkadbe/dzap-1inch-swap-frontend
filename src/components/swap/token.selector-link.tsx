import React from "react";
import Link  from "next/link";

import { AiOutlineDown } from "react-icons/ai";
import { style } from "./style";

interface TokenSelectorLinkProps {
  token: {
    logoURI: string;
    symbol: string;
  } | null;
  linkPath: string;
}




const TokenSelectorLink: React.FC<TokenSelectorLinkProps> = ({
  token,
  linkPath,
}) => {
  return (
    <Link href={linkPath}>
      {token ? (
        <div className={style.selectorDropdown}>
          <div className="h-6 w-6">
            <img src={token.logoURI} alt="token logo" />
          </div>
          <h4 className="text-sm">{token.symbol}</h4>
          <AiOutlineDown size={18} />
        </div>
      ) : (
        <div className={style.selectorDropdown}>
          <h4 className="text-sm">Select</h4>
          <AiOutlineDown size={18} />
        </div>
      )}
    </Link>
  );
};

export default TokenSelectorLink;
