import * as hexExpr from 'hex-color-regex';

export const validHex = (str: string) => {
  const hex = str.charAt(0) !== '#' ? `#${str}` : str;
  return hexExpr().test(hex);
};
