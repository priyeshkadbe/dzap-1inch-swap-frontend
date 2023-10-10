


import React, { useEffect } from "react";

interface TokenInfoProps {
  token: {
    name: string;
  } | null;
  price: number | null;
  amount: number;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ token, price, amount }) => {
  const calculatedPrice = token && price ? amount * price : 0;

  useEffect(()=>{},[token,price,amount])


  return (
    <div className="flex justify-between">
      {token && (
        <h4 className="text-sm text-gray-500 capitalize"> {token.name}</h4>
      )}
      {token && price && (
        <h4 className="text-sm text-gray-500 capitalize">
          {"~"}
          {calculatedPrice}
        </h4>
      )}
    </div>
  );
};

export default TokenInfo;

