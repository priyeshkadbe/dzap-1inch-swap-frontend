import axios from 'axios';
import { route } from '@/api-routes/api-routes';

interface AllowanceData {
  allowance: string;
}

interface ApiResponse {
  status: number;
  data: AllowanceData;
  success: boolean;
  error: string;
}

const fetchAllowanceData = async (
  tokenAddress: string,
  walletAddress: string,
): Promise<AllowanceData | null> => {
  try {
    const url =
      route.allowance +
      `?tokenAddress=${tokenAddress}&walletAddress=${walletAddress}`;

    const response = await axios.get<ApiResponse>(url);

    if (response.data.success && response.data.status === 200) {
      return response.data.data;
    } else {
      console.error('Error in API response:', response.data.error);
      return null;
    }
  } catch (error) {
    console.error('Error fetching allowance data:', error);
    return null;
  }
};

export default fetchAllowanceData;
