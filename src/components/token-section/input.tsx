import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { useTokenContext } from '@/context/TokenContext';
import formatNumber from '@/helper/format-number';

interface InputProps {
  value: string;
  toAmount: string;
  onChange?: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  isLoading?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  isLoading,
  toAmount,
}) => {
  const { sellingToken } = useTokenContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      e.preventDefault();
      onChange(e.target.value);
    }
  };

  return (
    <input
      type="number"
      placeholder={placeholder}
      className={`bg-transparent w-full text-xl text-end outline-none ${disabled&&"text-gray-500"}`}
      value={disabled ? Number(toAmount) : Number(value)}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default Input;
