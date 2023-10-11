"use client";
import { Route } from "@/Routes/Route";
import axios from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ethers } from "ethers";
import SWAP_ABI from "../../abi/swap.json";
import { serverConfig } from "@/config/serverConfig";
import { useAccount } from "wagmi";
import { Token } from "@/types";



interface TokenPrice {
  address: string;
  price: any;
}

interface TokenContextProps {
  sellingToken: Token | null;
  setSellingToken: Dispatch<SetStateAction<Token | null>>;
  buyingToken: Token | null;
  setBuyingToken: Dispatch<SetStateAction<Token | null>>;
  tokens: Token[];
  sellingTokenPrice: TokenPrice | null;
  buyingTokenPrice: TokenPrice | null;
  sellingTokenAmount: number;
  setSellingTokenAmount: Dispatch<SetStateAction<number>>;
  buyingTokenAmount: number | null;
  gasFees: number;
  
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sellingToken, setSellingToken] = useState<Token | null>(null);
  const [buyingToken, setBuyingToken] = useState<Token | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [sellingTokenPrice, setSellingTokenPrice] = useState<TokenPrice | null>(
    null
  );

  const [gasFees, setGasFees] = useState(0);
  const [buyingTokenPrice, setBuyingTokenPrice] = useState<TokenPrice | null>(
    null
  );
  const [sellingTokenAmount, setSellingTokenAmount] = useState<number>(0);
  const [buyingTokenAmount, setBuyingTokenAmount] = useState<number>(0);

  const { address, isConnecting, isDisconnected } = useAccount();

  

  return (
    <TokenContext.Provider
      value={{
        sellingToken,
        setSellingToken,
        buyingToken,
        setBuyingToken,
        tokens,
        sellingTokenPrice,
        buyingTokenPrice,
        sellingTokenAmount,
        setSellingTokenAmount,
        buyingTokenAmount,
        gasFees,
      }}
    >
      {children}
    </TokenContext.Provider>
  );
};

export const useTokenContext = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useTokenContext must be used within a TokenProvider");
  }
  return context;
};

