import ProductsGrid from "@/components/ProductsGrid";
import { useLocation } from "react-router-dom";

type Props = {};

const ProductsList = (props: Props) => {
  let { state } = useLocation();
  return (
    <div className="flex flex-col min-h-screen gap-5 px-10 mt-10 md:px-20">
      <div>
        <div className="text-7xl font-anton">{state.title}</div>
      </div>
      <div className="h-20 bg-yellow-50">Filter</div>
      <ProductsGrid />
    </div>
  );
};

export default ProductsList;
