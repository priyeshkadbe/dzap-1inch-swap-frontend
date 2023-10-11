import { useFetchTokenPrice } from "@/hooks/useFetchTokenPrice";
import { Token } from "@/types";
import React, { useEffect } from "react";
import {ThreeDots} from "react-loader-spinner"

interface TokenInfoProps {
  token: Token | null;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ token }) => {

  const { loading, error, tokenPrice } = useFetchTokenPrice(token?.address??"");

  useEffect(() => {
    console.log("tokenprice", tokenPrice, loading, error);
  }, [token,tokenPrice, loading, error]);

  return (
    <div className="flex justify-between">
      <h4 className="text-sm text-gray-500 capitalize"> {token?.name}</h4>

      {/* {tokenPrice ? (
        <div>
          <h4 className="text-sm text-gray-500 capitalize">
            {"~"}
            {tokenPrice?.price}
          </h4>
        </div>
      ) : (
        <div>
          <ThreeDots
            height="30"
            width="30"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      )} */}

      {token && (
        <div>
          <h4 className="text-sm text-gray-500 capitalize">
            {"~"}
            {tokenPrice?.price}
          </h4>
        </div>
        
      )}
    </div>
  );
};

export default TokenInfo;
