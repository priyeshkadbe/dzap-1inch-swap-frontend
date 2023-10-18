import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useWallet } from '@/context/WalletContext';
import { style } from './style';
import { serverConfig } from '@/config/serverConfig';
import toast from 'react-hot-toast';
import checkAllowance from '@/utils/checkAllowance';
import { useTokenContext } from '@/context/TokenContext';
import { contractInteraction } from '@/utils/contract-interaction';
import { convertAmountToWei } from '@/helper/convert-amount-to-wei';
import IERC20 from '../../../abi/IERC20.json';
import { fetchSwapData } from '@/utils/fetchSwapData';
import { SwapData } from '@/types';
import OneInchContract from '../../../abi/swap.json';
import { ethers } from 'ethers';
const ConnectButton: React.FC = () => {
  const { walletState, setWalletState } = useWallet();

  const [swapData, setSwapData] = useState<SwapData | null>(null);

  const {
    sellingToken,
    sellingTokenAmount,
    buyingToken,
    buyingTokenAmount,
    slippage,
  } = useTokenContext();

  const handleConnect = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.BrowserProvider(window.ethereum);
        setWalletState({
          provider,
          loading: false,
          error: null,
          accountAddress: null,
        });

        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletState((prevState) => ({
          ...prevState,
          accountAddress: address,
        }));
        console.log('Connected user address:', address);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        setWalletState((prevState) => ({
          ...prevState,
          loading: false,
          error: 'Failed to connect to MetaMask',
        }));
      }
    } else {
      console.error('MetaMask is not installed');
      setWalletState((prevState) => ({
        ...prevState,
        loading: false,
        error: 'MetaMask is not installed',
      }));
    }
  };

  const handleSwap = async () => {
    try {
      if (!walletState) {
        toast.error('Please connect to MetaMask');
        return;
      }

      if (walletState.accountAddress && sellingToken?.address) {
        const responseCheck = await checkAllowance(
          sellingToken?.address,
          walletState.accountAddress,
        );

        console.log('allowanceData', responseCheck);
        if (responseCheck?.allowance === '0') {
          toast.error('Allowance not found');
          return;
        }


        const response = await fetchSwapData(
          sellingToken.address,
          buyingToken?.address,
          convertAmountToWei(sellingTokenAmount, sellingToken.decimals),
         walletState.accountAddress,
          slippage,
        );
        console.log('response', response.data);
        if (response.data) {
          setSwapData(response?.data);
          console.log('swapdata', swapData);
        }
      }
    } catch (error) {
      console.error('Error occurred while checking allowance:', error);
      toast.error('Failed to check allowance');
    }
  };

  return (
    <button
      className={style.button}
      onClick={() => (walletState.provider ? handleSwap() : handleConnect())}
    >
      {walletState.loading ? (
        <FaSpinner className="animate-spin text-gray-400" />
      ) : (
        <p className="text-md text-white">
          {walletState.accountAddress ? 'swap' : 'Connect to MetaMask'}
        </p>
      )}
    </button>
    
  );
};

export default ConnectButton;
