import React from "react";

type ProductCardProps = {
  title: string;
  category: string;
  price: number;
  imageSrc: string;
  brand: string;
  labels: string[];
};

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  category,
  price,
  imageSrc,
}) => {
  return (
    <div className="h-[450px] overflow-hidden w-[350px] md:w-[400px] flex flex-col ">
      <div className="relative h-[70%] w-full bg-gray-200 flex justify-center items-end">
        <img
          className="object-contain h-full p-2 mix-blend-multiply"
          src={imageSrc}
          alt={title}
        />
      </div>

      <div className="flex flex-col mt-1">
        <div>
          <h2 className="font-medium text-md text-[#151414]">{title}</h2>
        </div>
        <div className="flex flex-col justify-center text-[#838383]">
          <span className="">{category.split(" ").pop()}</span>
        </div>
        <p className="mt-1 font-semibold text-md text-[#151414]">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
