import { useEffect, useState } from "react";
import axios from "axios";
import { Route } from "@/Routes/Route";
import { Token, TokenPrice } from "@/types"; 

export const useTokenData = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [tokenPrices, setTokenPrices] = useState<Map<string, TokenPrice>>(
    new Map()
  );

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get(Route.fetchTokens);
        const tokenData = response.data.data.tokens;
        const tokenArray: Token[] = Object.values(tokenData);
        setTokens(tokenArray);
      } catch (error) {
        console.error("Error fetching tokens:", error);
      }
    };

    fetchTokens();
  }, []);

  useEffect(() => {
    const fetchTokenPrices = async () => {
      try {
        const requests = tokens.map(async (token) => {
          const response = await axios.get(Route.fetchTokens + token.address);
          const [address, price] = Object.entries(response.data.data)[0];
          return {
            address: address,
            price: price,
          };
        });
        const tokenPricesData = await Promise.all(requests);
        const pricesMap = new Map(
          tokenPricesData.map((price) => [price.address, price])
        );
        setTokenPrices(pricesMap);
      } catch (error) {
        console.error("Error fetching token prices:", error);
      }
    };

    fetchTokenPrices();
  }, [tokens]);

  return { tokens, tokenPrices };
};
