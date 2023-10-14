import { useState, useEffect } from 'react';
import axios from 'axios';
import { route } from '@/api-routes/api-routes';

interface AllowanceResponse {
  data: any;
  error: {
    statusCode: number;
    description: string;
  } | null;
}

const useAllowance = (
  tokenAddress: string | undefined,
  walletAddress: string,
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AllowanceResponse['error']>(null);
  const [allowanceData, setAllowanceData] = useState<AllowanceResponse['data'] | null>(null);

  useEffect(() => {
    const fetchAllowance = async () => {
      try {
        const response = await axios.get<AllowanceResponse>(route.allowance, {
          params: {
            tokenAddress: tokenAddress,
            walletAddress: walletAddress,
          },
        });

        if (response.data.error) {
          setError(response.data.error);
        } else {
          setAllowanceData(response.data.data);
        }
      } catch (error) {
        setError({
          statusCode: 500,
          description: 'An error occurred while fetching allowance data.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAllowance();

    // Cleanup function if needed (e.g., cancelling API request)
    // return () => {
    //   cleanup logic here
    // };
  }, [tokenAddress, walletAddress]);

  return { loading, error, allowanceData };
};

export default useAllowance;
