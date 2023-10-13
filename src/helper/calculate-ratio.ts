export default function calculateRatio(buyingTokenPrice:number,sellingTokenPrice:number,amount:number) {
  return buyingTokenPrice*sellingTokenPrice*amount
}