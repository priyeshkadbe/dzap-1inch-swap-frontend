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
import useSWR from "swr"
interface TokenContextProps {
  sellingToken: Token | null;
  setSellingToken: Dispatch<SetStateAction<Token | null>>;
  buyingToken: Token | null;
  setBuyingToken: Dispatch<SetStateAction<Token | null>>;
  //tokens: Token[];

  //sellingTokenPrice: TokenPrice | null;
  //buyingTokenPrice: TokenPrice | null;
  sellingTokenAmount: number;
  setSellingTokenAmount: Dispatch<SetStateAction<number>>;
  buyingTokenAmount: number | null;
  setBuyingTokenAmount: Dispatch<SetStateAction<number>>;
  //gasFees: number;
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

  const [gasFees, setGasFees] = useState(0);
  const [buyingTokenPrice, setBuyingTokenPrice] = useState<TokenPrice | null>(
    null,
  );
  const [sellingTokenAmount, setSellingTokenAmount] = useState<number>(0);
  const [buyingTokenAmount, setBuyingTokenAmount] = useState<number>(0);
  const [slippage, setSlippage] = useState<number>(2.5);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { chain, chains } = useNetwork();
  // const { data } = useBalance({
  //   address,
  // });

  const fetcher = (url: any) => fetch(url).then((res) => res.json());

  const { data } = useSWR(route.fetchToken, fetcher);

  console.log("dfa",data?.data?.tokens)


  //setTokens(data)

  return (
    <TokenContext.Provider
      value={{
        sellingToken,
        setSellingToken,
        buyingToken,
        setBuyingToken,
        // sellingTokenPrice,
        // buyingTokenPrice,
        sellingTokenAmount,
        setSellingTokenAmount,
        buyingTokenAmount,
        setBuyingTokenAmount,
        // gasFees,
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
