import toast from 'react-hot-toast';
import { Token, WalletState } from '@/types';
import { contractInteraction } from '@/services/contract-interaction';
import IERC20 from '../../abi/IERC20.json';
import { convertAmountToWei } from '@/helper/convert-amount-to-wei';
import { serverConfig } from '@/config/serverConfig';
import { route } from '@/api-routes/api-routes';
import axios from 'axios';

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

    const response = await axios.get(route.allowance, {
      params: {
        tokenAddress: sellingTokenAddress,
        walletAddress: walletState.accountAddress,
      },
    });

    if (!response || response.data.allowance === '0') {
      setLoading(false);
      toast.error('Allowance not found');
      return;
    }

    const tokenContract = await contractInteraction(
      sellingTokenAddress,
      walletState.signer!,
      IERC20.abi,
    );

    if (tokenContract && walletState.signer) {
      const contractWithSigner = (await tokenContract.contract?.connect(
        walletState.signer,
      )) as any;

      if (!contractWithSigner) {
        setLoading(false);
        toast.error('Failed to connect to the token contract with signer.');
        return;
      }

      const txHash = await contractWithSigner.approve(
        serverConfig.CONTRACT_ADDRESS,
        convertAmountToWei(sellingTokenAmount, sellingToken.decimals),
      );

      if (txHash) {
        await txHash.wait();
        await toast.success('Transaction successful');
        setAllowanceSuccessful(true);
        console.log('Transaction Hash:', txHash.hash);
      } else {
        setLoading(false);
        toast.error('Transaction failed');
      }
    } else {
      setLoading(false);
      toast.error('Token contract or signer not available.');
    }
  } catch (error) {
    setLoading(false);
    console.error('Error occurred while checking allowance:', error);
    toast.error('Failed to check allowance');
  }
};
