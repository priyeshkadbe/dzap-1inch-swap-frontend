import React, { useEffect } from 'react';
import { style } from './style';
import { ThreeDots } from 'react-loader-spinner';
import { formatEther, parseEther } from 'viem';
import { ethers } from 'ethers';
import WeiToEther from "@/helper/wei-to-ether"
import { useTokenContext } from '@/context/TokenContext';
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
    console.log('value recevied', toAmount);
  
  };

  useEffect(() => {}, [value, onChange, isLoading, toAmount, sellingToken]);


  if (isLoading ) {
    return (
      <ThreeDots
        height="30"
        width="30"
        radius="9"
        color="#4fa94d"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        visible={true}
      />
    );
  }

  
    return (
      <input
        type="number"
        placeholder={placeholder}
        className={style.input}
        value={disabled ? toAmount : value}
        onChange={handleChange}
        disabled={disabled}
      />
    );
  
};

export default TokenInput;
