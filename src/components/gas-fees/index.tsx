import React, { useEffect } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import GasPrice from './gas-price';
import ExchangeRate from './exchange-rate';

interface GasFeeProps {
  loading: boolean;
  error: string | null;
  toAmount: string;
  gas: string;
  sellingTokenSymbol: string | undefined;
  buyingTokenAmount: string;
  sellingTokenAmount: string;
  buyingTokenSymbol: string;
  decimal: number;
}

const GasFee: React.FC<GasFeeProps> = ({
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
    <div className="bg-gray-800 rounded-xl my-4 p-3 flex flex-col justify-between items-center text-sm text-gray-600">
      {/* Gas Price Info */}
      {gas && <GasPrice gas={gas} />}

      {/* Token Exchange Rate */}
      {calculatedPrice && (
        <ExchangeRate
          calculatedPrice={calculatedPrice}
          buyingTokenSymbol={buyingTokenSymbol}
        />
      )}
    </div>
  );
};

export default GasFee;
