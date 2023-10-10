import React, { useEffect } from "react";
import TokenSelectorLink from "./token.selector-link";
import TokenInput from "./token-input";
import TokenInfo from "./token-info";
import { style } from "./style";
import { Token } from "@/types";

interface TokenSectionProps {
  title: string;
  token: Token | null;
  linkPath: string;
  amount: number;
  onAmountChange?: (value: number) => void;
  price?: number | null;
  disabled?: boolean;
  placeholder: string;
}

const TokenSection: React.FC<TokenSectionProps> = ({
  title,
  token,
  linkPath,
  amount,
  onAmountChange,
  price,
  disabled = false,
  placeholder,
}) => {
  useEffect(() => {}, [token, amount, onAmountChange, price]);
  return (
    <div className={style.container}>
      <div className={style.selectorContainer}>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <div className={style.selector}>
          <TokenSelectorLink token={token} linkPath={linkPath} />
          <TokenInput
            value={amount}
            onChange={onAmountChange}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>
        <TokenInfo token={token} price={price!} amount={amount} />
      </div>
    </div>
  );
};

export default TokenSection;
