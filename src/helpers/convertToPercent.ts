import convertToFixed from './convertToFixed';

function convertToPercent(value: any, precision: number = 2): string {
  return convertToFixed(value, precision) + '%';
}

export default convertToPercent;
