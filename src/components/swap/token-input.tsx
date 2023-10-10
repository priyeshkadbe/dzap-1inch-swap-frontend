import React from "react";
import { style } from "./style";

interface TokenInputProps {
  value: number;
  onChange?: (value: number) => void;
  placeholder: string;
  disabled?: boolean;
}




const TokenInput: React.FC<TokenInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(Number(e.target.value));
    }
  };

  return (
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