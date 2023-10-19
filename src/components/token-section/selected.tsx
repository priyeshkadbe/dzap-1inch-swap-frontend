import { Token } from '@/types';
import React from 'react';
import { AiOutlineDown } from 'react-icons/ai';
import { style } from './styles';
import Image from 'next/image';

interface SelectedProps {
  token: {
    logoURI: string;
    symbol: string;
  } | null;
  linkPath: string;
}

const Selected: React.FC<SelectedProps> = ({ token }) => {
  return (
    <div className={style.selectorDropdown}>
      {token ? (
        <>
          <div className="h-6 w-6">
            <img src={token.logoURI} alt="token logo" />
          </div>
          <h4 className="text-sm">{token.symbol}</h4>
        </>
      ) : (
        <h4 className="text-sm">Select</h4>
      )}
      <AiOutlineDown size={18} />
    </div>
  );
};

export default Selected;
