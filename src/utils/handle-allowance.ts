import toast from 'react-hot-toast';
import { Token, WalletState } from '@/types';
import checkAllowance from '@/utils/checkAllowance';
import { contractInteraction } from '@/utils/contract-interaction';
import IERC20 from '../../abi/IERC20.json';
import { convertAmountToWei } from '@/helper/convert-amount-to-wei';
import { serverConfig } from '@/config/serverConfig';

interface AllowanceHandlerProps {
  walletState: WalletState | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sellingTokenAddress?: string | null;
  accountAddress: string | null;
  sellingTokenAmount: string;
  sellingToken: Token;
  setAllowanceSuccessful: React.Dispatch<React.SetStateAction<boolean>>;
}



export const handleAllowance = async ({
  sellingToken,
  walletState,
  setLoading,
  sellingTokenAddress,
  accountAddress,
  sellingTokenAmount,
  setAllowanceSuccessful,
}: AllowanceHandlerProps): Promise<void> => {
  try {
    if (!walletState || !accountAddress || !sellingTokenAddress) {
      toast.error(
        'Please connect to MetaMask and provide necessary token information.',
      );
      return;
    }
    setLoading(true);
    const responseCheck = await checkAllowance(
      sellingTokenAddress,
      accountAddress,
    );

    if (responseCheck?.allowance === '0') {
      setLoading(false);
      toast.error('Allowance not found');
      return;
    }

    const tokenContract = await contractInteraction(
      sellingTokenAddress,
      walletState.provider!,
      IERC20.abi,
    );

    if (tokenContract && walletState.provider) {
      const signer = await walletState?.provider.getSigner();

      const contractWithSigner = tokenContract?.contract?.connect(signer) as any;

      const txHash = await contractWithSigner?.approve(
        serverConfig.CONTRACT_ADDRESS,
        convertAmountToWei(sellingTokenAmount, sellingToken.decimals),
      );

      await txHash?.wait();
      await toast.success('Transaction successful');
      setAllowanceSuccessful(true);
      console.log('Transaction Hash:', txHash?.hash);
    }
    setLoading(false);
  } catch (error) {
    setLoading(false);
    console.error('Error occurred while checking allowance:', error);
    toast.error('Failed to check allowance');
  }
};
