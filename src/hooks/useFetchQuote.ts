import { useState, useEffect } from "react";
import axios from "axios";
import { useTokenContext } from "@/context/TokenContext";
import { serverConfig } from "@/config/serverConfig";
import { Route } from "@/Routes/Route";
export const useFetchQuote = () => {
  const [toAmount, setToAmount] = useState<number | null>(null);
  const [gas, setGas] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { sellingToken, buyingToken, sellingTokenAmount } = useTokenContext();
  let requestData = {
    tokenIn: sellingToken?.address,
    tokenOut: buyingToken?.address,
    tokenInAmount: sellingTokenAmount.toString(),
  };

  useEffect(() => {
    if (
      sellingToken !== null &&
      sellingTokenAmount !== null &&
      buyingToken !== null
    ) {
      const fetchData = async () => {
        try {
          const response = await axios.get(Route.getQuote, {
            params: requestData,
          });
          const { toAmount, gas } = response.data.data;
          setToAmount(toAmount);
          setGas(gas);
          setLoading(false);
        } catch (error) {
          console.error("Error calculating receiving token:", error);
          setError("An error occurred while calculating receiving token.");
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [sellingToken, buyingToken, sellingTokenAmount]);

  return { toAmount, gas, loading, error };
};
