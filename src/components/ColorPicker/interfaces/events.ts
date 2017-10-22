export interface ColorChange {
  hex: string;
  hsl: {
    h: number;
    s: number;
    a: number;
    v: number;
  };
  oldHue: number;
  rgb: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
  source: string;
}
