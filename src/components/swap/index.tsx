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
    sellingTokenAmount,
  );

  useEffect(() => {
    if (data) {
      setBuyingTokenAmount(data.toAmount);
    }
  }, [data]);

  useEffect(() => {}, [
    sellingToken,
    buyingToken,
    sellingTokenAmount,
    buyingTokenAmount,
  ]);

  return (
    <Layout>
      <Header />
      {/* You sell */}
      <TokenSection
        title="You sell"
        token={sellingToken}
        linkPath="/select-selling-token"
        amount={sellingTokenAmount ?? 0}
        onAmountChange={setSellingTokenAmount}
        placeholder="0"
        toAmount={data?.toAmount!}
      />

      <SwitchTokens />

      {/* You buy */}
      <TokenSection
        title="You buy"
        token={buyingToken}
        toAmount={data?.toAmount!}
        linkPath="/select-buying-token"
        amount={buyingTokenAmount ?? 0}
        disabled
        placeholder="0"
        isLoading={isLoading}
      />

      {/* Gas and Fee Info */}
      <GasFeeInfo
        loading={isLoading}
        error={error!}
        gas={data?.gas!}
        toAmount={data?.toAmount!}
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
