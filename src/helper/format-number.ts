export default function formatNumber(input: string): string {
  const [integerPart, decimalPart] = input.split('.');

  // If the first digit is non-zero, show up to 5 decimal places
  if (integerPart !== '0') {
    const formattedDecimalPart = decimalPart
      ? `.${decimalPart.slice(0, 5)}`
      : '';
    return `${integerPart}${formattedDecimalPart}`;
  } else {
    // Find the first non-zero digit after the decimal point and show 6 decimal places
    const firstNonZeroIndex = decimalPart?.match(/[1-9]/)?.index;
    const formattedDecimalPart =
      firstNonZeroIndex !== undefined
        ? `.${decimalPart.slice(firstNonZeroIndex, firstNonZeroIndex + 6)}`
        : '';
    return `0${formattedDecimalPart}`;
  }
}
