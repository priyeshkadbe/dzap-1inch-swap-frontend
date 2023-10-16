'use client';

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

import { useAccount, useNetwork } from 'wagmi';
import { Token } from '@/types';
import { useBalance } from 'wagmi';

interface TokenPrice {
  address: string;
  price: any;
}
import useProvider from 'wagmi';
import { useFetchTokens } from '@/hooks/useFetchTokens';
import axios from 'axios';
import { route } from '@/api-routes/api-routes';
import useSWR from 'swr';



interface TokenContextProps {
  sellingToken: Token | null;
  setSellingToken: Dispatch<SetStateAction<Token | null>>;
  buyingToken: Token | null;
  setBuyingToken: Dispatch<SetStateAction<Token | null>>;
  tokens: Token[] | null;
  sellingTokenAmount: number;
  setSellingTokenAmount: Dispatch<SetStateAction<number>>;
  buyingTokenAmount: number | null;
  setBuyingTokenAmount: Dispatch<SetStateAction<number>>;
  slippage: number;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sellingToken, setSellingToken] = useState<Token | null>(null);
  const [buyingToken, setBuyingToken] = useState<Token | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [sellingTokenPrice, setSellingTokenPrice] = useState<TokenPrice | null>(
    null,
  );


  const [buyingTokenPrice, setBuyingTokenPrice] = useState<TokenPrice | null>(
    null,
  );
  const [sellingTokenAmount, setSellingTokenAmount] = useState<number>(0);
  const [buyingTokenAmount, setBuyingTokenAmount] = useState<number>(0);
  const [slippage, setSlippage] = useState<number>(2.5);

  
  const fetcher = async (url:any) => {
    try {
      const response = await axios.get(url);
      const tokenData = response.data.data.tokens;

      const tokenArray: Token[] = [];
       for (const key in tokenData) {
         if (tokenData.hasOwnProperty(key)) {
           tokenArray.push(tokenData[key]);
         }
       }
      return tokenArray;
    } catch (error) {
      console.log('Error fetching data: ' ,error);
    }
  };

  const { data } = useSWR(route.fetchToken, fetcher, {
    revalidateOnMount: true, 
  });


  useEffect(() => {
    setTokens(data!);
  },[data])

  //setTokens(data)

  return (
    <TokenContext.Provider
      value={{
        sellingToken,
        setSellingToken,
        buyingToken,
        setBuyingToken,
        tokens,
        sellingTokenAmount,
        setSellingTokenAmount,
        buyingTokenAmount,
        setBuyingTokenAmount,
        slippage,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokenContext must be used within a TokenProvider');
  }
  return context;
};
