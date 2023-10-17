import { route } from '@/api-routes/api-routes';
import { Token } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface FetchQuoteResponse {
  toAmount: string;
  gas: string;
}

export const useFetchQuote = (
  sellingToken: Token | null,
  buyingToken: Token | null,
  sellingTokenAmount: string | null,
) => {
  const fetcher = async (url: string): Promise<FetchQuoteResponse> => {
    try {
      const response = await axios.get(url);
      const { toAmount, gas } = response.data.data;
      return { toAmount, gas };
    } catch (error) {
      throw new Error('Error calculating receiving token');
    }
  };

  const shouldFetchData =
    sellingToken !== null &&
    sellingToken !== undefined &&
    buyingToken !== null &&
    buyingToken !== undefined &&
    sellingTokenAmount !== null &&
    sellingTokenAmount !== undefined 

  const url = shouldFetchData
    ? `${
        route.getQuote
      }?tokenIn=${sellingToken?.address}&tokenOut=${buyingToken?.address}&tokenInAmount=${sellingTokenAmount}`
    : null;

  const { data, error } = useSWR<FetchQuoteResponse>(url, fetcher, {
    revalidateOnFocus: true, 
    refreshInterval: 5000,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const delay = setTimeout(() => {
      if (mounted) {
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      mounted = false;
      clearTimeout(delay);
    };
  }, []); 

  return { data, isLoading, error };
};
