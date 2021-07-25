export enum Available {
  available = 1,
  expected,
  notAvailable
}

export interface Device {
  id:number,
  deviceName: string,
  price: number,
  availability: Available,
  soldPieces: number,
  rating: number
}

export interface FilterOptions {
  name: string,
  price: {from: number, to:number},
  availability: Available[],
  soldPieces: {from: number, to:number},
  rating: {from: number, to:number}
}

export function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
