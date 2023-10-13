import { AiOutlinePlus, AiOutlineArrowDown } from "react-icons/ai";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

import { IoMdRefresh } from "react-icons/io";
import {
  BsFillArrowUpCircleFill,
  BsFillArrowDownCircleFill,
} from 'react-icons/bs';
import { useTokenContext } from "@/context/TokenContext";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useFetchQuote } from "@/hooks/useFetchQuote";

import GasFeeInfo from "./gas-fee-info";
import { style } from "./style";
import TokenSection from "./token-section";
import SwapButton from "./swap-button";
import {useSwapTokens} from "@/hooks/useSwapToken";
import SwapHeader from "./swap-header";
import { useFetchTokenPrice } from "@/hooks/useFetchTokenPrice";
import Layout from "./layout";

export default function Swap() {
  const {
    tokens,
    sellingToken,
    buyingToken,
    setBuyingToken,
    sellingTokenAmount,
    setSellingTokenAmount,
    buyingTokenAmount,
    gasFees,
  } = useTokenContext();
  let requestData = {
    tokenIn: sellingToken?.address,
    tokenOut: buyingToken?.address,
    tokenInAmount: sellingTokenAmount.toString(),
  };

  const { toAmount, gas, loading, error } = useFetchQuote({
    sellingToken,
    buyingToken,
    sellingTokenAmount,
  });

 

  useEffect(() => {}, [
    tokens,
    sellingToken,
    buyingToken,
    setBuyingToken,
    sellingTokenAmount,
    setSellingTokenAmount,
    buyingTokenAmount,
  ]);

  const { address, isConnected } = useAccount();

  return (
    <Layout>
      <SwapHeader />
      {/* You sell */}
      <TokenSection
        title="You sell"
        token={sellingToken}
        linkPath="/select-selling-token"
        amount={sellingTokenAmount ?? 0}
        onAmountChange={setSellingTokenAmount}
        placeholder="0"
        toAmount={toAmount}
      />

      <button
        className="flex justify-center absolute right-40 top-44  md:right-[210px]  md:top-1/3  transition-transform ease-in-out"
      >
        <AiOutlineArrowDown
          size={60}
          className="bg-[#191B1F] rounded-full p-4 transition-transform duration-300 ease-in-out transform hover:rotate-180 "
        />
      </button>

      <TokenSection
        title="You buy"
        token={buyingToken}
        linkPath="/select-buying-token"
        amount={buyingTokenAmount ?? 0}
        toAmount={toAmount}
        disabled
        placeholder="0"
      />
      <GasFeeInfo
        loading={loading}
        error={error}
        gas={gas}
        toAmount={toAmount}
        sellingTokenName={sellingToken?.name}
        sellingTokenAmount={sellingTokenAmount}
        buyingTokenName={buyingToken?.name}
        buyingTokenAmount={toAmount}
        decimal={buyingToken?.decimals}
      />

      <SwapButton />
    </Layout>
  );
}
