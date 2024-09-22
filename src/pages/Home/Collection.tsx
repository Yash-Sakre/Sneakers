import React from "react";
import { motion } from "framer-motion";
import women from "@/assets/pexels-wendelmoretti-1972115.jpg";
import men from "@/assets/pexels-atta-peters-15367227-25525601.jpg";
import kid from "@/assets/pexels-amina-filkins-5560018.jpg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSessionStorage } from "@/hooks/useSessionStorage";

type Props = {};

const Collection = (props: Props) => {
  const [gender, setGender] = useSessionStorage("gender", "");
  return (
    <div className="min-h-screen p-10 lg:p-20">
      <div className="text-4xl md:text-5xl font-anton">Shop by Collection</div>
      <div className="flex flex-col justify-center flex-1 gap-4 mt-2 md:gap-10 md:mt-10 md:flex-row">
        {[
          { img: women, label: "Women", href: "/products" },
          { img: men, label: "Men", href: "/products" },
          { img: kid, label: "Kids", href: "/products" },
        ].map((item, index) => (
          <Link
            key={index}
            to={item.href}
            state={{ title: item.label }}
            className="relative flex flex-col items-center justify-center flex-1 w-full h-full cursor-pointer"
            onClick={() => setGender(item.label)}
          >
            <img
              src={item.img}
              alt={item.label}
              className="w-full md:h-[80vh] aspect-square"
              loading="lazy"
            />
            <motion.div
              className="absolute flex flex-col items-center justify-center w-full h-full gap-5 text-5xl opacity-0 md:text-8xl bg-muted/60 font-anton md:flex "
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {item.label}
              <Button className="p-10 text-4xl bg-black rounded-none hover:bg-black">
                Shop Now
              </Button>
            </motion.div>
            <div className="flex flex-col items-center justify-center mt-4 text-2xl font-anton md:hidden">
              {item.label}
              <Button className="bg-black rounded-none hover:bg-black">
                Shop Now
              </Button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collection;
