import Collection from "./Home/Collection";

import Home from "./Home/Home";
import NewArrival from "./Home/NewArrival";
import Newsletter from "./Home/Newsletter";

type Props = {};

function Landing({}: Props) {
  return (
    <>
      <Home />
      <Collection />
      <NewArrival />
      <Newsletter />
    </>
  );
}

export default Landing;
