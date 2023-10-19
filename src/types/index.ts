import { ethers } from 'ethers';

export interface Token {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  logoURI: string;
  tags: string[];
}

export interface TokenPrice {
  address: string;
  price: any;
}

interface SwapTransaction {
  from: string;
  to: string;
  data: string;
  value: string;
  gas: number;
  gasPrice: string;
}

export interface SwapData {
  toAmount: string;
  tx: SwapTransaction;
}

export interface SwapResponse {
  data: SwapData | null;
  error: string | { statusCode: number; description: string } | null;
}

export interface WalletState {
  provider: ethers.BrowserProvider | null;
  loading: boolean;
  error: null | string;
  accountAddress: null | string;
}
