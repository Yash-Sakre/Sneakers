import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const Newsletter = (props: Props) => {
  return (
    <div className="px-10 mt-10 md:px-20 bg-[#E5BE67] h-36 flex justify-center">
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center gap-2 py-10 text-lg md:gap-5 md:text-3xl font-anton">
          JOIN OUR SNKRS. CLUB AND GET 15% OFF
          <Button className="py-6 text-lg text-black bg-white rounded-none md:text-2xl md:py-7 hover:bg-white">
            Join Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
