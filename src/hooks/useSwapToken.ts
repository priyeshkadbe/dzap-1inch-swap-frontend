import { useState, useEffect } from 'react';
import axios from 'axios';
import { route } from '@/api-routes/api-routes';
import { Token } from '@/types';

interface useSwapTokensProps {
  sellingToken: Token | null;
  buyingToken: Token | null;
  sellingTokenAmount: number | null;
  callerAddress: string;
}

export const useSwapTokens = ({
  sellingToken,
  buyingToken,
  sellingTokenAmount,
  callerAddress,
}: useSwapTokensProps) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (
        !sellingToken ||
        !buyingToken ||
        sellingTokenAmount === null ||
        !callerAddress
      ) {
        setError('Please fill all the required fields');
        setLoading(false);
        return;
      }

      const requestData = {
        tokenIn: sellingToken.address,
        tokenOut: buyingToken.address,
        tokenInAmount: sellingTokenAmount.toString(),
        callerAddress: callerAddress.toString(),
      };

      try {
        const response = await axios.get(route.swap, {
          params: requestData,
        });

        const tokenData = response.data.data.tokens;
        setData(tokenData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, [sellingToken, buyingToken, sellingTokenAmount, callerAddress]);

  return { data, loading, error };
};


