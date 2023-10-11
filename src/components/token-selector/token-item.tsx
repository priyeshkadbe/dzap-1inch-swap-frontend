import React from "react";
import { Token } from "@/types";

interface TokenItemProps {
  token: Token;
  index: number;
  handleTokenSelection: (token: Token) => void;
}

const TokenItem: React.FC<TokenItemProps> = ({
  token,
  index,
  handleTokenSelection,
}) => {
  return (
    <div
      key={index}
      className="flex justify-between items-center p-2 hover:bg-gray-600 rounded-md"
      onClick={() => handleTokenSelection(token)}
    >
      <div className="flex items-center">
        <img src={token.logoURI} alt={token.name} className="h-12 w-12" />
        <div className="flex flex-col p-2">
          <h4>{token.name}</h4>
          <p>{token.symbol}</p>
        </div>
      </div>
    </div>
  );
};

export default TokenItem;
