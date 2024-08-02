import { createBrowserRouter } from "react-router-dom";

import { Applayout } from "./components/layouts/AppLayout";

import NoMatch from "./pages/NoMatch";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home/Home";
import Landing from "./pages/Landing";
import NewArrival from "./pages/Home/NewArrival";
import ProductsList from "./pages/ProductsList";

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
      ],
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
