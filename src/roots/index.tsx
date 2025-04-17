import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import MainLayout from "../components/main-layout";
import Shop from "../pages/shop";
import ProductsShop from "../pages/products-shop";
import ProductCheckout from "../pages/product-checkout";
import Blog from "../pages/blog";
import Rendering from "../components/blog/rendering";
import Profile from "../pages/profile";
import PriveteRoute from "./privete-route";
import { path_profile } from "../utils";
import User from "../pages/user";

export const root = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop/:category/:id",
        element: <Shop />,
      },
      {
        path: "/products-shop",
        element: <ProductsShop />,
      },
      {
        path: "/product-checkout",
        element: <ProductCheckout />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id/:user_id",
        element: <Rendering />,
      },
      {
        path: "/profile",
        element: <PriveteRoute />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
            children: path_profile.map(({ Component, path }) => ({
              path: `${path}`,
              element: <Component />,
            })),
          },
        ],
      },
      {
        path: "/user/:_id",
        element: <User />,
      },
    ],
  },
]);
