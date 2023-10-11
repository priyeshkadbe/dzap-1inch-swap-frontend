import { useState, useEffect } from "react";
import { ethers } from "ethers";
import SWAP_ABI from "../../abi/swap.json";
import { serverConfig } from "@/config/serverConfig";
import { useAccount } from "wagmi";
import { Token } from "@/types";

interface SwapResult {
  success: boolean;
  error: string | null;
  loading: boolean;
}

const useTokenSwap = (
  sellingToken: Token | null,
  buyingToken: Token | null,
  sellingTokenAmount: number
): SwapResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { address } = useAccount();

  useEffect(() => {
    if (sellingToken && buyingToken && sellingTokenAmount > 0) {
      const swapTokens = async () => {
        setLoading(true);
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
            srcToken: sellingToken.address,
            dstToken: buyingToken.address, 
            srcReceiver: address, 
            dstReceiver: address, 
            amount: ethers.parseUnits(sellingTokenAmount.toString()), 
            minReturnAmount: ethers.parseEther(
              (sellingTokenAmount * 0.9).toString()
            ),
            flags: 0, 
          };
          const data = "0x...";
          const swapResult = await swapContract.swap(desc, data, {
            value: desc.amount, 
          });

          await swapResult.wait();
          setSuccess(true);
          setError(null);
        } catch (error) {
          console.error("Error occurred while swapping tokens:", error);
          setSuccess(false);
          setError("Error occurred while swapping tokens. Please try again.");
        } finally {
          setLoading(false);
        }
      };

      swapTokens();
    }
  }, [sellingToken, buyingToken, sellingTokenAmount, address]);

  return { success, error, loading };
};

export default useTokenSwap;
