import { useEffect, useState } from "react";
import axios from "axios";
import { Token } from "@/types";
import { Route } from "@/Routes/Route";

export const useTokenPrices = (tokens: Token[]) => {
  const [tokenPrices, setTokenPrices] = useState<Map<string, TokenPrice>>(
    new Map()
  );

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

  return { tokenPrices };
};
