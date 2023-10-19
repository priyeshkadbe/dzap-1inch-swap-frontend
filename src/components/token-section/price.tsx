import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { route } from '@/api-routes/api-routes';
import { Token } from '@/types';
import formatNumber from '@/helper/format-number';
import { useFetchTokenPrice } from '@/hooks/useFetchTokenPrice';
//import formatNumber from '@/utils/format-number';

interface TokenInfoProps {
  token: Token | null;
  amount: string;
}

const Price = async (url: string): Promise<number> => {
  try {
    const response = await axios.get(url);
    const [address, price] = Object.entries(response.data.data)[0];
    return Number(price);
  } catch (error) {
    console.error('Error fetching token price:', error);
    throw error;
  }
};

const TokenInfo: React.FC<TokenInfoProps> = ({ token, amount }) => {
  const [isLoadingNewData, setIsLoadingNewData] = useState<boolean>(false);

  const { data, isValidating } = useSWR(
    token ? `${route.fetchToken}${token.address!}` : null,
    useFetchTokenPrice,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 5000,
      onError: () => {
        setIsLoadingNewData(false);
      },
    },
  );

  useEffect(() => {
    if (!isValidating && isLoadingNewData) {
      setIsLoadingNewData(false);
    }
  }, [isValidating, isLoadingNewData, amount]);

  const handleRefresh = () => {
    setIsLoadingNewData(true);
    mutate(`${route.fetchToken}${token?.address!}`);
  };

  return (
    <div className="flex justify-between">
      <h4 className="text-sm text-gray-500 capitalize">{token?.name}</h4>
      {(isValidating || isLoadingNewData) && (
        <div>
          <ThreeDots
            height="20"
            width="40"
            radius="40"
            color="gray"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            visible={true}
          />
        </div>
      )}
      {data !== null &&
        data !== undefined &&
        !isValidating &&
        !isLoadingNewData && (
          <div>
            <h4 className={`text-sm text-gray-500 capitalize `}>
              {'~$'}
              {Number(formatNumber(data.toString())) * Number(amount)}
            </h4>
          </div>
        )}
    </div>
  );
};

export default TokenInfo;
