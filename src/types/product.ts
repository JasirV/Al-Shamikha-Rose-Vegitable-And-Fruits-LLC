
export interface BoxSize {
  size: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: "vegetable" | "fruit";
  type: "kg" | "box";
  price?: number;
  offerPrice?:number;
  boxSizes?: BoxSize[];
  imageUrl: string;
}
