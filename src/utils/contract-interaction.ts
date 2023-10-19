import { ethers } from 'ethers';

interface ContractInteractionState {
  contract: ethers.Contract | null;
  loading: boolean;
  error: string | null;
}

export const contractInteraction = async (
  address: string,
  provider: ethers.BrowserProvider,
  abi: any,
): Promise<ContractInteractionState> => {
  try {
    const contract = new ethers.Contract(address, abi, provider);
    return { contract, loading: false, error: null };
  } catch (error) {
    console.error('Contract Interaction Error:', error);
    return {
      contract: null,
      loading: false,
      error: error as string,
    };
  }
};
