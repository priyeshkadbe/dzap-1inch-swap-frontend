"use client"
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';

interface WalletState {
  provider: any; // Replace 'any' with the appropriate type for your MetaMask provider
  loading: boolean;
  error: null | string;
  accountAddress: null | string;
  walletBalance: number;
}

interface WalletContextProps {
  walletState: WalletState;
  setWalletState: Dispatch<SetStateAction<WalletState>>;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletState, setWalletState] = useState<WalletState>({
    provider: null,
    loading: false,
    error: null,
    accountAddress: null,
    walletBalance: 0,
  });

  return (
    <WalletContext.Provider value={{ walletState, setWalletState }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextProps => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
