import React, { useEffect } from 'react';
import { style } from './style';
import { ThreeDots } from 'react-loader-spinner';

import { useTokenContext } from '@/context/TokenContext';
import formatNumber from '@/helper/format-number';
interface TokenInputProps {
  value: string;
  toAmount: string;
  onChange?: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const TokenInput: React.FC<TokenInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  isLoading,
  toAmount,
}) => {

  const {sellingToken} = useTokenContext()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      e.preventDefault();
      onChange(e.target.value);
    }  
  };

  useEffect(() => {}, [value, onChange, isLoading, toAmount, sellingToken]);


  // if (isLoading ) {
  //   return (
  //     <ThreeDots
  //       height="30"
  //       width="30"
  //       radius="9"
  //       color="#4fa94d"
  //       ariaLabel="three-dots-loading"
  //       wrapperStyle={{}}
  //       visible={true}
  //     />
  //   );
  // }

  
    return (
      <input
        type="number"
        placeholder={placeholder}
        className={style.input}
        value={disabled ? Number(toAmount) : Number(value)}
        onChange={handleChange}
        disabled={disabled}
      />
    );
  
};

export default TokenInput;
