import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { style } from './style';
import { etherUnits } from 'viem';
import { ethers } from 'ethers';
import { serverConfig } from '@/config/serverConfig';
import ContractABI from '../../../abi/swap.json';

import axios from 'axios';
import { useAccount, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { useTokenContext } from '@/context/TokenContext';
import { route } from '@/api-routes/api-routes';

const SwapButton: React.FC = () => {
  const { buyingToken, sellingToken, sellingTokenAmount } = useTokenContext();
  const { isConnected, address } = useAccount();
  const [txDetails, setTxDetails] = useState({
    to: null,
    data: null,
    value: null,
  });


  const transaction=async()=>{
    try {
       const transaction = await axios.get(route.transaction, {
         params: {
           tokenAddress: sellingToken?.address,
           amount: sellingTokenAmount!,
         },
       });
       console.log('transaction', transaction);
    } catch (error) {
      console.log("error at transaction",error)
    }
  }

  const handleSwap = async () => {
    console.log('called');
    try {
      const allowance = await axios.get(route.allowance, {
        params: {
          tokenAddress: sellingToken?.address,
          walletAddress: address,
        },
      });
       console.log('allowance', allowance.data.data.allowance);
      // if (allowance.data.data.allowance) {
      //   return;
      // }
       transaction()
      //setTxDetails(transaction.data.data);
    } catch (error) {
      console.log('erroer at allowance ', error);
    }
  };

  return (
    <div>
      {isConnected ? (
        <button
          className={style.button}
          onClick={() => {
            handleSwap();
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
