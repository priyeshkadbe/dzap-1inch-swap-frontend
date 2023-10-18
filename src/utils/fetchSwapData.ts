import axios from 'axios';
import { route } from '@/api-routes/api-routes';
import { SwapData } from '@/types';

export interface SwapResponse {
  data: SwapData | null;
  error: string | { statusCode: number; description: string } | null;
}

export const fetchSwapData = async (
  sellingTokenAddress: string | undefined,
  buyingTokenAddress: string | undefined,
  sellingTokenAmount: string,
  address: string,
  slippage: number,
): Promise<SwapResponse> => {
  try {
    const response = await axios.get<SwapResponse>(route.swap, {
      params: {
        tokenIn: sellingTokenAddress,
        tokenOut: buyingTokenAddress,
        tokenInAmount: sellingTokenAmount,
        callerAddress: address,
        slippage: slippage,
      },
    });
    console.log('bhai response', response);
    if (response.data.error) {
      return {
        error: response.data.error,
        data: null,
      };
    } else {
      return {
        error: null,
        data: response.data.data,
      };
    }
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    return {
      error: {
        statusCode: 500,
        description: 'An error occurred while fetching data.',
      },
      data: null,
    };
  }
};
