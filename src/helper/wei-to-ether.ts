import { ethers } from 'ethers';

export default function WeiToEther(inputWei: string): string {
  // Convert inputWei to BigNumber
  const bigNumberWei = ethers.BigNumber.from(inputWei);
  console.log('bigNumberWei', bigNumberWei.toString());
  // Convert Wei to Ether
  const etherValue = ethers.utils.formatUnits(bigNumberWei, 'ether');

  console.log('etherValue', etherValue);
  // Round to 5 decimal places
  const roundedEther = parseFloat(etherValue).toFixed(5);

  return roundedEther;
}
