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
  disabled?: boolean;
  placeholder: string;
  toAmount: number | null;
}

const TokenSection: React.FC<TokenSectionProps> = ({
  title,
  token,
  linkPath,
  amount,
  onAmountChange,
  disabled = false,
  placeholder,
  toAmount,
}) => {
  useEffect(() => {}, [token, amount, onAmountChange]);

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
            toAmount={toAmount}
          />
        </div>
        <TokenInfo
         token={token}
        />
      </div>
    </div>
  );
};

export default TokenSection;
