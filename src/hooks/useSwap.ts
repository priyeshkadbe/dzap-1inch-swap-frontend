import { useState, useEffect } from 'react';
import axios from 'axios';
import { route } from '@/api-routes/api-routes';
import { Token } from '@/types';

interface SwapResponse {
  data: any;
  error: {
    statusCode: number;
    description: string;
  } | null;
}

const useSwap = (
  sellingTokenAddress: string | undefined,
  buyingTokenAddress: string | undefined,
  sellingTokenAmount: number,
  address: string,
  slippage: number,
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<SwapResponse['error']>(null);
  const [data, setData] = useState<SwapResponse['data'] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<SwapResponse>(route.swap, {
          params: {
            tokenIn: sellingTokenAddress,
            tokenOut: buyingTokenAddress,
            tokenInAmount: sellingTokenAmount,
            callerAddress: address,
            slippage: slippage,
          },
        });

        if (response.data.error) {
          setError(response.data.error);
        } else {
          setData(response.data.data);
        }
      } catch (error) {
        setError({
          statusCode: 500,
          description: 'An error occurred while fetching data.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function if needed (e.g., cancelling API request)
    // return () => {
    //   cleanup logic here
    // };
  }, [
    sellingTokenAddress,
    buyingTokenAddress,
    sellingTokenAmount,
    address,
    slippage,
  ]);

  return { loading, error, data };
};

export default useSwap;
