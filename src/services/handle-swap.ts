import toast from 'react-hot-toast';
import { SwapResponse } from '@/types/index';
import { convertAmountToWei } from '@/helper/convert-amount-to-wei';
import { Token, WalletState } from '@/types';
import axios from 'axios';
import { route } from '@/config/api-routes';
import { ethers } from 'ethers';
import SmartContractABI from '../../abi/swap.json';
import { contractInteraction } from './contract-interaction';
import { serverConfig } from '@/config/serverConfig';

interface SwapHandlerProps {
  walletState?: WalletState;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sellingTokenAddress?: string;
  sellingTokenAmount?: string;
  buyingTokenAddress?: string;
  slippage?: number;
  sellingToken?: Token;
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
    if (!walletState?.signer || !sellingToken) {
      toast.error('Please connect to MetaMask');
      return;
    }
    console.log('handleSwap called');

    setLoading(true);

    const response = await axios.get(route.swap, {
      params: {
        tokenIn: sellingTokenAddress ?? '',
        tokenOut: buyingTokenAddress ?? '',
        tokenInAmount: convertAmountToWei(
          sellingTokenAmount ?? '0',
          sellingToken?.decimals ?? 18,
        ),
        callerAddress: walletState?.accountAddress ?? '',
        slippage: slippage ?? 1.5,
      },
    });

    console.log('response', response.data.data);
    if (response.data.error) {
      console.log('error');
      setLoading(false);
      toast.error('Unable to fetch swap details. Please try again.tx');
      return;
    }

    const interfaceResponse = new ethers.Interface(SmartContractABI.abi)
      .decodeFunctionData('swap', response.data.data.tx.data)
      .toObject();

    const desc = Object.values(interfaceResponse.desc);

    console.log(
      'final sending data',
      interfaceResponse.executor,
      desc,
      interfaceResponse.permit,
      interfaceResponse.data,

      {
        value: convertAmountToWei(sellingTokenAmount ?? '0', sellingToken?.decimals ?? 18),
      },
    );

    const oneInchContract = await contractInteraction(
      serverConfig.CONTRACT_ADDRESS ?? '',
      walletState.signer,
      SmartContractABI.abi,
    );

    if (!oneInchContract?.contract) {
      setLoading(false);
      toast.error('Contract not available');
      return;
    }

    const contractWithSigner = oneInchContract.contract.connect(
      walletState.signer,
    ) as any;

    const txHash = await contractWithSigner.swap(
      interfaceResponse.executor,
      desc,
      interfaceResponse.permit,
      interfaceResponse.data,
      {
        value: convertAmountToWei(sellingTokenAmount ?? '0', sellingToken?.decimals ?? 18),
      },
    );

    await txHash.wait();
    toast.success('Transaction successful');
  } catch (error) {
    setLoading(false);
    console.error('Error occurred while swapping:', error);
    toast.error('Failed to swap tokens');
  }
};
