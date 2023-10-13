import { useState, useEffect } from 'react';
import axios from 'axios';
import { useTokenContext } from '@/context/TokenContext';
import { serverConfig } from '@/config/serverConfig';
import { route } from '@/api-routes/api-routes';
import { Token } from '@/types';

interface useFetchQuoteProps {
  sellingToken: Token | null;
  buyingToken: Token | null;
  sellingTokenAmount: number | null;
}

export const useFetchQuote = ({
  sellingToken,
  buyingToken,
  sellingTokenAmount,
}: useFetchQuoteProps) => {
  const [toAmount, setToAmount] = useState<number | null>(null);
  const [gas, setGas] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // const { sellingToken, buyingToken, sellingTokenAmount } = useTokenContext();

  useEffect(() => {
    if (
      sellingToken !== null &&
      sellingTokenAmount !== null &&
      buyingToken !== null
    ) {
      let requestData = {
        tokenIn: sellingToken?.address,
        tokenOut: buyingToken?.address,
        tokenInAmount: sellingTokenAmount.toString(),
      };

      const fetchData = async () => {
        try {
          const response = await axios.get(route.getQuote, {
            params: requestData,
          });
          const { toAmount, gas } = response.data.data;
          setToAmount(toAmount);
          setGas(gas);
          setLoading(false);
        } catch (error) {
          console.error('Error calculating receiving token:', error);
          setError('An error occurred while calculating receiving token.');
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [sellingToken, buyingToken, sellingTokenAmount]);

  return { toAmount, gas, loading, error };
};
