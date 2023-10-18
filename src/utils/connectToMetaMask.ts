import { ethers } from 'ethers';

interface MetaMaskState {
  provider: ethers.BrowserProvider | null;
  loading: boolean;
  error: string | null;
  address: string | null;
}

export const connectToMetaMask = async (): Promise<MetaMaskState> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (window.ethereum) {
        const ethereum = window.ethereum;

        const chainId = await ethereum.request({ method: 'eth_chainId' });

        if (chainId !== '0x89') {
          reject(
            new Error('Please connect to the Polygon Mainnet (chainId 137)'),
          );
          return;
        }

  
        ethereum.on('accountsChanged', (accounts: string[]) => {
          if (accounts.length === 0) {
            resolve({
              provider: null,
              loading: false,
              error: null,
              address: null,
            });
          }
        });

        const accounts = await ethereum.request({
          method: 'eth_requestAccounts',
        });

        const provider = new ethers.BrowserProvider(ethereum);

        const connectedAddress = accounts[0];

        resolve({
          provider,
          loading: false,
          error: null,
          address: connectedAddress, 
        });
      } else {
        reject(new Error('MetaMask not installed'));
      }
    } catch (error) {
      reject(error);
    }
  });
};
