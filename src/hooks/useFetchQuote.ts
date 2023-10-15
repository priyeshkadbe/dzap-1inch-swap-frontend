import { route } from '@/api-routes/api-routes';
import { Token } from '@/types';
import axios from 'axios';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

interface FetchQuoteResponse {
  toAmount: number;
  gas: number;
}

export const useFetchQuote = (
  sellingToken: Token | null,
  buyingToken: Token | null,
  sellingTokenAmount: number | null,
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
    sellingTokenAmount !== undefined &&
    sellingTokenAmount !== 0;

  const url = shouldFetchData
    ? `${
        route.getQuote
      }?tokenIn=${sellingToken?.address}&tokenOut=${buyingToken?.address}&tokenInAmount=${sellingTokenAmount.toString()}`
    : null;

  const { data, error } = useSWR<FetchQuoteResponse>(url, fetcher, {
    revalidateOnFocus: true, // Revalidate the SWR key when the window gains focus
    refreshInterval: 5000, // Refresh the data every 5 seconds (optional)
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
  }, []); // This effect runs once and clears the loading state after 1 second

  return { data, isLoading, error };
};
