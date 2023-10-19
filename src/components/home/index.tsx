import React, { useEffect } from 'react';
import Layout from './layout';
import Header from '@/components/header';
import TokenSection from "@/components/token-section/index"
import SwitchTokens from "@/components/switch-tokens";

import SwapButton from "@/components/swap-button";
import { useTokenContext } from '@/context/TokenContext';
import { useFetchQuote } from '@/hooks/useFetchQuote';
import { ethers } from 'ethers';
import formatNumber from '@/helper/format-number';
import { toast } from 'react-hot-toast';
import { convertAmountToWei } from '@/helper/convert-amount-to-wei';
import GasFee from '../gas-fees';

export default function Swap() {
  const {
    sellingToken,
    buyingToken,
    setBuyingTokenAmount,
    sellingTokenAmount,
    buyingTokenAmount,
    setSellingTokenAmount,
  } = useTokenContext();

  const { data, isLoading, error } = useFetchQuote(
    sellingToken,
    buyingToken,
    sellingTokenAmount
      ? convertAmountToWei(sellingTokenAmount, sellingToken?.decimals!)
      : null,
  );

  useEffect(() => {
    if (data && buyingToken) {
      let decimals = Number(`1E${buyingToken.decimals}`);
      setBuyingTokenAmount((Number(data.toAmount) / decimals).toString());
    }
  }, [
    sellingToken,
    buyingToken,
    sellingTokenAmount,
    buyingTokenAmount,
    data,
    setBuyingTokenAmount,
  ]);

  return (
    <Layout>
      <Header />
      {/* You sell */}
      <div className="relative flex flex-col">
        <TokenSection
          title="You sell"
          token={sellingToken!}
          linkPath="/select-selling-token"
          amount={sellingTokenAmount!}
          onAmountChange={setSellingTokenAmount}
          placeholder="0"
          toAmount={buyingTokenAmount}
        />

        {/* Switch the Tokens */}
        <SwitchTokens />

        {/* You buy */}
        <TokenSection
          title="You buy"
          token={buyingToken!}
          toAmount={buyingTokenAmount}
          linkPath="/select-buying-token"
          amount={buyingTokenAmount}
          disabled
          placeholder="0"
          isLoading={isLoading}
        />
      </div>
      {/* Gas and Fee Info */}

      <GasFee
        loading={isLoading}
        error={error!}
        gas={ethers.formatEther(data?.gas.toString()! ?? 0).toString()}
        toAmount={buyingTokenAmount!}
        sellingTokenSymbol={sellingToken?.symbol}
        sellingTokenAmount={sellingTokenAmount}
        buyingTokenSymbol={buyingToken?.symbol!}
        buyingTokenAmount={buyingTokenAmount!}
        decimal={buyingToken?.decimals!}
      />
      {/* {error && toast.error("supply not available")} */}
      <SwapButton />
    </Layout>
  );
}
