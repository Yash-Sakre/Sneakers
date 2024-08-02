import { useProducts } from "@/hooks/useProducts";
import { createContext, useContext } from "react";

const productContext = createContext<any[]>([]);

function ProductsProvider({ children }: { children: any }) {
  const products = useProducts();

  return (
    <productContext.Provider value={products}>
      {children}
    </productContext.Provider>
  );
}

function useProductConsumer() {
  const context = useContext(productContext);
  return context;
}

export default ProductsProvider;
export { useProductConsumer };
