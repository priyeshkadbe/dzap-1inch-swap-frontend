'use client';
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import axios from 'axios';
import useSWR from 'swr';
import { Token } from '@/types';
import { route } from '@/config/api-routes';
import { serverConfig } from '@/config/serverConfig';

interface TokenContextProps {
  sellingToken: Token | null;
  setSellingToken: Dispatch<SetStateAction<Token | null>>;
  buyingToken: Token | null;
  setBuyingToken: Dispatch<SetStateAction<Token | null>>;
  tokens: Token[] | null;
  sellingTokenAmount: string;
  setSellingTokenAmount: Dispatch<SetStateAction<string>>;
  buyingTokenAmount: string;
  setBuyingTokenAmount: Dispatch<SetStateAction<string>>;
  slippage: number;
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sellingToken, setSellingToken] = useState<Token | null>(null);
  const [buyingToken, setBuyingToken] = useState<Token | null>(null);
  const [tokens, setTokens] = useState<Token[] | null>(null);
  const [sellingTokenAmount, setSellingTokenAmount] = useState<string>('0');
  const [buyingTokenAmount, setBuyingTokenAmount] = useState<string>('0');
  const [slippage, setSlippage] = useState<number>(1.5);

  const fetchTokens = async () => {
    try {
      const response = await axios.get(route.fetchToken);
      const tokenData = response.data.data.tokens;
      const tokenArray: Token[] = Object.values(tokenData);
      return tokenArray
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const { data } = useSWR(route.fetchToken, fetchTokens, {
    revalidateOnMount: true,
  });

  useEffect(() => {
    if (data) {
      setTokens(data);
    }
  }, [data]);


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

export const useTokenContext: () => TokenContextProps = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useTokenContext must be used within a TokenProvider');
  }
  return context;
};
