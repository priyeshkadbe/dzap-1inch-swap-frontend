import React, { useEffect } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { FaGasPump } from 'react-icons/fa';
import { LiaEqualsSolid } from 'react-icons/lia';
import { TbTilde } from 'react-icons/tb';
import { style } from './style';
import { useFetchQuote } from '@/hooks/useFetchQuote';
// import {gasFeeFormatter} from '@/helper/gas-fee-formatter';
import { ethers } from 'ethers';
import formatNumber from '@/utils/format-number';
interface GasFeeInfoProps {
  loading: boolean;
  error: string | null;
  toAmount: number | null;
  gas: number | null;
  sellingTokenSymbol: string | undefined;
  buyingTokenAmount: number | null;
  sellingTokenAmount: string | number; // Add this line to include sellingTokenAmount
  buyingTokenSymbol: string | undefined;
  decimal: number | undefined;
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
          className={`flex items-center justify-between ${
            gas === null || (undefined && 'hidden')
          }`}
        >
          <AiOutlineInfoCircle className={style.icon} size={12} />
          <p className="text-sm text-gray-600">1 {sellingTokenSymbol}</p>
          <LiaEqualsSolid className={style.icon} size={16} />
          <p className="text-gray text-sm text-gray-600">
            {formatNumber(calculatedPrice)} {buyingTokenSymbol}
          </p>
        </div>
        <div
          className={`flex items-center gap-x-4   ${
            gas === null || (undefined && 'hidden')
          }`}
        >
          <FaGasPump className="text-sm text-gray-600" />
          <div className="text-sm flex items-center text-gray-600">
            <TbTilde className="text-xsm" />
            {formatNumber(gas)}
            {'MATIC'}
          </div>
        </div>
      </div>
    </>
  );
};

export default GasFeeInfo;
