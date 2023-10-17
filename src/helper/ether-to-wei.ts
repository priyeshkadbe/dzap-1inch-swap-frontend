import { ethers } from 'ethers';

export default function EtherToWei(inputEther: string): string {
  // Convert inputEther to BigNumber with 18 decimal places (1 Ether = 10^18 Wei)
  const bigNumberEther = ethers.utils.parseUnits(inputEther, 'ether');

  // Convert Ether to Wei
  const weiValue = bigNumberEther.toString();

  return weiValue;
}
