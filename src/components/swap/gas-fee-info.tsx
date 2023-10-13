import React, { useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaGasPump } from "react-icons/fa";
import { LiaEqualsSolid } from "react-icons/lia";
import { TbTilde } from "react-icons/tb";
import { style } from "./style";
import { useFetchQuote } from "@/hooks/useFetchQuote";
// import {gasFeeFormatter} from '@/helper/gas-fee-formatter';
import {ethers} from "ethers"
interface GasFeeInfoProps {
  loading: boolean;
  error: string | null;
  toAmount: number | null;
  gas: number | null;
  sellingTokenName: string | undefined;
  buyingTokenAmount: number | null;
  sellingTokenAmount: string | number; // Add this line to include sellingTokenAmount
  buyingTokenName: string | undefined;
  decimal:number|undefined
}

const GasFeeInfo: React.FC<GasFeeInfoProps> = ({
  loading,
  error,
  gas,
  toAmount,
  sellingTokenName,
  sellingTokenAmount,
  buyingTokenAmount,
  buyingTokenName,
  decimal
}) => {
  
  const calculatedPrice =
    Number(buyingTokenAmount) / Number(sellingTokenAmount);

  useEffect(() => {}, [
    gas,
    sellingTokenName,
    buyingTokenAmount,
    buyingTokenName,
    calculatedPrice,
  ]);

  // let formattedGas 
  // if (gas !== null) {
  //   formattedGas=ethers.formatUnits(gas);
  // }
  
  return (
    <>
      {gas !== (0 && null) && (
        <div className={style.rateContainer}>
          <div className="flex items-center justify-between">
            <AiOutlineInfoCircle className={style.icon} size={12} />
            <p className="text-sm text-gray-600">1 {sellingTokenName}</p>
            <LiaEqualsSolid className={style.icon} size={16} />
            <p className="text-gray text-sm text-gray-600">
              {calculatedPrice} {buyingTokenName}
            </p>
          </div>
          <div className="flex items-center gap-x-4 mt-4 justify-center">
            <FaGasPump className="text-sm text-gray-600" />
            <div className="text-sm flex items-center text-gray-600">
              <TbTilde className="text-sm" />
              {/* {formattedGas} */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GasFeeInfo;
