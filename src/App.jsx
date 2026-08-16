import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Signup from "./pages/Signup";
import AddProduct from "./admin/AddProduct";
import ProductList from "./admin/ProductList";
import EditProduct from "./admin/EditProduct";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutAddress from "./pages/CheckoutAddress";
import OrderSuccess from "./pages/OrderSuccess";

function Layout(){
  return (
    <>
    <Navbar/>
    <Outlet/>
    </>
  )
}
const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
  {path: "/",element: <Home />,},
  {path: "/login",element: <Login />,},
  {path: "/signup",element: <Signup />,},
  {path: "/product/:id",element: <ProductDetails />,},
  {path: "/cart", element: <Cart/> },
  {path: "/admin/products",element: <ProductList />,},
  {path: "/admin/products/add",element: <AddProduct />,},
  {path: "/admin/products/edit/:id",element: <EditProduct />,},
  {path: "/checkout/address", element: <CheckoutAddress />},
  {path: "/checkout", element: <Checkout/>},
  {path: "/order-success/:id", element: <OrderSuccess/>},
  
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
