import { RouterProvider } from "react-router-dom";

import { router } from "./Router";
import ProductsProvider from "./contexts/ProductsProvider";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </ProductsProvider>
  );
}
