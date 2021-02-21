function convertToFixed(value: any, precision: number): string {
  return parseFloat(value || 0).toLocaleString('en', {
    style: 'decimal',
    minimumFractionDigits: precision,
    maximumFractionDigits: precision,
  });
}

export default convertToFixed;
