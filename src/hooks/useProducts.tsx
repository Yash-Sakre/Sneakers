import axios from "axios";
import { useEffect, useState } from "react";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dataFetcher = async () => {
      try {
        const response = await axios.get("https://api.stockx.vlour.me/search", {
          params: {
            query: "",
            page: page,
          },
        });

        setProducts(response.data.hits);
      } catch (err: any) {
        console.error("Error fetching data:", err);
        setError("Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    dataFetcher();
  }, [page]);

  return { products, loading, error, setPage };
}
