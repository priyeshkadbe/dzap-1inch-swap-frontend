import React, { useEffect, useState } from 'react';
import { useTokenContext } from '@/context/TokenContext';
import { connectToMetamask } from '@/services/connect-to-metamask';
import { useWallet } from '@/context/WalletContext';
import toast from 'react-hot-toast';
import { handleSwap } from '@/services/handle-swap';
import { handleAllowance } from '@/services/handle-allowance';

import Button from './button';

const Swap: React.FC = () => {
  const { walletState, setWalletState } = useWallet();
  const [loading, setLoading] = useState(false);
  const [swapLoading, setSwapLoading] = useState(false);
  const [allowanceSuccessful, setAllowanceSuccessful] = useState(false);

  const {
    sellingToken,
    sellingTokenAmount,
    buyingToken,
    buyingTokenAmount,
    slippage,
  } = useTokenContext();

  useEffect(() => {
    console.log('walletState', walletState);
  }, [walletState, loading]);

  const handleConnectClick = async () => {
    await connectToMetamask(walletState, setWalletState, setLoading);
  };

  const handleSwapClick = async () => {
    setSwapLoading(true);

    try {
      if (sellingToken && buyingToken && sellingTokenAmount) {
        await handleSwap({
          walletState: walletState!,
          setLoading,
          sellingTokenAddress: sellingToken.address,
          sellingTokenAmount,
          buyingTokenAddress: buyingToken.address,
          slippage,
          sellingToken,
        });
      } else {
        throw new Error('Invalid token or amount data');
      }
    } catch (error) {
      console.error('Error occurred while swapping:', error);
      toast.error('Failed to swap');
    } finally {
      setSwapLoading(false);
    }
  };

  const handleAllowanceClick = async () => {
    setLoading(true);
    try {
      if (sellingToken && sellingTokenAmount) {
        await handleAllowance({
          walletState: walletState!,
          setLoading,
          sellingTokenAddress: sellingToken.address,
          accountAddress: walletState?.accountAddress,
          sellingTokenAmount,
          sellingToken,
          setAllowanceSuccessful,
        });
      } else {
        throw new Error('Invalid token or amount data');
      }
    } catch (error) {
      console.error('Error occurred while setting allowance:', error);
      toast.error('Failed to set allowance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {allowanceSuccessful ? (
        <Button
          onClick={handleSwapClick}
          disabled={swapLoading}
          loading={swapLoading}
          text="Swap"
        />
      ) : (
        <Button
          onClick={
            walletState.signer ? handleAllowanceClick : handleConnectClick
          }
          disabled={loading || swapLoading}
          loading={loading}
          text={
            walletState.accountAddress
              ? 'Approve for Swap'
              : 'Connect to MetaMask'
          }
        />
      )}
    </div>
  );
};

export default Swap;
