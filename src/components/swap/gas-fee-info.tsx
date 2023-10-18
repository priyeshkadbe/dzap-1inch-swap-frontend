import React, { useEffect } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaGasPump } from 'react-icons/fa';
import { LiaEqualsSolid } from 'react-icons/lia';
import { TbTilde } from 'react-icons/tb';
import { style } from './style';
import { useFetchQuote } from '@/hooks/useFetchQuote';
// import {gasFeeFormatter} from '@/helper/gas-fee-formatter';
import { ethers } from 'ethers';
//import formatNumber from '@/utils/format-number';

interface GasFeeInfoProps {
  loading: boolean;
  error: string | null;
  toAmount: string;
  gas: string ;
  sellingTokenSymbol: string | undefined;
  buyingTokenAmount: string ;
  sellingTokenAmount: string ; 
  buyingTokenSymbol: string ;
  decimal: number ;
}

const GasFeeInfo: React.FC<GasFeeInfoProps> = ({
  loading,
  error,
  gas,
  toAmount,
  sellingTokenSymbol,
  sellingTokenAmount,
  buyingTokenAmount,
  buyingTokenSymbol,
  decimal,
}) => {
  const calculatedPrice =
    Number(buyingTokenAmount) / Number(sellingTokenAmount);

  useEffect(() => {}, [
    gas,
    sellingTokenSymbol,
    buyingTokenAmount,
    buyingTokenSymbol,
    calculatedPrice,
  ]);

  return (
    <>
      <div className={style.rateContainer}>
        <div
          className={`flex  items-center justify-center gap-x-4 py-2  ${
            gas === null || (undefined && 'hidden')
          }`}
        >
          <AiOutlineInfoCircle className={style.icon} size={18} />
          <p className="text-sm text-gray-600">1 {sellingTokenSymbol}</p>
          {/* <LiaEqualsSolid className={style.icon} size={16} /> */}
          <p className="text-gray text-sm text-gray-600">
            = { "  "} {(calculatedPrice)} {buyingTokenSymbol}
          </p>
        </div>
        <div
          className={`flex items-center justify-center gap-x-4   ${
            gas === null || (undefined && 'hidden')
          }`}
        >
          <FaGasPump className="text-sm text-gray-600" />
          <div className="text-sm flex items-center text-gray-600">
            <TbTilde className="text-xsm" />
            {(gas)}
            {'MATIC'}
          </div>
        </div>
      </div>
    </>
  );
};

export default GasFeeInfo;
