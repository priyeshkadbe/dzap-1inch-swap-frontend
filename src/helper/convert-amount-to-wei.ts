

export function convertAmountToWei(amount: string, decimals: number): string {
  const parsedAmount = parseFloat(amount);
  if (isNaN(parsedAmount)) {
    throw new Error('Invalid amount');
  }

  const amountInWei = (parsedAmount * Math.pow(10, decimals)).toString();
  return amountInWei;
}
