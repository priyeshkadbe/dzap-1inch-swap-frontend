import React, { useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaGasPump } from "react-icons/fa";
import { LiaEqualsSolid } from "react-icons/lia";
import { TbTilde } from "react-icons/tb";
import { style } from "./style";


interface GasFeeInfoProps {
  gas: number;
  sellingTokenName?: string;
  buyingTokenAmount?: number;
  buyingTokenName?: string;
}

const GasFeeInfo: React.FC<GasFeeInfoProps> = ({
  gas,
  sellingTokenName,
  buyingTokenAmount,
  buyingTokenName,
}) => {

    useEffect(() => {}, [
      gas,
      sellingTokenName,
      buyingTokenAmount,
      buyingTokenName,
    ]);

  return (
    <>
      {gas !== (0||null) && (
        <div className={style.rateContainer}>
          <div className="flex items-center justify-between">
            <AiOutlineInfoCircle className={style.icon} size={12} />
            <p className="text-sm text-gray-600">1 {sellingTokenName}</p>
            <LiaEqualsSolid className={style.icon} size={16} />
            <p className="text-gray text-sm text-gray-600">
              {buyingTokenAmount} {buyingTokenName}
            </p>
          </div>
          <div className="flex items-center gap-x-4 mt-4">
            <FaGasPump className="text-sm text-gray-600" />
            <div className="text-sm flex items-center text-gray-600">
              <TbTilde className="text-sm" />
              {gas}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GasFeeInfo;
