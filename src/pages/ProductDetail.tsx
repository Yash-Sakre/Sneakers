import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product, Variant } from "@/types/Product";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import { toast } from "sonner";

export default function ProductDetail() {
  const [product, setProduct] = useState<Product>();
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartContext();

  const fetchProductById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APIURL}/product/${id}`
      );
      setProduct(response.data);
      if (response.data.variants.length > 0) {
        setSelectedVariant(response.data.variants[0]);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProductById();
    }
  }, [id]);

  const handleSizeChange = (size: string) => {
    const variant = product?.variants.find((v) => v.size === size);
    setSelectedVariant(variant || null);
  };

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addToCart({
        id,
        name: product?.title || "",
        price: selectedVariant?.price,
        variantSize: selectedVariant?.size,
        quantity,
        product,
        image: product?.image,
        amount: selectedVariant?.price * quantity,
      });

      toast("Product added successfully to cart ");
    }
  };

  return (
    <div className="flex flex-col items-start justify-center px-10 my-10 space-x-20 md:flex-row">
      <div className="flex items-center justify-center flex-1 bg-gray-200">
        {product?.image ? (
          <img
            src={product.image}
            alt={product.title || "Product Image"}
            className="object-contain w-2/3 h-auto md:w-full mix-blend-multiply"
          />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <div className="text-sm text-muted-foreground">
          {product?.category || "Category not available"}
        </div>
        <h1 className="text-3xl font-bold">{product?.title || "Loading..."}</h1>
        <div className="text-xl font-semibold">
          $
          {selectedVariant?.price
            ? `${selectedVariant.price} ${selectedVariant.currency}`
            : "Loading price..."}
        </div>
        {product?.description ? (
          <p
            dangerouslySetInnerHTML={{
              __html: product.description,
            }}
          />
        ) : (
          <p>No description available.</p>
        )}
        <a
          href={product?.link}
          className="text-blue-500 w-fit"
          target="_blank"
          rel="noopener noreferrer"
        >
          See more...
        </a>
        <hr />
        <div className="flex flex-wrap w-1/2 gap-2 mt-4">
          {product?.variants &&
            product.variants.length > 1 &&
            Array.from(
              new Set(product.variants.map((variant) => variant.size))
            ).map((uniqueSize) => {
              return (
                <Button
                  size={"icon"}
                  variant={"ghost"}
                  key={uniqueSize}
                  onClick={() => handleSizeChange(uniqueSize)}
                  className={`w-0 p-5 text-center border-2 rounded-none ${
                    selectedVariant?.size === uniqueSize
                      ? "border-black bg-black text-white"
                      : "border-black"
                  }`}
                >
                  {uniqueSize}
                </Button>
              );
            })}
        </div>
        {product?.variants && product.variants.length > 1 && <hr />}
        <div className="flex items-center gap-4 mt-4">
          <select
            className="p-3 text-lg border"
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {Array.from({ length: 5 }, (_, i) => i + 1).map((quantity) => (
              <option key={quantity} value={quantity}>
                {quantity}
              </option>
            ))}
          </select>
          <Button
            variant={"ghost"}
            className="flex-1 p-6 text-white bg-black rounded-none hover:bg-black hover:text-white"
            onClick={handleAddToCart}
          >
            ADD TO CART
          </Button>
        </div>
      </div>
    </div>
  );
}
