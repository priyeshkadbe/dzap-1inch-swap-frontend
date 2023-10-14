import { useEffect, useState } from 'react';
import axios from 'axios';
import { route } from '@/api-routes/api-routes';
import { TokenPrice } from '@/types';
import { serverConfig } from '@/config/serverConfig';

interface FetchTokenPriceResponse {
  loading: boolean;
  error: string | null;
  tokenPrice: TokenPrice | null;
}

export const useFetchTokenPrice = (tokenAddress: string): FetchTokenPriceResponse => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [tokenPrice, setTokenPrice] = useState<TokenPrice | null>(null);

  useEffect(() => {
    const fetchTokenPrice = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${route.fetchToken}${tokenAddress}`);
        console.log('response is ', response.data.data);
        const [address, price] = Object.entries(response.data.data)[0];
        const fetchedTokenPrice: TokenPrice = {
          address: address,
          price: price,
        };
        setTokenPrice(fetchedTokenPrice);
      } catch (error) {
        setError('Error fetching token price.');
        console.error('Error fetching token price:', error);
      } finally {
        setLoading(false);
      }
    };

    if (tokenAddress) {
      fetchTokenPrice();
    } else {
      setLoading(false);
    }
  }, [tokenAddress]);

  return { loading, error, tokenPrice };
};
