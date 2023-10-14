import { useState, useEffect } from 'react';
import axios from 'axios';
import { route } from '@/api-routes/api-routes';
import { Token } from '@/types';
import { serverConfig } from '@/config/serverConfig';
import useSWR from 'swr';

export const useFetchTokens = () => {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

const fetcher = (url: any) => fetch(url).then((res) => res.json());

  useEffect(() => {
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
        setTokens(tokenArray);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { tokens, loading, error };
};
