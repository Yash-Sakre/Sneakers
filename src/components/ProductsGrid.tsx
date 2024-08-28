import { useProducts } from "@/hooks/useProducts";
import React from "react";
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
  const { products } = useProducts();

  console.log(products);
  return (
    <div className="">
      <div className="flex items-center justify-between ">
        <div>12 Product</div>
        <div>Clear all filter</div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5 my-10">
        {products.map((product: Product, index) => {
          return (
            <Link
              to={`/products/${product.id}`}
              key={index}
              className="flex items-center justify-center "
            >
              <div className="flex flex-col items-center ">
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
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ProductsGrid;
