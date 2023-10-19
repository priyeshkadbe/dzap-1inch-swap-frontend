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
import formatNumber from '@/helper/format-number';

interface SwapHandlerProps {
  walletState: WalletState | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sellingTokenAddress: string | undefined;
  sellingTokenAmount: string;
  buyingTokenAddress: string | undefined;
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
    if (!walletState) {
      toast.error('Please connect to MetaMask');
      return;
    }

    if (
      walletState.accountAddress &&
      sellingTokenAddress &&
      buyingTokenAddress
    ) {

      const response = await axios.get<SwapResponse>(route.swap, {
        params: {
          tokenIn: sellingTokenAddress,
          tokenOut: buyingTokenAddress,
          tokenInAmount: sellingTokenAmount,
          callerAddress: walletState?.accountAddress!,
          slippage: slippage,
        },
      });

      if (response.data.error) {
        toast.error('unable to fetch swap please try again');
        return;
      }
      setLoading(true);

      const swapFunctionParameters = new ethers.Interface(SmartContractABI.abi)
        .decodeFunctionData('swap', response.data.data?.tx.data!)
        .toObject();

      const swapParameter = [];
      Object.keys(swapFunctionParameters.desc).forEach(function (key) {
        swapParameter.push(swapFunctionParameters.desc[key]);
      });

      console.log('swap contract', swapFunctionParameters);

      const oneInchContract = await contractInteraction(
        serverConfig.CONTRACT_ADDRESS!,
        walletState?.provider!,
        SmartContractABI.abi!,
      );

      if (
        walletState.provider !== null &&
        sellingTokenAmount &&
        sellingToken?.decimals
      ) {
        const signer = await walletState?.provider.getSigner();

        const contractWithSigner = oneInchContract?.contract?.connect(
          signer,
        ) as any;

        const txHash = await contractWithSigner.swap(
          swapFunctionParameters.executor,
          swapFunctionParameters,
          swapFunctionParameters.permit,
          swapFunctionParameters.data,
          {
            value: convertAmountToWei(
              sellingTokenAmount,
              sellingToken?.decimals,
            ),
          },
        );

        await txHash.wait();
        await toast.success('Transaction successful');
      }
      setLoading(false);
    }
  } catch (error) {
    setLoading(false);
    console.error('Error occurred while swapping:', error);
    toast.error('failed to swap tokens');
  }
};
