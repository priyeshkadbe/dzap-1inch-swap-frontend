import React, { useEffect } from 'react';
import { style } from './style';
import { ThreeDots } from 'react-loader-spinner';
import {formatEther} from "viem"
interface TokenInputProps {
  value: number;
  toAmount: number ;
  onChange?: (value: number) => void;
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(Number(e.target.value));
    }
  };

  // useEffect(() => {}, [value, toAmount, isLoading]);

  // if (isLoading && disabled && value !== 0) {
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

  // return (
  //   <input
  //     type="text"
  //     placeholder={placeholder}
  //     className={style.input}
  //     value={disabled ? toAmount! : value}
  //     onChange={handleChange}
  //     disabled={disabled}
  //   />
  // );


  if (isLoading && disabled && value !== 0) {
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
  } else if (disabled && value) {
    return (
      <input
        type="number"
        placeholder={placeholder}
        className={style.input}
        value={Math.round(parseFloat(value.toString()) * 1e12)}
        // onChange={handleChange}
        disabled={disabled}
      />
    );
  } else {
    return (
      <input
        type="number"
        placeholder={placeholder}
        className={style.input}
        value={value}
        onChange={handleChange}
        // disabled={disabled}
      />
    );
  }

};

export default TokenInput;
