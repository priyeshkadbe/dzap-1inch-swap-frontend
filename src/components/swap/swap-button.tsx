import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { style } from './style';
import { etherUnits } from 'viem';
import { ethers } from 'ethers';
import { serverConfig } from '@/config/serverConfig';
import ContractABI from '../../../abi/swap.json';
import { parseEther } from 'viem';
import axios from 'axios';
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi';
import { useTokenContext } from '@/context/TokenContext';
import { route } from '@/api-routes/api-routes';
import toast, { Toaster } from 'react-hot-toast';

const SwapButton: React.FC = () => {
  const { buyingToken, sellingToken, sellingTokenAmount } = useTokenContext();
  const { isConnected, address } = useAccount();

  useEffect(() => {}, [buyingToken, sellingToken, sellingTokenAmount]);

  const [transactionDetails, setTransactionDetails] = useState({
    to: null,
    data: null,
    value: null,
  });

  const [swapData, setSwapData] = useState({
    from: null,
    toAmount: null,
    data: null,
    value: null,
    gas: null,
    gasPrice: null,
  });

  // const { config, error } = usePrepareContractWrite({
  //   address: serverConfig.SWAP_CONTRACT_ADDRESS as `0x${string}`,
  //   abi: ContractABI.abi,
  //   functionName: 'swap',
  //   value: parseEther(sellingTokenAmount?.toString()),
  //   args: [swapData.value, address],
  // });

  //console.log('usePrepareContractWrite', config, error);

  // const {
  //   data,
  //   isLoading,
  //   isSuccess,
  //   error: writingError,
  // } = useContractWrite(config);
  // console.log(
  //   'usePrepareContractWrite',
  //   data,
  //   writingError,
  //   isLoading,
  //   isSuccess,
  // );

  const notifyError = (data: string) => toast.error(data);

  const swap = async () => {
    try {
      const response = await axios.get(route.swap, {
        params: {
          tokenIn: sellingToken?.address,
          tokenOut: buyingToken?.address,
          tokenInAmount: sellingTokenAmount!,
          callerAddress: '0x4c569c1e541A19132AC893748E0ad54C7c989FF4',
          slippage: 2,
        },
      });
      //console.log('transaction', transaction.data.data);
      setSwapData(response.data.data.tx);
      console.log('swap', response.data.data.tx);
    } catch (error) {
      notifyError('insufficient fund');
      console.log('error at swap', error);
    }
  };

  const transaction = async () => {
    try {
      const response = await axios.get(route.transaction, {
        params: {
          tokenAddress: sellingToken?.address,
          amount: sellingTokenAmount!,
        },
      });
      //console.log('transaction', transaction.data.data);
      setTransactionDetails(response.data.data);
      console.log('transaction', transactionDetails);
    } catch (error) {
      // notify();
      console.log('error at transaction', error);
    }
  };

  const allowance = async () => {
    console.log('called');
    try {
      const response = await axios.get(route.allowance, {
        params: {
          tokenAddress: sellingToken?.address,
          walletAddress: address,
        },
      });
      console.log('allowance', response.data.data.allowance);
      // if (allowance.data.data.allowance) {
      //   return;
      // }
      await transaction();
      //setTxDetails(transaction.data.data);
    } catch (error) {
      console.log('erroer at allowance ', error);
    }
  };

  // const handleSwap = async () => {
  //   await allowance();
  //   await transaction();
  // }

  //   const fetchTransactionDetails = async () => {
  //   try {
  //     const response = await axios.get(route.transaction, {
  //       params: {
  //         tokenAddress: sellingToken?.address,
  //         amount: sellingTokenAmount!,
  //       },
  //     });
  //     return response.data.data;
  //   } catch (error) {
  //     console.log("Error fetching transaction details: ", error);
  //     throw error; // Re-throw the error to handle it at a higher level if needed
  //   }
  // };

  // const fetchAllowance = async () => {
  //   try {
  //     const response = await axios.get(route.allowance, {
  //       params: {
  //         tokenAddress: sellingToken?.address,
  //         walletAddress: address,
  //       },
  //     });
  //     return response.data.data.allowance;
  //   } catch (error) {
  //     console.log("Error fetching allowance: ", error);
  //     throw error;
  //   }
  // };

  // const handleSwap = async () => {
  //   try {
  //     console.log("Called handleSwap");
  //     const allowanceAmount = await fetchAllowance();

  //     if (allowanceAmount > 0) {
  //       const transactionDetails = await fetchTransactionDetails();
  //       console.log("Transaction Details: ", transactionDetails);
  //       setTransactionDetails(transactionDetails);
  //     } else {
  //       console.log("Allowance amount is 0 or negative. Cannot proceed with transaction.");
  //     }
  //   } catch (error) {
  //     console.log("Error handling swap: ", error);

  //   }
  // };

  return (
    <div>
      {isConnected ? (
        <button
          className={style.button}
          onClick={() => {
            swap();
          }}
        >
          <p className="text-md text-white">swap</p>
        </button>
      ) : (
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      )}
    </div>
  );
};

export default SwapButton;
