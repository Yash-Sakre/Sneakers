import HomeBanner from "@/components/HomeBanner";

import * as React from "react";
import { Link } from "react-router-dom";

export interface IAppProps {}

export default function App(props: IAppProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full ">
     
      <div className="w-full ">
        <HomeBanner />
      </div>
    </div>
  );
}
