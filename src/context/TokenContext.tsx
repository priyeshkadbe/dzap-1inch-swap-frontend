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

interface Token {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  logoURI: string;
  tags: string[];
}

interface TokenPrice{
  address: string;
  price: string;
}

interface TokenContextProps {
  sellingToken: Token | null;
  setSellingToken: Dispatch<SetStateAction<Token | null>>;
  buyingToken: Token | null;
  setBuyingToken: Dispatch<SetStateAction<Token | null>>;
  tokens: Token[];
}

const TokenContext = createContext<TokenContextProps | undefined>(undefined);

export const TokenProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [sellingToken, setSellingToken] = useState<Token | null>(
    null
  );
  const [buyingToken, setBuyingToken] = useState<Token | null>(null);
  const [tokens, setTokens] = useState<Token[]>([]);
  const [sellingTokenPrice, setSellingTokenPrice] = useState<TokenPrice|null>(null);
  
  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get(Route.fetchAllTokens);
        const tokenData = response.data.data.tokens;
        const tokenArray: Token[] = [];
        for (const key in tokenData) {
          if (tokenData.hasOwnProperty(key)) {
            tokenArray.push(tokenData[key]);
          }
        }
        setTokens(tokenArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTokens();
  }, []); 


  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/tokens/{sellingToken?.address}`
        );
        // const tokenData = response.data.data.tokens;
        // const tokenArray: Token[] = [];
        // for (const key in tokenData) {
        //   if (tokenData.hasOwnProperty(key)) {
        //     tokenArray.push(tokenData[key]);
        //   }
        // }
        console.log("price is",response)
        // setTokens(tokenArray);
        setSellingTokenPrice(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchToken();
  },[sellingToken])

  return (
    <TokenContext.Provider
      value={{
        sellingToken,
        setSellingToken,
        buyingToken,
        setBuyingToken,
        tokens
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
