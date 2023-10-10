import {
  
  AiOutlinePlus,
  
  AiOutlineArrowDown,
} from "react-icons/ai";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

import { IoMdRefresh } from "react-icons/io";

import { useTokenContext } from "@/context/TokenContext";
import { useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useFetchQuote } from "@/hooks/useFetchQuote";


import GasFeeInfo from "./gas-fee-info";
import {style} from "./style";
import TokenSection from "./token-section";
import SwapButton from "./swap-button";

export default function Swap() {
  const {
    tokens,
    sellingToken,
    buyingToken,
    sellingTokenPrice,
    buyingTokenPrice,
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

  const { loading, error, toAmount, gas } = useFetchQuote();

  useEffect(() => {}, [
   tokens,
    sellingToken,
    buyingToken,
    sellingTokenPrice,
    buyingTokenPrice,
    setBuyingToken,
    sellingTokenAmount,
    setSellingTokenAmount,
    buyingTokenAmount,
    gas
  ]);

  const { address, isConnected } = useAccount();

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <div className={style.formHeader}>
          <div>Swap</div>
          <div className="flex gap-x-4">
            <IoMdRefresh />
            <AiOutlinePlus />
            <HiAdjustmentsHorizontal />
          </div>
        </div>
        {/* You sell */}
        <TokenSection
          title="You sell"
          token={sellingToken}
          linkPath="/select-selling-token"
          amount={sellingTokenAmount}
          onAmountChange={setSellingTokenAmount}
          price={sellingTokenPrice?.price}
          placeholder="0"
        />
        {/* Arrow */}
        <div className="flex justify-center">
          <AiOutlineArrowDown
            className="text-lg text-white bg-gray-700 p-2 rounded-full"
            size={16}
          />
        </div>

        {/* You buy */}
        <TokenSection
          title="You buy"
          token={buyingToken}
          linkPath="/select-buying-token"
          amount={buyingTokenAmount ?? 0}
          price={buyingTokenPrice?.price}
          disabled
          placeholder="0"
        />

        <GasFeeInfo
          gas={gas!}
          buyingTokenAmount={buyingTokenAmount!}
          sellingTokenName={sellingToken?.name!}
        />

        <SwapButton isConnected={ isConnected} />
      </div>
    </div>
  );
}
