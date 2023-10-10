import React from "react";

interface Token {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  logoURI: string;
  tags: string[];
}
interface TokenListItemProps {
  token: Token;
  onSelect: (token: Token) => void;
}

const TokenListItem: React.FC<TokenListItemProps> = ({ token, onSelect }) => {
  return (
    <div
      className="flex justify-between items-center p-2 hover:bg-gray-600 rounded-md"
      onClick={() => onSelect(token)}
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

export default TokenListItem;
