import { useTokenContext } from '@/context/TokenContext';
import { useEffect } from 'react';
import { useFetchQuote } from '@/hooks/useFetchQuote';
import GasFeeInfo from './gas-fee-info';
import TokenSection from './token-section';
import SwapButton from './swap-button';
import Header from './header';
import Layout from './layout';
import SwitchTokens from './switch-tokens';

export default function Swap() {
  const {
    sellingToken,
    buyingToken,
    setBuyingToken,
    sellingTokenAmount,
    setSellingTokenAmount,
    buyingTokenAmount,
    setBuyingTokenAmount,
  } = useTokenContext();

  const { toAmount, gas, loading, error } = useFetchQuote({
    sellingToken,
    buyingToken,
    sellingTokenAmount,
  });

  useEffect(() => {
    setBuyingTokenAmount(toAmount!);
    console.log('toamount', toAmount, gas, error);
  }, [toAmount, gas, loading, error]);

  useEffect(() => {}, [
    sellingToken,
    buyingToken,
    sellingTokenAmount,
    buyingTokenAmount,
  ]);

  // const { address, isConnected } = useAccount();

  // const selling = useFetchTokenPrice(sellingToken?.address!);
  // const buying = useFetchTokenPrice(buyingToken?.address!);
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
        toAmount={toAmount}
      />
      <SwitchTokens />
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
        sellingTokenSymbol={sellingToken?.symbol}
        sellingTokenAmount={sellingTokenAmount}
        buyingTokenSymbol={buyingToken?.symbol}
        buyingTokenAmount={toAmount}
        decimal={buyingToken?.decimals}
      />

      <SwapButton />
    </Layout>
  );
}
