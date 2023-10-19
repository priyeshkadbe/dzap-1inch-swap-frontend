import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useWallet } from '@/context/WalletContext';
import { style } from './style';
import toast from 'react-hot-toast';
import { useTokenContext } from '@/context/TokenContext';
import { connectToMetamask } from '@/utils/connect-to-metamask';
import { handleAllowance } from '@/utils/handle-allowance';
import { handleSwap } from '@/utils/handle-swap';

const SwapButton: React.FC = () => {
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

  const handleConnect = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await connectToMetamask(walletState, setWalletState);
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
        sellingTokenAddress: sellingToken?.address,
        sellingTokenAmount: sellingTokenAmount,
        buyingTokenAddress: buyingToken?.address,
        slippage: slippage,
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
        <button
          className={style.button}
          onClick={handleSwapClick}
          disabled={swapLoading}
        >
          {swapLoading ? (
            <FaSpinner className="animate-spin text-gray-400" />
          ) : (
            <p className="text-md text-white">Swap</p>
          )}
        </button>
      ) : (
        <button
          className={style.button}
          onClick={
            walletState.provider ? handleAllowanceClick : handleConnect
          }
          disabled={loading || swapLoading}
        >
          {loading ? (
            <FaSpinner className="animate-spin text-gray-400" />
          ) : (
            <p className="text-md text-white">
              {walletState.accountAddress
                ? 'Grant Permission to Swap'
                : 'Connect to MetaMask'}
            </p>
          )}
        </button>
      )}
    </div>
  );
};

export default SwapButton;
