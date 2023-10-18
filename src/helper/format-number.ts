export default function formatNumber(input: string): string {
  const [integerPart, decimalPart] = input.split('.');

  if (integerPart !== '0') {
    const formattedDecimalPart = decimalPart
      ? `.${decimalPart.slice(0, 5)}`
      : '';
    return `${integerPart}${formattedDecimalPart}`;
  } else {
    const firstNonZeroIndex = decimalPart?.match(/[1-9]/)?.index;
    const formattedDecimalPart =
      firstNonZeroIndex !== undefined
        ? `.${decimalPart.slice(firstNonZeroIndex, firstNonZeroIndex + 6)}`
        : '';
    return `0${formattedDecimalPart}`;
  }
}
