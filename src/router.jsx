import { createBrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Suppiler from "./pages/Supplier";
import Layout from "./layout";
import LandingPage from "./pages/LandingPage";

const router = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/supplier",
          element: <Suppiler />,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
      ],
    },
  ]);
};

export default router;
