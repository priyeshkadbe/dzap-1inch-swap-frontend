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

  buyingTokenAmount:number|null;
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

  const [buyingTokenPrice,setBuyingTokenPrice]=useState<TokenPrice|null>(null)

const [sellingTokenAmount,setSellingTokenAmount]=useState<number>(0)
const [buyingTokenAmount, setBuyingTokenAmount] = useState<number>(0);


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
          Route.fetchTokenPrice + sellingToken?.address
        );

        // Extract key and value from the response object
        const [address, price] = Object.entries(response.data.data)[0];

        // Create a new TokenPrice object
        const tokenPrice: TokenPrice = {
          address: address,
          price: price,
        };

        // Set the state with the new TokenPrice object
        setSellingTokenPrice(tokenPrice);

        console.log("saved", tokenPrice.price);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (sellingToken !== null) {
      fetchToken();
    }
  }, [sellingToken]);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await axios.get(
          Route.fetchTokenPrice + buyingToken?.address
        );

        // Extract key and value from the response object
        const [address, price] = Object.entries(response.data.data)[0];

        // Create a new TokenPrice object
        const tokenPrice: TokenPrice = {
          address: address,
          price: price,
        };

        // Set the state with the new TokenPrice object
        setBuyingTokenPrice(tokenPrice);

        console.log("saved", tokenPrice.price);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (buyingToken !== null) {
      fetchToken();
    }
  }, [buyingToken]);

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
        buyingTokenAmount
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
