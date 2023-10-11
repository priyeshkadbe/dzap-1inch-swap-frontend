import React from "react";
import { style } from "./style";

interface TokenInputProps {
  value: number;
  onChange?: (value: number) => void;
  placeholder: string;
  disabled?: boolean;
  loading?:boolean
}




const TokenInput: React.FC<TokenInputProps> = ({
  value,
  onChange,
  placeholder,
  disabled = false,
  loading
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(Number(e.target.value));
    }
  };

  if (disabled) {
    return  loading?<h1>loading</h1> :<input
      type="text"
      placeholder={placeholder}
      className={style.input}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
    
  }
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