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
