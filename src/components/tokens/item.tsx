import React, { useEffect } from "react";
import { Token } from "@/types";
import Image from "next/image";

interface ItemProps {
  token: Token;
  index: number;
  handleTokenSelection: (token: Token) => void;
}

const Item: React.FC<ItemProps> = ({
  token,
  index,
  handleTokenSelection,
}) => {

  useEffect(() => {}, [token, index, handleTokenSelection]);

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

export default Item;
