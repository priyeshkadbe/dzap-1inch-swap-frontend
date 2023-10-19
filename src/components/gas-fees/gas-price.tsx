import React from 'react';
import { FaGasPump } from 'react-icons/fa';
import { TbTilde } from 'react-icons/tb';

interface GasPriceProps {
  gas: string;
}

const GasPrice: React.FC<GasPriceProps> = ({ gas }) => (
  <div className="flex items-center justify-center gap-x-4 text-sm text-gray-600">
    <FaGasPump className="text-sm text-gray-600" />
    <div className="flex items-center text-gray-600">
      <TbTilde className="text-xsm" />
      {gas} {'MATIC'}
    </div>
  </div>
);

export default GasPrice;
