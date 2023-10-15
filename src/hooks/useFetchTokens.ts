import useSWR, { mutate } from 'swr';
import { route } from '@/api-routes/api-routes';
import axios from 'axios';
import { Token } from '@/types';
import { useEffect, useState } from 'react';

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data.data.tokens;
};

export const useFetchTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const {
    data,
    error,
    isValidating: loading,
  } = useSWR(route.fetchToken, fetcher);

  const fetchData = async () => {
    try {
      const response = await axios.get(route.fetchToken);
      const tokenData = response.data.data.tokens;
      const tokenArray: Token[] = [];
      for (const key in tokenData) {
        if (tokenData.hasOwnProperty(key)) {
          tokenArray.push(tokenData[key]);
        }
      }
      mutate(route.fetchToken, tokenArray, false);
      setTokens(tokenArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); 

  return { tokens, loading, error: loading };
};
