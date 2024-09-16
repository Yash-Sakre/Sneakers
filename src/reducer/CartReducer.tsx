import { CartState, CartAction } from "@/types/Cart";
import { useEffect } from "react";

const cartReducer = (state: CartState, action: CartAction): CartState => {
  if (action.type === "ADD_TO_CART") {
    const { id, price, name, quantity, variantSize, product } = action.payload;

    const uniqueId = id + variantSize;

    let existingProduct = state.cart.find(
      (currElem) => currElem.id === uniqueId
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((currElem) => {
        if (currElem.id === uniqueId) {
          return {
            ...currElem,
            amount: currElem.amount + price * quantity,
            quantity: currElem.quantity + quantity,
          };
        } else {
          return currElem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let CartProduct = {
        id: id + variantSize,
        name: name,
        price: price,
        quantity: quantity,
        variantSize: variantSize,
        product: product,
        image: product.image,
        amount: price * quantity, // Amount should be price * quantity for new item
      };

      return { ...state, cart: [...state.cart, CartProduct] };
    }
  }

  if (action.type === "REMOVE_FROM_CART") {
    const UpdatedCart = state.cart.filter(
      (currItem) => currItem.id !== action.payload.id
    );

    return {
      ...state,
      cart: UpdatedCart,
    };
  }

  if (action.type === "DECREMENT_QUANTITY") {
    const { id } = action.payload;
    const updatedCart = state.cart.map((currElem) => {
      if (currElem.id === id) {
        return {
          ...currElem,
          quantity: currElem.quantity > 1 ? currElem.quantity - 1 : 1,
        };
      } else {
        return currElem;
      }
    });
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "INCREMENT_QUANTITY") {
    const { id } = action.payload;
    const updatedCart = state.cart.map((currElem) => {
      if (currElem.id === id) {
        return {
          ...currElem,
          quantity: currElem.quantity + 1,
        };
      } else {
        return currElem;
      }
    });
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "TOTAL_PRICE") {
    const totalPrice = state.cart.reduce((acc, currElem) => {
      const { quantity, amount } = currElem;
      acc = acc + quantity * amount;

      return acc;
    }, 0);

    return {
      ...state,
      totalPrice,
    };
  }

  return state;
};

export default cartReducer;
