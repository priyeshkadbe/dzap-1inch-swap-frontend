import toast from 'react-hot-toast';
import checkAllowance from '@/utils/checkAllowance';
import { fetchSwapData } from '@/utils/fetchSwapData';
import { convertAmountToWei } from '@/helper/convert-amount-to-wei';
import { WalletState } from '@/types';

interface SwapHandlerProps {
  walletState: WalletState | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sellingTokenAddress: string | undefined;
  sellingTokenAmount: string;
  buyingTokenAddress: string | undefined;
  slippage: number;
}

export const handleSwap = async ({
  walletState,
  setLoading,
  sellingTokenAddress,
  sellingTokenAmount,
  buyingTokenAddress,
  slippage,
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
      const responseCheck = await checkAllowance(
        sellingTokenAddress,
        walletState.accountAddress,
      );

      if (responseCheck?.allowance === '0') {
        toast.error('Allowance not found');
        return;
      }

      const response = await fetchSwapData(
        sellingTokenAddress,
        buyingTokenAddress,
        convertAmountToWei(sellingTokenAmount, 18), // Assuming decimals for token amounts is 18, adjust if different
        walletState.accountAddress,
        slippage,
      );

      if (response.data) {
        // Handle the response data as needed
      }
    }
  } catch (error) {
    console.error('Error occurred while checking allowance:', error);
    toast.error('Failed to check allowance');
  }
};
