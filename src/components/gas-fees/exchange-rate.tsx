import React from 'react';

interface ExchangeRateProps {
  calculatedPrice: number;
  buyingTokenSymbol: string;
}

const ExchangeRate: React.FC<ExchangeRateProps> = ({
  calculatedPrice,
  buyingTokenSymbol,
}) => (
  <div className="flex items-center justify-center gap-x-4 text-sm text-gray-600">
    <p className="text-sm">{`1 ${buyingTokenSymbol} = ${calculatedPrice} MATIC`}</p>
  </div>
);

export default ExchangeRate;
