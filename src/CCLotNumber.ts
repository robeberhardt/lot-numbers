import base62 from "base62";

const INDEX_PLACES = 3;
const MAX_INDEX = Math.pow(62, INDEX_PLACES); // 62 * 62 * 62; // 238,328

export function encodeLot(
  index: number,
  prod: string = "PRD",
  year?: string,
  pad: boolean = true
): string {
  if (year && year.length === 4) {
    // they passed the full four-digit year
    year = year.substr(2, 2);
  } else if (!year || year.length !== 2) {
    // they didn't pass a year or they passed a year that isn't legit
    year = new Date()
      .getFullYear()
      .toString()
      .substr(2, 2);
  }
  let index62 = base62.encode(index);
  if (pad) {
    while (index62.length < INDEX_PLACES) {
      index62 = "0" + index62;
    }
  }
  return `${year}${prod.toUpperCase()}${index62}`;
}

export function decodeLot(lot: string): object {
  if (lot.length !== 8) {
    throw new Error("lot must be an 8-character string");
  }
  // YYPRDI62
  const year = lot.substr(0, 2);
  const prod = lot.substr(2, 3);
  const i62 = lot.substr(5, 3);
  return { year: `20${year}`, product: prod, index: base62.decode(i62) };
}
