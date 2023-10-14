import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { style } from './style';
import { etherUnits } from 'viem';
import { ethers } from 'ethers';
import { serverConfig } from '@/config/serverConfig';

import axios from 'axios';
import { useAccount, useSendTransaction, useWaitForTransaction } from 'wagmi';
import { useTokenContext } from '@/context/TokenContext';





const SwapButton: React.FC = () => {

  const {buyingToken,sellingToken,sellingTokenAmount} = useTokenContext()
  const {isConnected,address} = useAccount()  

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
