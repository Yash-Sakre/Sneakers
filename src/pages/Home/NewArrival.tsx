import React from "react";
import first from "@/assets/Image - Nike.png";
import cover from "@/assets/Cover.png";

type Props = {};

const NewArrival = (props: Props) => {
  return (
    <div className="min-h-screen px-10 mt-5 md:px-20">
      <div>
        <div className="text-4xl md:text-5xl font-anton">New Collections</div>
      </div>
      <div className="flex flex-col gap-2 mt-10 md:flex-row">
        <div className="flex flex-col flex-1 gap-2">
          <img src={first} alt="" loading="lazy" />
          <div className="text-4xl font-anton">
            NIKE X SPACE JAME : A NEW LEGACY
          </div>
          <div className="text-lg">
            To celebrate the release of Space Jam: A New Legacy, Nike and
            Converse have joined forces to create an apparel and footwear
            collection worthy of Bugs Bunny and LeBron.
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <img src={cover} alt="" loading="lazy" />
          <div className="text-4xl font-anton">Nike Black History Month</div>
          <div className="text-lg">
            Nike is celebrating Black History Month with a new collection
            highlighted by customizable Air Force 1 sneakers.
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
