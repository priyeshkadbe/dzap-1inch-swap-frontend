import React, { useEffect } from "react";
import { AiOutlineDown } from "react-icons/ai";
import { style } from "./style";

interface Token {
  logoURI: string;
  symbol: string;
}

interface TokenSelectorProps {
  token?: Token | null;
}

const TokenSelector: React.FC<TokenSelectorProps> = ({ token }) => {
  useEffect(() => {}, [token]);

  return (
    <div className={style.selectorDropdown}>
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

export default TokenSelector;
