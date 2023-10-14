import { useState, useEffect } from 'react';
import axios from 'axios';
import { route } from '@/api-routes/api-routes';
import { Token } from '@/types';

interface TransactionResponse {
  data: any;
  error: {
    statusCode: number;
    description: string;
  } | null;
}

const useTransaction = (
  tokenAddress: string | undefined,
  sellingTokenAmount: number,
) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<TransactionResponse['error']>(null);
  const [transactionData, setTransactionData] = useState<
    TransactionResponse['data'] | null
  >(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const response = await axios.get<TransactionResponse>(
          route.transaction,
          {
            params: {
              tokenAddress: tokenAddress,
              amount: sellingTokenAmount,
            },
          },
        );

        if (response.data.error) {
          setError(response.data.error);
        } else {
          setTransactionData(response.data.data);
        }
      } catch (error) {
        setError({
          statusCode: 500,
          description: 'An error occurred while fetching transaction data.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();

    // Cleanup function if needed (e.g., cancelling API request)
    // return () => {
    //   cleanup logic here
    // };
  }, [tokenAddress, sellingTokenAmount]);

  return { loading, error, transactionData };
};

export default useTransaction;
