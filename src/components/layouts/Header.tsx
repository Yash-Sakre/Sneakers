import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Heart, Search, SearchCheck, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: "Men", href: "#" },
    { name: "Women", href: "#" },
    { name: "Kids", href: "#" },
    { name: "Collection", href: "#" },
  ];

  return (
    <header className="z-10 w-full border-b md:px-10">
      <div className="px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to={"#"} className="text-3xl font-bold font-jost">
            Sneakers <span className="text-red-600 text-[10px]">&#9632;</span>
          </Link>
          <div className="flex items-center">
            <nav className="hidden space-x-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
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
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:hidden absolute  w-full p-4 bg-white `}
      >
        <nav className="flex flex-col gap-10">
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
      </div>
    </header>
  );
}
