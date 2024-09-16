import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

import { useCartContext } from "@/contexts/CartContext";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react";

export default function Component() {
  const { cart,totalPrice,tax_fee } = useCartContext();
  const { removeItem, DecrementQuantity, IncrementQuantity } = useCartContext();


  return (
    <div className="flex flex-col items-center justify-center gap-20 px-10 my-10 md:flex-row md:px-44">
      <div className="grid flex-1 md:w-[70%] w-full gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <div className="grid gap-4">
            {cart.map((item, index) => {
              return (
                <div className="grid md:grid-cols-[80px_1fr_80px_50px_20px] items-center gap-4">
                  <img
                    src={item.image}
                    alt="Product Image"
                    width={80}
                    height={80}
                    className="object-cover rounded-md"
                    style={{ aspectRatio: "80/80", objectFit: "cover" }}
                  />
                  <div className="grid gap-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-md text-muted-foreground">
                      Base Price: ${item.price} USD
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        DecrementQuantity(item.id);
                      }}
                    >
                      <MinusIcon className="w-4 h-4" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span>{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => IncrementQuantity(item.id)}
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                  <div className="font-medium">
                    ${item.amount * item.quantity}
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-auto"
                    onClick={() => removeItem(item.id)}
                  >
                    <XIcon className="w-4 h-4" />
                    <span className="sr-only">Remove from cart</span>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <h2 className="text-xl font-bold">Promo Code</h2>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter promo code"
              className="flex-1"
            />
            <Button>Apply</Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:w-[30%] w-full gap-6">
        <div className="grid gap-4">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Taxes</span>
              <span>${tax_fee}</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>${totalPrice + tax_fee}</span>
            </div>
          </div>
        </div>
        <Button size="lg" className="w-full">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}
