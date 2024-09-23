import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Heart, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";

import { motion, AnimatePresence } from "framer-motion";
import { useCartContext } from "@/contexts/CartContext";
import { useSessionStorage } from "@/hooks/useSessionStorage";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCartContext();
  const [gender, setGender] = useSessionStorage("gender", "");

  const navLinks = [
    { name: "Men", href: "/products", gender: "male" },
    { name: "Women", href: "/products", gender: "female" },
    { name: "Kids", href: "/products", gender: "kids" },
    { name: "Unisex", href: "/products", gender: "unisex" },
  ];

  return (
    <header className="z-10 w-full border-b md:px-10">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to={"/"} className="text-3xl font-bold font-jost">
            SNKRS <span className="text-red-600 text-[10px]">&#9632;</span>
          </Link>
          <div className="flex items-center">
            <nav className="hidden space-x-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  state={{ title: link.name }}
                  className="text-lg font-medium"
                  onClick={() => setGender(link.gender)}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-5">
              <Link to="#" className="">
                <Search />
              </Link>

              <Link to="/checkout" className="relative">
                <BsHandbag size={23} />
                <div className="absolute text-sm font-medium bg-red-400 -right-3 -top-2 px-[4px] py-[3px] rounded-full flex items-center justify-center">
                  {cart.length}
                </div>
              </Link>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-800 hover:text-gray-600 focus:outline-none"
              >
                {isOpen ? (
                  <Cross1Icon className="w-6 h-6" />
                ) : (
                  <HamburgerMenuIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute w-full p-4 bg-white lg:hidden"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  state={{ title: link.name }}
                  className="block text-6xl font-semibold custom-link"
                  onClick={() => {
                    setIsOpen(!isOpen);
                    setGender(link.gender);
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
