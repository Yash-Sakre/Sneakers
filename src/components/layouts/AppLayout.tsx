import { Link, Outlet, useLocation, useSearchParams } from "react-router-dom";
import { Header } from "./Header";
import Footer from "./Footer";
import { useEffect } from "react";

export function Applayout() {
  const location = useLocation();

  const isProductsPage = location.pathname.includes("/products");

  console.log(isProductsPage);
  return (
    <>
      <Header />
      <div
        className={`flex flex-col items-center py-2 ${
          isProductsPage ? "bg-black text-white" : ""
        }  `}
      >
        <div>Members : Free Shipping on Orders $50+</div>
        <Link to={"#"} className="font-semibold underline">
          Join Now
        </Link>
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-col flex-grow">
          <Outlet />
        </div>
      </div>
      <div className="">
        <Footer />
      </div>
    </>
  );
}
