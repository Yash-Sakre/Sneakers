import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Heart, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";

import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Men", href: "/products" },
    { name: "Women", href: "#" },
    { name: "Kids", href: "#" },
    { name: "Collection", href: "#" },
  ];

  return (
    <header className="z-10 w-full border-b md:px-10">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to={"#"} className="text-3xl font-bold font-jost">
            SNKRS <span className="text-red-600 text-[10px]">&#9632;</span>
          </Link>
          <div className="flex items-center">
            <nav className="hidden space-x-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  state={{ title: link.name}}
                  className="text-lg font-medium"
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
              <Link to="#" className="hidden md:block ">
                <Heart />
              </Link>
              <Link to="#" className="">
                <BsHandbag size={23} />
              </Link>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={toggleMenu}
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
                  className="block text-6xl font-semibold custom-link"
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
