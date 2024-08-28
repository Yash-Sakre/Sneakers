
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export default function Component() {
  return (
    <div className="grid md:grid-cols-[1fr_300px] gap-8 max-w-6xl mx-auto px-4 py-8">
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Your Cart</h1>
          <div className="grid gap-4">
            <div className="grid md:grid-cols-[80px_1fr_80px_100px] items-center gap-4">
              <img
                src="/placeholder.svg"
                alt="Product Image"
                width={80}
                height={80}
                className="object-cover rounded-md"
                style={{ aspectRatio: "80/80", objectFit: "cover" }}
              />
              <div className="grid gap-1">
                <h3 className="font-medium">Acme Circles T-Shirt</h3>
                <p className="text-sm text-muted-foreground">60% combed ringspun cotton/40% polyester jersey tee.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <MinusIcon className="w-4 h-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span>2</span>
                <Button variant="outline" size="icon">
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              <div className="font-medium">$99.00</div>
              <Button variant="outline" size="icon" className="ml-auto">
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove from cart</span>
              </Button>
            </div>
            <div className="grid md:grid-cols-[80px_1fr_80px_100px] items-center gap-4">
              <img
                src="/placeholder.svg"
                alt="Product Image"
                width={80}
                height={80}
                className="object-cover rounded-md"
                style={{ aspectRatio: "80/80", objectFit: "cover" }}
              />
              <div className="grid gap-1">
                <h3 className="font-medium">Acme Circles T-Shirt</h3>
                <p className="text-sm text-muted-foreground">60% combed ringspun cotton/40% polyester jersey tee.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon">
                  <MinusIcon className="w-4 h-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span>1</span>
                <Button variant="outline" size="icon">
                  <PlusIcon className="w-4 h-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
              <div className="font-medium">$99.00</div>
              <Button variant="outline" size="icon" className="ml-auto">
                <XIcon className="w-4 h-4" />
                <span className="sr-only">Remove from cart</span>
              </Button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="grid gap-4">
          <h2 className="text-xl font-bold">Promo Code</h2>
          <div className="flex gap-2">
            <Input type="text" placeholder="Enter promo code" className="flex-1" />
            <Button>Apply</Button>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-4">
          <h2 className="text-xl font-bold">Order Summary</h2>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>$198.00</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Taxes</span>
              <span>$19.80</span>
            </div>
            <Separator />
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>$217.80</span>
            </div>
          </div>
        </div>
        <Button size="lg" className="w-full">
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}

function MinusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  )
}


function PlusIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}


function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}