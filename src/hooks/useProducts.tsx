import axios from "axios";
import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  // https://api.stockx.vlour.me/search
  useEffect(() => {
    const dataFetcher = async () => {
      try {
        const response = await axios.get("", {
          params: {
            query: "",
            page: "1",
          },
        });
        setProducts(response.data.filter((item: any) => item));
      } catch (err: any) {
        throw new Error("something went wrong while fetching data", err);
      }
    };
    dataFetcher();
  }, []);
  return products;
}
