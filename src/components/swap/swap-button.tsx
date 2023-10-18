import React, { useEffect } from 'react';
import { ethers } from 'ethers';
import { FaSpinner } from 'react-icons/fa';
import { useWallet } from '@/context/WalletContext';
import { connectToMetaMask } from '@/utils/connectToMetaMask';
import { style } from './style';
import toast from 'react-hot-toast';

const SwapButton: React.FC = () => {
  const { walletState, setWalletState } = useWallet();

  const handleConnectClick = async () => {
    setWalletState((prevState) => ({ ...prevState, loading: true }));

    try {
      const { provider, address, error, loading } = await connectToMetaMask();

      setWalletState({
        provider,
        loading: false,
        error: null,
        accountAddress: address,
        walletBalance: 0,
      });
    } catch (error) {
      setWalletState((prevState) => ({
        ...prevState,
        loading: false,
        error: (error as string) || 'Failed to connect to MetaMask',
      }));
    }
  };

  useEffect(() => {
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected, update the provider to null
        setWalletState((prevState) => ({
          ...prevState,
          provider: null,
          accountAddress: null,
          walletBalance: 0,
        }));
      }
    };

    // Listen for accountsChanged event
    if (walletState.provider) {
      walletState.provider.on('accountsChanged', handleAccountsChanged);
    }

    return () => {
      // Clean up the event listener when the component unmounts
      if (walletState.provider) {
        walletState.provider.removeListener(
          'accountsChanged',
          handleAccountsChanged,
        );
      }
    };
  }, [walletState.provider, setWalletState]);

  return (
    <div>
      {walletState.accountAddress ? (
        <button className={style.button}>
          <p className="text-md text-white">swap</p>
        </button>
      ) : (
        <button className={style.button} onClick={handleConnectClick}>
          {walletState.loading ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <p className="text-md text-white">Connect to MetaMask</p>
          )}
        </button>
      )}
    </div>
  );
};

export default SwapButton;
