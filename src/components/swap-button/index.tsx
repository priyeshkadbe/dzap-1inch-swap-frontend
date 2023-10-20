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
  const handleConnectClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    await connectToMetamask(walletState, setWalletState, setLoading);
  };

  const handleSwapClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();

    setSwapLoading(true);

    try {
      await handleSwap({
        walletState,
        setLoading,
        sellingTokenAddress: sellingToken?.address!,
        sellingTokenAmount: sellingTokenAmount!,
        buyingTokenAddress: buyingToken?.address!,
        slippage: slippage,
        sellingToken,
      });
    } catch (error) {
      console.error('Error occurred while swapping:', error);
      toast.error('Failed to swap');
    } finally {
      setSwapLoading(false);
    }
  };

  const handleAllowanceClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    console.log('clicked');
    setLoading(true);
    try {
      await handleAllowance({
        walletState,
        setLoading,
        sellingTokenAddress: sellingToken?.address,
        accountAddress: walletState?.accountAddress,
        sellingTokenAmount,
        sellingToken: sellingToken!,
        setAllowanceSuccessful,
      });
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
