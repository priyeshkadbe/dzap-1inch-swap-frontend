import { useEffect } from 'react';
import Layout from './layout';
import Header from './header';
import TokenSection from './token-section';
import SwitchTokens from './switch-tokens';
import GasFeeInfo from './gas-fee-info';
import { useTokenContext } from '@/context/TokenContext';
import { useFetchQuote } from '@/hooks/useFetchQuote';
import { toast } from 'react-hot-toast';
import SwapButton from './swap-button';
import { etherUnits, formatEther, parseEther } from 'viem';
import { ethers } from 'ethers';
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
    sellingToken!,
    buyingToken,
    Number(parseEther(sellingTokenAmount.toString())),
  );

  // useEffect(() => {
  //   if (data) {
  //     console.log('data', data.toAmount);
  //     //setBuyingTokenAmount(Number(ethers.utils(data.toAmount!)));
  //     setBuyingTokenAmount(Number(formatEther(BigInt(data.toAmount!))));
  //   }
  // }, [data]);

  useEffect(() => {

    if (data) {
      //console.log('data', data.toAmount);
      //setBuyingTokenAmount(Number(ethers.utils(data.toAmount!)));
      setBuyingTokenAmount(Number(formatEther(BigInt(data.toAmount!))));
    }
  }, [
    sellingToken,
    buyingToken,
    sellingTokenAmount,
    buyingTokenAmount,
    data,
    setBuyingTokenAmount
  ]);

  return (
    <Layout>
      <Header />
      {/* You sell */}
      <div className="relative flex flex-col">
        <TokenSection
          title="You sell"
          token={sellingToken}
          linkPath="/select-selling-token"
          amount={sellingTokenAmount!}
          onAmountChange={setSellingTokenAmount}
          placeholder="0"
          toAmount={buyingTokenAmount}
        />

        <SwitchTokens />

        {/* You buy */}
        <TokenSection
          title="You buy"
          token={buyingToken}
          // toAmount={Number(
          //   Number(
          //     ethers.utils.formatEther(BigInt(data?.toAmount ?? 0)),
          //   ).toFixed(14),
          // )}
          toAmount={Number(buyingTokenAmount?.toPrecision(6))!}
          linkPath="/select-buying-token"
          amount={Number(buyingTokenAmount?.toPrecision(6))!}
          disabled
          placeholder="0"
          isLoading={isLoading}
        />
      </div>

      {/* Gas and Fee Info */}
      <GasFeeInfo
        loading={isLoading}
        error={error!}
        // gas={Number(
        //   Number(ethers.utils.formatEther(BigInt(data?.gas ?? 0))).toPrecision(12),
        // )}
        //gas={Number(parseEther(data?.gas.toString(),{"unit":"wei"})}
        gas={Number(formatEther(BigInt(data?.gas! ?? 0)))}
        toAmount={buyingTokenAmount!}
        sellingTokenSymbol={sellingToken?.symbol}
        sellingTokenAmount={sellingTokenAmount}
        buyingTokenSymbol={buyingToken?.symbol}
        buyingTokenAmount={buyingTokenAmount!}
        decimal={buyingToken?.decimals}
      />

      <SwapButton />
    </Layout>
  );
}
