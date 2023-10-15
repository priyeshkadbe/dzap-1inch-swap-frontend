import axios from 'axios';
import useSWR from 'swr';
import { route } from '@/api-routes/api-routes';
import { TokenPrice } from '@/types';

const fetchTokenPrice = async (url: string) => {
  const response = await axios.get(url);
  console.log('response is ', response.data.data);
  const [address, price] = Object.entries(response.data.data)[0];
  const fetchedTokenPrice: TokenPrice = {
    address: address,
    price: price,
  };
  return fetchedTokenPrice
};

export const useTokenPrice = (tokenAddress: string | null) => {
  const url = `${route.fetchToken}${tokenAddress}`;
  const { data, error } = useSWR(url, fetchTokenPrice);

  
  return {
    tokenPrice: data,
    isLoading: !error && !data,
    isError: error,
  };
};
