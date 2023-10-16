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
  Connector,
  useAccount,
  useConnect,
  useContractWrite,
  usePrepareContractWrite,
  useSendTransaction,
  useWaitForTransaction,
} from 'wagmi';
import { useTokenContext } from '@/context/TokenContext';
import { route } from '@/api-routes/api-routes';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const SwapButton: React.FC = () => {
  const { buyingToken, sellingToken, sellingTokenAmount, buyingTokenAmount } =
    useTokenContext();
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

  useEffect(() => {
    
  },[swapData])

  // const { config, error } = usePrepareContractWrite({
  //   address: serverConfig.SWAP_CONTRACT_ADDRESS as `0x${string}`,
  //   abi: ContractABI.abi,
  //   functionName: 'swap',
  //   value: parseEther(sellingTokenAmount?.toString()),
  //   args: [swapData.value, address,],
  // });

  // let value = swapData.value;

  const { config } = usePrepareContractWrite({
    address: '0xB2B5a0af82EcAeC21C8BB1b9B95c6ceFC0f15c00',
    abi: ContractABI.abi,
    chainId: 80001,
    value: parseEther('10'),
    functionName: 'swap',
    args: [
      address,
      {
        srcToken: sellingToken?.address,
        dstToken: buyingToken?.address,
        srcReceiver: address,
        dstReceiver: address,
        amount: parseEther('1'),
        minReturnAmount: parseEther('0.9'),
      },
      '0x',
      swapData.data,
    ],
    onSuccess(data) {
      console.log('Success', data);
    },
    onError(error) {
      console.log('Error', error);
    },
    onSettled(data, error) {
      console.log('Settled', { data, error });
    },
  });

  
    //console.log('usePrepareContractWrite', config, error, preparedData);

  const {
    data,
    isLoading,
    isSuccess,
    error: writingError,
    write,
  } = useContractWrite(config);
  // console.log(
  //   'usePrepareContractWrite',
  //   data,
  //   writingError,
  //   isLoading,
  //   isSuccess,
  // );

  // console.log(
  //   'data isLoading isSuccess error: writingError,',
  //   data,
  //   isLoading,
  //   isSuccess,
  //   writingError,
  // );

  const notifyError = (data: string) => toast.error(data);

  const swap = async () => {
    try {
      const response = await axios.get(route.swap, {
        params: {
          tokenIn: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
          tokenOut: '0xd6df932a45c0f255f85145f286ea0b292b21c90b',
          tokenInAmount: '1100',
          callerAddress: '0x4c569c1e541A19132AC893748E0ad54C7c989FF4',
          slippage: 2,
        },
      });
      //console.log('transaction', transaction.data.data);
      setSwapData(response.data.data.tx);
      //console.log('swap', response.data);
      console.log("swapData", swapData);
      // if (typeof write === 'function') {
      //   console.log("writing begin")
      //   await write();
      //   console.log('writing end');

      // }
      await write?.();
    } catch (error) {
      notifyError('insufficient fund');
      console.log('error at swap', error);
    }
  };

  // const transaction = async () => {
  //   try {
  //     const response = await axios.get(route.transaction, {
  //       params: {
  //         tokenAddress: sellingToken?.address,
  //         amount: sellingTokenAmount!,
  //       },
  //     });
  //     //console.log('transaction', transaction.data.data);
  //     setTransactionDetails(response.data.data);
  //     console.log('transaction', transactionDetails);
  //   } catch (error) {
  //     // notify();
  //     console.log('error at transaction', error);
  //   }
  // };

  // const allowance = async () => {
  //   console.log('called');
  //   try {
  //     const response = await axios.get(route.allowance, {
  //       params: {
  //         tokenAddress: sellingToken?.address,
  //         walletAddress: address,
  //       },
  //     });
  //     console.log('allowance', response.data.data.allowance);
  //     // if (allowance.data.data.allowance) {
  //     //   return;
  //     // }
  //     await transaction();
  //     //setTxDetails(transaction.data.data);
  //   } catch (error) {
  //     console.log('erroer at allowance ', error);
  //   }
  // };

  // const handleSwap = async () => {
  //   await swap();
  // };

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

  // const { connectors, connect, error, isLoading, isSuccess, pendingConnector } =
  //   useConnect();

  // const ethereum = (window as any).ethereum;

  // const executor = '0xB2B5a0af82EcAeC21C8BB1b9B95c6ceFC0f15c00'; // Address of the IAggregationExecutor contract
  // const srcToken = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'; // Address of the source token
  // const dstToken = '0x...'; // Address of the destination token
  // const srcReceiver = '0x754c1f12e680E3171e52D9390Fc17C9596d3daB0'; // Address of the source token receiver
  // const dstReceiver = '0x4c569c1e541A19132AC893748E0ad54C7c989FF4'; // Address of the destination token receiver
  // const amount = ethers.utils.parseUnits('1', 18); // Amount in Wei (1 token)
  // const minReturnAmount = ethers.utils.parseUnits('0.9', 18); // Minimum return amount in Wei (0.9 token)
  // const flags = 0; // Flags (if any)

  // // Encode permit and data parameters as bytes
  // const permit = '0x...'; // Replace with valid permit data
  // const data = '0x...'; // Replace with encoded data
  // const handleSwapContract = async () => {

  //   try {

  //     const provider = new ethers.providers.Web3Provider(ethereum);

  //     console.log('provider', provider);
  //     const contract = new ethers.Contract(
  //       '0xB2B5a0af82EcAeC21C8BB1b9B95c6ceFC0f15c00',
  //       ContractABI.abi,
  //       provider.getSigner(),
  //     );
  //     console.log('contract', contract?.address);

  //     const tx = await contract.swap(
  //       executor,
  //       {
  //         srcToken,
  //         dstToken,
  //         srcReceiver,
  //         dstReceiver,
  //         amount,
  //         minReturnAmount,
  //         flags,
  //       },
  //       permit,
  //       data, // Sending Ether along with the transaction if source token is ETH
  //     );

  //     console.log("tx",tx)
  //     // Wait for the transaction to be mined
  //     await tx.wait();

  //     console.log('Swap completed successfully!');
  //   } catch (error) {
  //     console.log('error at contract', error);
  //   }
  // };

  return (
    <div>
      {/* {isConnected ? (
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
      )} */}
      {/* <button
        className={style.button}
        onClick={() => {
          swap();
        }}
      >
        <p className="text-md text-white">swap</p>
      </button> */}
      {/* {!isConnected ? (
        connectors.map((connector) => (
          <button
            className={style.button}
            key={connector.id}
            onClick={() => connect({ connector })}
          >
            <p className="text-md text-white">Connect Wallet</p>
            {isLoading && connector.id === pendingConnector?.id && (
              <FaSpinner className="animate-spin" />
            )}
          </button>
        ))
      ) : (
        <button className={style.button} onClick={() => swap()}>
          <p className="text-md text-white">swap</p>
        </button>
      )} */}
      <button className={style.button} onClick={() => swap()}>
        <p className="text-md text-white">swap</p>
      </button>
    </div>
  );
};

export default SwapButton;
