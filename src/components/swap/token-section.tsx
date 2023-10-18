import React, { useEffect } from 'react';
import TokenSelectorLink from './token.selector-link';
import TokenInput from './token-input';
import TokenInfo from './token-info';
import { style } from './style';
import { Token } from '@/types';

import { useTokenContext } from '@/context/TokenContext';

interface TokenSectionProps {
  title: string;
  token: Token ;
  linkPath: string;
  amount: string;
  onAmountChange?: (value: string) => void;
  disabled?: boolean;
  placeholder: string;
  toAmount?: string;
  isLoading?:boolean;
}

const TokenSection: React.FC<TokenSectionProps> = ({
  title,
  token,
  linkPath,
  amount,
  onAmountChange,
  disabled,
  placeholder,
  toAmount,
  isLoading,
}) => {

  const {sellingToken} = useTokenContext()

  useEffect(() => {}, [
    token,
    amount,
    onAmountChange,
    toAmount,
    sellingToken,
  ]);


  return (
    <div className={style.container}>
      <div className={style.selectorContainer}>
        <div className="flex justify-between items-center">
          <h4 className="text-sm text-gray-500">{title}</h4>
          {/* <h4 className="text-sm text-blue-400">{ formatEther(data?.value!)??0}</h4> */}
        </div>
        <div className={style.selector}>
          <TokenSelectorLink token={token} linkPath={linkPath} />
          <TokenInput
            value={amount}
            onChange={onAmountChange!}
            placeholder={placeholder}
            disabled={disabled}
            toAmount={toAmount!}
            isLoading={isLoading}
          />
        </div>
        <TokenInfo token={token} amount={amount} />
      </div>
    </div>
  );
};

export default TokenSection;
