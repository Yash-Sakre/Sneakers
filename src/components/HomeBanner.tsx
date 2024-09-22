import * as React from "react";

import Retro from "@/assets/Frame 43 (1).png";
import { Button } from "./ui/button";
import Limited from "@/assets/Limited Edition Circle.png";

type Props = {};

const CarouselList = [
  {
    id: 1,
    name: "RETRO LOW ",
    short: "VOODOO",
    description:
      "The Air Jordan 1 Retro Low OG Zion Williamson Voodoo is made up of a variety of colors, with strong tones such as moon fossil, oil green, flax, muslin fauna, & sesame.",
    image: Retro,
  },
];

const HomeBanner = (props: Props) => {
  return (
    <div className="h-full">
      {CarouselList.map((item, index) => (
        <div
          key={index}
          className="w-full h-full bg-[#72B778]/90 min-h-[calc(100vh-9.1rem)] flex items-center px-4"
        >
          <div className="flex flex-col items-center justify-center flex-1 mt-6 lg:mt-10 lg:flex-row lg:items-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 text-white uppercase text-7xl md:text-9xl font-anton">
                {item.name}{" "}
                <span className="p-4 px-6 text-black bg-[#E5BE67] text-6xl md:text-8xl font-anton w-fit">
                  {item.short}
                </span>
              </div>
              <div className=" w-[350px] md:w-[600px] text-xl text-white font-medium">
                {item.description}
              </div>
            </div>

            <div className="relative mt-5">
              {/* <div className="absolute lg:w-[500px] md:w-[250px] md:h-[250px] w-[150px] h-[150px]  lg:h-[500px] bg-[#E5BE67] rounded-full top-0 right-0 lg:-top-20 lg:-right-5 z-0"></div> */}
              <img src={item.image} alt="" className="z-[10000] " />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomeBanner;
