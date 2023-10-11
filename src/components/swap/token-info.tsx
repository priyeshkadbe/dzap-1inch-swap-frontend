


import { useFetchTokenPrice } from "@/hooks/useFetchTokenPrice";
import { Token } from "@/types";
import React, { useEffect } from "react";

interface TokenInfoProps {
  token: Token;
  price: number | null;
  amount: number;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ token, price, amount }) => {
  const calculatedPrice = token && price ? amount * price : 0;

  const {tokenPrice,loading,error}=useFetchTokenPrice(token?.address)

  useEffect(() => {
        console.log("tokenprice", tokenPrice, loading, error);
  },[tokenPrice,loading,error])


  return (
    <div className="flex justify-between">
      {token && (
        <h4 className="text-sm text-gray-500 capitalize"> {token.name}</h4>
      )}
      {token &&
        price &&
        (loading ? (
          <p>loading</p>
        ) : (
          <h4 className="text-sm text-gray-500 capitalize">
            {"~"}
            {tokenPrice?.price}
          </h4>
        ))}

      {/* {
        loading?<p>loaading</p>:tokenPrice?.price
      } */}
    </div>
  );
};

export default TokenInfo;

