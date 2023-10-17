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
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { useTokenContext } from '@/context/TokenContext';
import { route } from '@/api-routes/api-routes';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';

const SwapButton: React.FC = () => {
  const {
    buyingToken,
    sellingToken,
    sellingTokenAmount,
    buyingTokenAmount,
    slippage,
  } = useTokenContext();
  const { isConnected, address } = useAccount();

  // useEffect(() => {}, [buyingToken, sellingToken, sellingTokenAmount]);

  // const [swapData, setSwapData] = useState({
  //   from: null,
  //   toAmount: null,
  //   data: null,
  //   value: null,
  //   gas: null,
  //   gasPrice: null,
  // });

  // useEffect(() => {}, [swapData]);

  // const { config } = usePrepareContractWrite(
  //   swapData && {
  //     address: serverConfig.SWAP_CONTRACT_ADDRESS as Address,
  //     abi: ContractABI.abi,
  //     chainId: Number(serverConfig.CHAIN_ID),
  //     value: swapData?.value!,
  //     functionName: 'swap',
  //     args: [
  //       address,
  //       {
  //         executor: address as Address,
  //         srcToken: sellingToken?.address as Address,
  //         dstToken: buyingToken?.address as Address,
  //         srcReceiver: address as Address,
  //         dstReceiver: address as Address,
  //         amount: ethers.utils.parseEther(sellingTokenAmount!),
  //         minReturnAmount: ethers.utils.parseEther(buyingTokenAmount!),
  //         flags: 1,
  //       },
  //       '0x',
  //       swapData.data!,
  //     ],
  //     enabled: Boolean(swapData.data !== null),
  //     onSuccess(data) {
  //       console.log('Success', data);
  //     },
  //     onError(error) {
  //       console.log('Error', error);
  //     },
  //     onSettled(data, error) {
  //       console.log('Settled ', error);
  //     },
  //   },
  // );

  // const {
  //   data: useContractWriteData,
  //   isLoading,
  //   error: writingError,
  //   write,
  // } = useContractWrite(config);

  // const { data: useWaitForTransactionData, isSuccess } = useWaitForTransaction({
  //   hash: useContractWriteData?.hash,
  // });

  // const swap = async () => {
  //   try {
  //     const response = await axios.get(route.swap, {
  //       params: {
  //         tokenIn: sellingToken?.address,
  //         tokenOut: buyingToken?.address,
  //         tokenInAmount: sellingTokenAmount,
  //         callerAddress: 0x4c569c1e541a19132ac893748e0ad54c7c989ff4,
  //         slippage: slippage,
  //       },
  //     });
  //     setSwapData(response.data.data.tx);
  //     console.log('swapData', swapData);
  //     console.log('~~~~~~~~~~~~~~~~~~~~');
  //     console.log('swap data done');
  //     console.log('~~~~~~~~~~~~~~~~~~~~');
  //     await write?.();
  //   } catch (error) {
  //     toast.error('insufficient fund');
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
      <button className={style.button} >
        <p className="text-md text-white">swap</p>
      </button>
    </div>
  );
};

export default SwapButton;
