import React from "react";
import { style } from "./style";

interface TokenInputProps {
  value: number;
  toAmount: number | null;
  onChange?: (value: number) => void;
  placeholder: string;
  disabled?: boolean;
  loading?: boolean;
}




const TokenInput: React.FC<TokenInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  loading,
  toAmount,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(Number(e.target.value));
    }
  };

  return toAmount && disabled ? (
    <input
      type="text"
      placeholder={placeholder}
      className={style.input}
      value={toAmount}
      onChange={handleChange}
      disabled={disabled}
    />
  ) : (
    <input
      type="text"
      placeholder={placeholder}
      className={style.input}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default TokenInput;