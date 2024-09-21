import axios from "axios";
import { useEffect, useState, useMemo } from "react";

// Debounce function
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  // Get the filters from sessionStorage
  const storedFilters = JSON.parse(sessionStorage.getItem("filters") || "{}");
  const Gender = (sessionStorage.getItem("gender") || "").replace(/"/g, "");

  // Memoized query generation
  const query = useMemo(() => {
    let queryString = `shoes&${Gender}`;
    Object.keys(storedFilters).forEach((filterKey) => {
      if (storedFilters[filterKey]?.length > 0) {
        queryString += `&${storedFilters[filterKey].join("&")}`;
      }
    });
    return queryString;
  }, [storedFilters, Gender]);

  // Fetch data with debouncing
  const fetchProducts = debounce(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APIURL}/search`,
        {
          params: {
            query: query,
            page: page,
          },
        }
      );
      setProducts(response.data.hits);
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  }, 500);

  useEffect(() => {
    fetchProducts();
  }, [page, query]);

  return { products, loading, error, setPage };
}
