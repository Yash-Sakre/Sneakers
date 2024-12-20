import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product, Variant } from "@/types/Product";
import { Button } from "@/components/ui/button";
import { useCartContext } from "@/contexts/CartContext";
import { toast } from "sonner";

import {
  Plus,
  Minus,
  ShoppingCart,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function ProductDetail() {
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product>();
  const [selectedSize, setSelectedSize] = useState("m");

  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const { id } = useParams();

  const { addToCart } = useCartContext();

  const fetchProductById = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APIURL}/products/${id}`,
        {
          headers: {
            Authorization: `${import.meta.env.VITE_STOCKX_AUTH}`,
          },
        }
      );
      setProduct(response.data.data);
      if (response.data.data.variants.length > 0) {
        setSelectedVariant(response.data.data.variants[0]);
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

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const toggleDescription = () => setIsDescriptionExpanded((prev) => !prev);

  const fullDescription = `${product?.description}`;

  const shortDescription = fullDescription.slice(0, 150) + "...";

  const sizeOrder = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  product?.variants.sort((a: Variant, b: Variant) => {
    const isANumeric = !isNaN(Number(a.size));
    const isBNumeric = !isNaN(Number(b.size));

    if (isANumeric && isBNumeric) {
      return Number(a.size) - Number(b.size);
    } else if (!isANumeric && !isBNumeric) {
      return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
    } else {
      return isANumeric ? -1 : 1;
    }
  });

  console.log(product);

  return (
    <div className="px-4 py-8 mx-auto ">
      <Card className="overflow-hidden border-none shadow-none">
        <CardContent className="p-0">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Product Image */}
            <div className="relative">
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

            {/* Product Details */}
            <div className="flex flex-col justify-between p-6">
              <div>
                <h1 className="mb-2 text-3xl font-bold">
                  {product?.title || "Loading..."}
                </h1>
                <p className="mb-4 text-2xl font-semibold text-primary">
                  $
                  {selectedVariant?.price
                    ? `${selectedVariant.price} ${selectedVariant.currency}`
                    : "Loading price..."}
                </p>
                <div className="mb-6">
                  <p className="text-gray-600">
                    {isDescriptionExpanded ? fullDescription : shortDescription}
                  </p>
                  {fullDescription.length > 150 && (
                    <Button
                      variant="ghost"
                      className="h-auto p-0 mt-2 font-semibold text-primary"
                      onClick={toggleDescription}
                    >
                      {isDescriptionExpanded ? (
                        <>
                          Show Less <ChevronUp className="w-4 h-4 ml-1" />
                        </>
                      ) : (
                        <>
                          Show More <ChevronDown className="w-4 h-4 ml-1" />
                        </>
                      )}
                    </Button>
                  )}
                </div>

                {/* Size Selection */}
                <div className="mb-6">
                  <h2 className="mb-2 text-lg font-semibold">Select Size</h2>
                  <RadioGroup
                    value={selectedSize}
                    onValueChange={setSelectedSize}
                    className="flex flex-wrap items-center gap-3"
                  >
                    {product?.variants.map((variant) => {
                      const isSelected = selectedVariant?.size === variant.size;
                      return (
                        <div key={variant.id}>
                          <RadioGroupItem
                            value={variant.size}
                            id={`size-${variant.size}`}
                            onClick={() => handleSizeChange(variant.size)}
                            className={` sr-only peer ${
                              isSelected
                                ? "border-black bg-black text-white"
                                : "border-black"
                            }`}
                          />
                          <Label
                            htmlFor={`size-${variant.size}`}
                            className={`flex items-center justify-center rounded-md border-2 bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary w-10 ${
                              isSelected
                                ? "border-black bg-black text-white"
                                : "border-muted "
                            }`}
                          >
                            {variant.size.toUpperCase()}
                          </Label>
                        </div>
                      );
                    })}
                  </RadioGroup>
                </div>

                {/* Quantity Selector */}
                <div className="flex items-center mb-6 space-x-4">
                  <h2 className="text-lg font-semibold">Quantity:</h2>
                  <div className="flex items-center rounded-md">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={decrementQuantity}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 px-4 py-2 text-center">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={incrementQuantity}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                className="w-full bg-black"
                size="lg"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
