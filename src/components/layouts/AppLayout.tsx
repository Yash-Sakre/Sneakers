import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function Applayout() {
  return (
    <>
      <Header />
      <div className="flex flex-col flex-grow">
        <div className="container flex flex-col flex-grow px-4 md:px-8">
          <Outlet />
        </div>
      </div>
      <div className="container px-4 md:px-8">
        <Footer />
      </div>
    </>
  );
}
