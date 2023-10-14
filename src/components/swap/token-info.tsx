import { route } from "@/api-routes/api-routes";
import { useFetchTokenPrice } from "@/hooks/useFetchTokenPrice";
import { Token, TokenPrice } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {ThreeDots} from "react-loader-spinner"
import TokenSection from "./token-section";

interface TokenInfoProps {
  token: Token | null;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ token }) => {

  const { loading, error, tokenPrice } = useFetchTokenPrice(token?.address!);

  

  useEffect(() => {
    console.log("tokenprice", tokenPrice, loading, error);
  }, [token, tokenPrice, loading, error]);
  

  // if (loading) {
  //   return (
  //     <ThreeDots
  //       height="30"
  //       width="30"
  //       radius="9"
  //       color="#4fa94d"
  //       ariaLabel="three-dots-loading"
  //       wrapperStyle={{}}
  //       visible={true}
  //     />
  //   );
  // }

  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // const [tokenPrice, setTokenPrice] = useState<TokenPrice | null>(null);

  // const fetchTokenPrice = async () => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     const response = await axios.get(`${route.fetchToken}${token?.address}`);
  //     console.log('response is ', response.data.data);
  //     const [address, price] = Object.entries(response.data.data)[0];
  //     const fetchedTokenPrice: TokenPrice = {
  //       address: address,
  //       price: price,
  //     };
  //     setTokenPrice(fetchedTokenPrice);
  //   } catch (error) {
  //     setError('Error fetching token price.');
  //     console.error('Error fetching token price:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchTokenPrice();
  // },[token])

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

      
        <div>
          <h4 className={`${tokenPrice?.price?"block":"hidden"} text-sm text-gray-500 capitalize`}>
            {'~'}
            {'$'}
            {Number(tokenPrice?.price).toFixed(4)}
          </h4>
        </div>
     
    </div>
  );
};

export default TokenInfo;
