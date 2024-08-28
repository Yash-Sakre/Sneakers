export interface Variant {
    size: string;
    price: number;
    currency: string;
  }
  
 export  interface Product {
    id: string;
    title: string;
    link: string;
    description: string;
    category: string;
    image: string;
    gtin: string;
    brand: string;
    gender: string;
    age_group: string;
    base_price: number;
    currency: string;
    variants: Variant[];
    labels: string[];
  }