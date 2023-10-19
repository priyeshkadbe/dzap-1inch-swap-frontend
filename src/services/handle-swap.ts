import toast from 'react-hot-toast';
import { SwapResponse } from '@/types/index';
import { convertAmountToWei } from '@/helper/convert-amount-to-wei';
import { Token, WalletState } from '@/types';
import axios from 'axios';
import { route } from '@/api-routes/api-routes';
import { ethers } from 'ethers';
import SmartContractABI from '../../abi/swap.json';
import { contractInteraction } from './contract-interaction';
import { serverConfig } from '@/config/serverConfig';

interface SwapHandlerProps {
  walletState: WalletState | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sellingTokenAddress: string;
  sellingTokenAmount: string;
  buyingTokenAddress: string;
  slippage: number;
  sellingToken: Token | null;
}

export const handleSwap = async ({
  walletState,
  setLoading,
  sellingTokenAddress,
  sellingTokenAmount,
  buyingTokenAddress,
  slippage,
  sellingToken,
}: SwapHandlerProps): Promise<void> => {
  try {
    if (!walletState || !walletState.signer || !sellingToken) {
      toast.error('Please connect to MetaMask');
      return;
    }
    console.log("handleSwap called")

    setLoading(true);

    const response = await axios.get(route.swap, {
      params: {
        tokenIn: sellingTokenAddress,
        tokenOut: buyingTokenAddress,
        tokenInAmount: convertAmountToWei(sellingTokenAmount,sellingToken?.decimals!),
        callerAddress: walletState?.accountAddress!,
        slippage: slippage,
      },
    });

    console.log("response",response.data.data)
    if (response.data.error) {
      console.log("error")
      setLoading(false);
      toast.error('Unable to fetch swap details. Please try again.');
      return;
    }

    const swapFunctionParameters = new ethers.Interface(SmartContractABI.abi)
      .decodeFunctionData('swap', response.data.data?.tx.data!)
      .toObject();
    
    console.log('swapFunctionParameters', swapFunctionParameters);
    if (
      walletState.signer &&
      sellingTokenAmount &&
      sellingToken?.decimals &&
      serverConfig.CONTRACT_ADDRESS
    ) {
      const oneInchContract = await contractInteraction(
        serverConfig.CONTRACT_ADDRESS,
        walletState.signer,
        SmartContractABI.abi,
      );

      const contractWithSigner = oneInchContract?.contract?.connect(
        walletState.signer,
      ) as any;

      const txHash = await contractWithSigner.swap(
        sellingToken.address,
        
        {
          value: convertAmountToWei(sellingTokenAmount, sellingToken?.decimals),
        },
      );

      await txHash.wait();
      toast.success('Transaction successful');
    }

    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error('Error occurred while swapping:', error);
    toast.error('Failed to swap tokens');
  }
};
