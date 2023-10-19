import React, { useEffect, useState } from 'react';
import ConnectButton from './connect-button';
import AllowanceButton from './allowance-button';
import SwapButton from './swap-button';
import { useTokenContext } from '@/context/TokenContext';
import { connectToMetamask } from '@/services/connect-to-metamask';
import { useWallet } from '@/context/WalletContext';
import toast from 'react-hot-toast';
import { handleSwap } from '@/services/handle-swap';
import { handleAllowance } from '@/services/handle-allowance';
import { style } from './style';
import { FaSpinner } from 'react-icons/fa';

const Swap: React.FC = () => {
  // const [connectLoading, setConnectLoading] = useState(false);
  // const [allowanceLoading, setAllowanceLoading] = useState(false);
  // const [loading, setLoading] = useState(false);
  // const [swapLoading, setSwapLoading] = useState(false);
  // const { walletState, setWalletState } = useWallet();
  // const [allowanceSuccessful, setAllowanceSuccessful] = useState(false);

  // const {
  //   sellingToken,
  //   sellingTokenAmount,
  //   buyingToken,
  //   buyingTokenAmount,
  //   slippage,
  // } = useTokenContext();

  // useEffect(() => {
  //   if (walletState && walletState.accountAddress) {
  //     // Check if MetaMask is connected
  //     setAllowanceSuccessful(true);
  //   }
  // }, [walletState]);

  // const handleConnectClick = async (
  //   event: React.MouseEvent<HTMLButtonElement>,
  // ) => {
  //   event.preventDefault();
  //   await connectToMetamask(walletState, setWalletState);
  // };

  // const handleSwapClick = async (
  //   event: React.MouseEvent<HTMLButtonElement>,
  // ) => {
  //   event.preventDefault();
  //   setSwapLoading(true);
  //   try {
  //     await handleSwap({
  //       walletState,
  //       setLoading,
  //       sellingTokenAddress: sellingToken?.address,
  //       sellingTokenAmount: sellingTokenAmount,
  //       buyingTokenAddress: buyingToken?.address,
  //       slippage: slippage,
  //       sellingToken,
  //     });
  //   } catch (error) {
  //     console.error('Error occurred while swapping:', error);
  //     toast.error('Failed to swap');
  //   } finally {
  //     setSwapLoading(false);
  //   }
  // };

  // const handleAllowanceClick = async (
  //   event: React.MouseEvent<HTMLButtonElement>,
  // ) => {
  //   event.preventDefault();
  //   setLoading(true);
  //   try {
  //     await handleAllowance({
  //       walletState,
  //       setLoading,
  //       sellingTokenAddress: sellingToken?.address,
  //       accountAddress: walletState?.accountAddress,
  //       sellingTokenAmount,
  //       sellingToken: sellingToken!,
  //       setAllowanceSuccessful,
  //     });
  //   } catch (error) {
  //     console.error('Error occurred while setting allowance:', error);
  //     toast.error('Failed to set allowance');
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
      {/* {allowanceSuccessful ? (
        <SwapButton onClick={handleSwapClick} loading={swapLoading} />
      ) : (
        <div>
          {walletState.signer ? (
            <AllowanceButton
              onClick={handleAllowanceClick}
              loading={allowanceLoading}
            />
          ) : (
            <ConnectButton
              onClick={handleConnectClick}
              loading={connectLoading}
            />
          )}
        </div>
      )} */}

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
            walletState.signer !== null
              ? handleAllowanceClick
              : handleConnectClick
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

export default Swap;
