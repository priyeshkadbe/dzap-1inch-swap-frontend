import { WalletState } from '@/types';
import { ethers } from 'ethers';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

export const connectToMetamask = async (
  walletState: WalletState,
  setWalletState: Dispatch<SetStateAction<WalletState>>,
  setLoading: (loading: boolean) => void,
) => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      setLoading(true);
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (chainId !== '0x89') {
        toast.error('Please switch to the Polygon Mainnet network');
        setLoading(false)
        return;
      }
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.BrowserProvider(window.ethereum);

      const signer = await provider.getSigner();
      const address = (await signer).address;
      setWalletState((prevState: WalletState) => ({
        ...prevState,
        signer: signer,
        loading: false,
        error: null,
        accountAddress: address,
      }));
      setLoading(false);
      console.log('Connected user address:', address);
      return signer;
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      setWalletState((prevState: WalletState) => ({
        ...prevState,
        loading: false,
        error: 'Failed to connect to MetaMask',
      }));
      setLoading(false)
      throw error;
    }
  } else {
    console.error('MetaMask is not installed');
    setWalletState((prevState: WalletState) => ({
      ...prevState,
      loading: false,
      error: 'MetaMask is not installed',
    }));
    return null;
  }
};
