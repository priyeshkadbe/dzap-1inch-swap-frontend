import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { style } from './style';
import { etherUnits } from 'viem';
import { ethers } from 'ethers';
import { serverConfig } from '@/config/serverConfig';

import axios from 'axios';
import { useAccount, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { useTokenContext } from '@/context/TokenContext';



type SwapButtonProps = {
  isConnected: boolean;
};

const SwapButton: React.FC = () => {
  
  const slippage = 1;
  const {buyingToken,sellingToken,sellingTokenAmount} = useTokenContext()
  const {isConnected,address} = useAccount()  

  
  
// const fetchDex = async () => {
//   const allowance = await axios.get(
//     `https://api.1inch.io/v5.0/1/approve/allowance?tokenAddress=${tokenOne.address}&walletAddress=${address}`,
//   );

//   if (allowance.data.allowance == 0) {
//     const approve =
//       await axios.get(`https://api.1inch.io/v5.0/1/approve/transaction?tokenAddress=${tokenOne.address}&amount=100000000000
//     `);
//     console.log(approve.data);
//     console.log('Not approved');
//     return;
//   }

//   console.log('make swap', allowance.data.allowance);

//   const swap = await axios.get(
//     `https://api.1inch.io/v5.0/1/swap?fromTokenAddress=${
//       sellingToken?.address
//     }&toTokenAddress=${sellingToken?.address}&amount=${sellingTokenAmount}&fromAddress=${address}&slippage=${slippage}`,
//   );

//   console.log('swap', swap.data);

//   let decimals = Number(`1E${buyingToken?.decimals}`);

//   console.log((Number(swap?.data?.toTokenAmount) / decimals).toFixed(2));

//   console.log(swap?.data?.tx);
// };

  
  return (
    <div>
      {isConnected ? (
        <button className={style.button} >
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
