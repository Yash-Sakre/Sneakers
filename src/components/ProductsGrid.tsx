import { useProducts } from "@/hooks/useProducts";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/Sneakers";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import PulseLoader from "react-spinners/PulseLoader";

type Props = {};

const ProductsGrid = (props: Props) => {
  const { products, setPage, loading } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileView, setIsMobileView] = useState(false);
  const totalPages = 10;

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPage(currentPage + 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial window size

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      <div className="flex items-center justify-between"></div>
      <div className="flex items-center justify-center w-full h-full">
        {loading && (
          <p className="h-[60vh] items-center ">
            <PulseLoader />
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 my-10">
        {!loading &&
          products.map((product: Product, index) => {
            return (
              <Link
                to={`/products/${product.id}`}
                key={index}
                className="flex items-center justify-center"
              >
                <div className="flex flex-col items-center">
                  <ProductCard
                    title={product.title}
                    category={product.category}
                    price={product.base_price}
                    imageSrc={product.image}
                    brand={product.brand}
                    labels={product.labels}
                  />
                </div>
              </Link>
            );
          })}
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={handlePrevious} />
              </PaginationItem>

              {/* Determine how many pages to show based on screen size */}
              {Array.from(
                { length: Math.min(totalPages, isMobileView ? 3 : 10) },
                (_, index) => {
                  let pageIndex = currentPage + index;

                  if (isMobileView) {
                    // On mobile, ensure we don't go out of bounds for pages
                    if (currentPage === 1) {
                      pageIndex = index + 1; // always show from page 1 for mobile
                    }
                  }

                  if (pageIndex > totalPages) return null;

                  return (
                    <PaginationItem key={pageIndex}>
                      <PaginationLink
                        onClick={() => {
                          setCurrentPage(pageIndex);
                          setPage(pageIndex);
                        }}
                        isActive={currentPage === pageIndex}
                      >
                        {pageIndex}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              )}

              <PaginationItem>
                <PaginationNext onClick={handleNext} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
