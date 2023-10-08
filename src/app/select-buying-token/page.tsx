"use client";
import TokenSelector from "@/components/token-selector";
import { useTokenContext } from "@/context/TokenContext";

const SelectBuyingToken = () => {
  const { setBuyingToken } = useTokenContext();

  return (
    <TokenSelector
      onSelectToken={(token) => {
        setBuyingToken(token);
      }}
    />
  );
};

export default SelectBuyingToken;
