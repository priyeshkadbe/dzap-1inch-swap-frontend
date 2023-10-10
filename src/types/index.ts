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

