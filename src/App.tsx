import { RouterProvider } from "react-router-dom";

import { router } from "./Router";
import ProductsProvider from "./contexts/ProductsProvider";

export default function App() {
  return (
    <ProductsProvider>
      <RouterProvider router={router} />
    </ProductsProvider>
  );
}
