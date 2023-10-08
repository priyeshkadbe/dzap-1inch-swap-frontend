"use client"
import TokenSelector from "@/components/token-selector";
import { useTokenContext } from "@/context/TokenContext";

const SelectSellingToken = () => {
  const { setSellingToken } = useTokenContext();

  return (
    <TokenSelector
      onSelectToken={(token) => {
        setSellingToken(token);
      }}
    />
  );
};

export default SelectSellingToken;
