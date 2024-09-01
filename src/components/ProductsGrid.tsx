import { useProducts } from "@/hooks/useProducts";
import React, { useState } from "react";
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

type Props = {};

const ProductsGrid = (props: Props) => {
  const { products, setPage } = useProducts();
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="text-xl font-semibold">{products.length} Products</div>
        <div>Clear all filter</div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 my-10">
        {products.map((product: Product, index) => {
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
              {Array.from({ length: totalPages }, (_, index) => {
                const pageIndex = index + 1;
                return (
                  <PaginationItem key={index}>
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
              })}
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
