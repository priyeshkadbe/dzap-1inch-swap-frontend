import React, { useState, useEffect } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import useSWR, { mutate } from 'swr';
import axios from 'axios';
import { route } from '@/api-routes/api-routes';
import { Token } from '@/types';

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
    token && amount!==0 ? `${route.fetchToken}${token.address!}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshInterval: 5000, // Set refresh interval to 15 seconds
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

      {/* {amount === 0 && (
        <div>
          <h4 className={`text-sm text-gray-500 capitalize `}>
            {'~'}
            {'$'}
            {amount}
          </h4>
        </div>
      )} */}

      <div
        className={`${
          data !== null &&
          data !== undefined &&
          !isValidating &&
          !isLoadingNewData
            ? 'flex'
            : 'hidden'
        }`}
      >
        <h4 className={`text-sm text-gray-500 capitalize `}>
          {'~'}
          {'$'}
          {(Number(data) * amount ).toString()}
        </h4>
      </div>

      {/* {data !== null &&
        data !== undefined &&
        !isValidating &&
        !isLoadingNewData && (
          <div>
            <h4 className={`text-sm text-gray-500 capitalize `}>
              {'~'}
              {'$'}
              {(Number(data) * amount ?? 0).toString()}
            </h4>
          </div>
        )} */}
    </div>
  );
};

export default TokenInfo;
