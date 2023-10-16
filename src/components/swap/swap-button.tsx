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
  Address,
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
import { connected } from 'process';

const SwapButton: React.FC = () => {
  const { buyingToken, sellingToken, sellingTokenAmount, buyingTokenAmount,slippage } =
    useTokenContext();
  const { isConnected, address } = useAccount();

  useEffect(() => {}, [buyingToken, sellingToken, sellingTokenAmount]);

  const [swapData, setSwapData] = useState({
    from: null,
    toAmount: null,
    data: null,
    value: null,
    gas: null,
    gasPrice: null,
  });

  useEffect(() => {}, [swapData]);

  const { config } = usePrepareContractWrite({
    address: '0xd9145CCE52D386f254917e481eB44e9943F39138' as Address,
    abi: ContractABI.abi,
    chainId: 80001,
    value: parseEther('0.01'),
    functionName: 'swap',
    args: [
      address,
      {
        executor: address as Address,
        srcToken: sellingToken?.address as Address,
        dstToken: buyingToken?.address as Address,
        srcReceiver: address as Address,
        dstReceiver: address as Address,
        amount: parseEther(sellingTokenAmount.toString()),
        minReturnAmount: parseEther(buyingTokenAmount?.toString()!),
        flags: 1,
      },
      '0x12'!,
      swapData.data!,
    ],
    enabled: Boolean(swapData.data !== null),
    onSuccess(data) {
      console.log('Success', data);
    },
    onError(error) {
      console.log('~~~~~~~~~~~~~~~~~~~~');
      console.log('Error hai bhai', error);
      console.log('~~~~~~~~~~~~~~~~~~~~');
    },
    onSettled(data, error) {
      console.log('Settled ho gya', error);
    },
  });

  const {
    data: useContractWriteData,
    isLoading,
    error: writingError,
    write,
  } = useContractWrite(config);

  const notifyError = (data: string) => toast.error(data);

  const swap = async () => {
    try {
      const response = await axios.get(route.swap, {
        params: {
          tokenIn: sellingToken?.address,
          tokenOut: buyingToken?.address,
          tokenInAmount: parseEther(buyingTokenAmount?.toString()!),
          callerAddress: address,
          slippage: slippage,
        },
      });
      setSwapData(response.data.data.tx);
      console.log('swapData', swapData);
      console.log('~~~~~~~~~~~~~~~~~~~~');
      console.log('swap data done');
      console.log('~~~~~~~~~~~~~~~~~~~~');
      await write?.();
    } catch (error) {
      notifyError('insufficient fund');
      console.log('error at swap', error);
    }
  };

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
