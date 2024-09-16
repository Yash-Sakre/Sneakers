import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import reducer from "@/reducer/CartReducer";
import {
  CartContextType,
  CartState,
  CartItem,
  AddToCartPayload,
  RemoveFromCartAction,
} from "@/types/Cart";

const CartContext = createContext<CartContextType | undefined>(undefined);

const getLocalStorageData = (): CartItem[] => {
  const data = localStorage.getItem("Cart");

  if (data) {
    try {
      return JSON.parse(data) as CartItem[];
    } catch (error) {
      console.error("Error parsing cart data from localStorage:", error);
      return [];
    }
  }

  return [];
};
console.log(getLocalStorageData().length);

const initialState: CartState = {
  cart: getLocalStorageData(),
  totalPrice: 0,
  totalItem: 0,
  tax_fee: 100,
};

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (payload: AddToCartPayload) => {
    dispatch({
      type: "ADD_TO_CART",
      payload,
    });
  };

  const removeItem = (id: string) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: { id },
    });
  };

  const IncrementQuantity = (id: string) => {
    dispatch({
      type: "INCREMENT_QUANTITY",
      payload: { id },
    });
  };
  const DecrementQuantity = (id: string) => {
    dispatch({
      type: "DECREMENT_QUANTITY",
      payload: { id },
    });
  };

  useEffect(() => {
    dispatch({ type: "TOTAL_PRICE" });
    localStorage.setItem("Cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        IncrementQuantity,
        DecrementQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCartContext };
