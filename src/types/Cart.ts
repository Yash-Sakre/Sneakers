export interface CartItem {
  id: string;
  name: string;
  price: number;
  product: any;
  quantity: number;
  variantSize: string | undefined;
  amount: number;
  image: string;
}

export interface CartState {
  cart: CartItem[];
  totalPrice: number;
  totalItem: number;
  tax_fee: number;
}

export interface AddToCartPayload {
  id: any;
  name: string;
  price: any;
  variantSize: string | undefined;
  quantity: number;
  product: any;
  image: string;
  amount: number;
}

export type RemoveFromCartAction = {
  type: "REMOVE_FROM_CART";
  payload: { id: string };
};
export type IncrementQuantityAction = {
  type: "INCREMENT_QUANTITY";
  payload: { id: string };
};

export type DecrementQuantityAction = {
  type: "DECREMENT_QUANTITY";
  payload: { id: string };
};
export type totalPrice = {
  type: "TOTAL_PRICE";
}

export interface CartContextType extends CartState {
  addToCart: (payload: AddToCartPayload) => void;
  removeItem: (id: string) => void;
  IncrementQuantity: (id: string) => void;
  DecrementQuantity: (id: string) => void;
}

export interface AddToCartAction {
  type: "ADD_TO_CART";
  payload: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    variantSize: string | undefined;
    product: any;
  };
}

export type CartAction = AddToCartAction | RemoveFromCartAction | IncrementQuantityAction | DecrementQuantityAction | totalPrice;
