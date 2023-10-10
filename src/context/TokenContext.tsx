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

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await axios.get(Route.fetchTokens);
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

  const fetchTokenPrice = async (
    token: Token | null,
    setTokenPrice: Dispatch<SetStateAction<TokenPrice | null>>
  ) => {
    if (token !== null) {
      try {
        const response = await axios.get(Route.fetchTokens + token.address);
        const [address, price] = Object.entries(response.data.data)[0];
        const tokenPrice: TokenPrice = {
          address: address,
          price: price,
        };
        setTokenPrice(tokenPrice);
        // setSellingTokenPrice(tokenPrice.price)
        console.log("saved", tokenPrice.price);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchTokenPrice(sellingToken, setSellingTokenPrice);
  }, [sellingToken]);

  useEffect(() => {
    fetchTokenPrice(buyingToken, setBuyingTokenPrice);
  }, [buyingToken]);

  const calculateReceivingToken = async () => {
    if (sellingToken && buyingToken && sellingTokenAmount > 0) {
      try {
        let requestData = {
          tokenIn: sellingToken.address,
          tokenOut: buyingToken.address,
          tokenInAmount: sellingTokenAmount.toString(),
        };

        const response = await axios.get(
          "http://localhost:5000/api/v1/get-quote",
          {
            params: requestData,
          }
        );

        const { toAmount, gas } = response.data.data;
        console.log("da", toAmount, gas);
        setBuyingTokenAmount(toAmount);
        setGasFees(gas);
      } catch (error) {
        console.error("Error calculating receiving token:", error);
      }
    } else {
      setBuyingTokenAmount(0);
    }
  };

  useEffect(() => {
    calculateReceivingToken();
  }, [sellingTokenAmount, sellingToken]);

  const handleSwap = async () => {
    try {
      const provider = new ethers.AlchemyProvider(
        "mainnet",
        serverConfig.ALCHEMY_API_KEY
      );

      const swapContract = new ethers.Contract(
        serverConfig.SWAP_CONTRACT_ADDRESS!,
        SWAP_ABI,
        provider
      );

      const desc = {
        srcToken: sellingToken, // Source token address
        dstToken: buyingToken, // Destination token address
        srcReceiver: address, // Source token receiver address
        dstReceiver: address, // Destination token receiver address
        amount: ethers.parseUnits(sellingTokenAmount.toString()), // Amount to swap (1 Ether in this example)
        minReturnAmount: ethers.parseEther(buyingTokenAmount.toString()), // Minimum return amount (0.9 Ether in this example)
        flags: 0, // Flags (if any)
      };
      const data = "0x..."; // Additional data for the swap

      // Perform the swap
      const swapResult = await swapContract.swap(desc, data, {
        value: desc.amount, // Send Ether if the swap function is payable
      });

      // Wait for the transaction to be mined
      await swapResult.wait();
    } catch (error) {
      console.error("Error occurred while swapping tokens:", error);
    }
  };

  useEffect(() => {
    handleSwap();
  }, []);

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

