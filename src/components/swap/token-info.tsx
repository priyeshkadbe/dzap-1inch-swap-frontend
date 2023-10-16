import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { route } from '@/api-routes/api-routes';
import { Token } from '@/types';
import formatNumber from '@/utils/format-number';

const fetcher = async (url: string) => {
  const response = await axios.get(url);
  const [address, price] = Object.entries(response.data.data)[0];
  return price;
};

interface TokenInfoProps {
  token: Token | null;
  amount: number;
}

const TokenInfo: React.FC<TokenInfoProps> = ({ token, amount }) => {
  const [isLoadingNewData, setIsLoadingNewData] = useState<boolean>(false);

  const { data, isValidating } = useSWR(
    token && amount !== 0 ? `${route.fetchToken}${token.address!}` : null,
    fetcher,
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
  }, [isValidating, isLoadingNewData]);

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
              {'~'}
              {'$'}
              {formatNumber(Number(data) * amount)}
            </h4>
          </div>
        )}
    </div>
  );
};

export default TokenInfo;
