import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Products from "./componets/Products";
import Cart from "./componets/Cart";

const router = createBrowserRouter([
  {
    path: "/shopping-cart/",
    element: <App />,
  },
  {
    path: "/shopping-cart/Products",
    element: <Products />,
  },
  {
    path: "/shopping-cart/Cart",
    element: <Cart />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);