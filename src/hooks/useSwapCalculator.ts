import { useEffect, useState } from "react";
import axios from "axios";
import { Token } from "@/types"; 

export const useSwapCalculator = (
  sellingToken: Token | null,
  sellingTokenAmount: number
) => {
  const [buyingTokenAmount, setBuyingTokenAmount] = useState<number>(0);
  const [gasFees, setGasFees] = useState<number>(0);

  useEffect(() => {
    const calculateReceivingToken = async () => {
      if (sellingToken && sellingTokenAmount > 0) {
        try {
          const requestData = {
            tokenIn: sellingToken.address,
            tokenInAmount: sellingTokenAmount.toString(),
          };

          const response = await axios.get(
            "http://localhost:5000/api/v1/get-quote",
            {
              params: requestData,
            }
          );

          const { toAmount, gas } = response.data.data;
          setBuyingTokenAmount(toAmount);
          setGasFees(gas);
        } catch (error) {
          console.error("Error calculating receiving token:", error);
        }
      } else {
        setBuyingTokenAmount(0);
        setGasFees(0);
      }
    };

    calculateReceivingToken();
  }, [sellingToken, sellingTokenAmount]);

  return { buyingTokenAmount, gasFees };
};
