import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing";
import NewArrival from "./pages/Home/NewArrival";
import ProductsList from "./pages/ProductsList";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "",
          element: <Landing />,
        },
        {
          path: "/products",
          element: <ProductsList />,
        },
        {
          path: "/products/:id",
          element: <ProductDetail />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
      ],
    },
    {
      path: "/checkout",
      element: <Checkout />,
    },
    {
      path: "*",
      element: <NoMatch />,
    },
  ],
  {
    basename: global.basename,
  }
);
