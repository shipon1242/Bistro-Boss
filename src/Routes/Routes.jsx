import {
  createBrowserRouter,

} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Menu from "../Pages/Menu/Menu/Menu";
import Order from "../Pages/Order/Order/Order";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Pages/Shared/Secret/Secret";
import DashBoard from "../Layout/DashBoard";
import Cart from "../Pages/DashBoard/Cart/Cart";
import AllUsers from "../Pages/DashBoard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import AddItems from "../Pages/DashBoard/AddItems/AddItems";
import ManageItems from "../Pages/DashBoard/ManageItems/ManageItems";
import UpdateItem from "../Pages/DashBoard/UpdateItem/UpdateItem";
import Payment from "../Pages/DashBoard/Payment/Payment";
import PaymentHistory from "../Pages/DashBoard/PaymentHistory/PaymentHistory";
import UserHome from "../Pages/DashBoard/UserHome/UserHome";
import AdminHome from "../Pages/DashBoard/AdminHome/AdminHome";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>

      },
      {
        path: "/menu",
        element: <Menu></Menu>
      },
      {
        path: "/order/:category",
        element: <Order></Order>
      },
      {
        path: "/login",
        element: <Login></Login>
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>
      },
      {
        path: "/secret",
        element: <PrivateRoute> <Secret></Secret> </PrivateRoute>
      }
    ]
  },
  {
    path: "/dashboard",
    element: <PrivateRoute><DashBoard></DashBoard></PrivateRoute>,
    children: [
      {
        path: "userHome",
        element: <UserHome></UserHome>
      },
      {
        path: "cart",
        element: <Cart></Cart>
      },
      {
        path: "payment",
        element: <Payment></Payment>
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>
      },


      // admin routes
      {
        path: "adminHome",
        element: <AdminRoute><AdminHome></AdminHome> </AdminRoute>
      },
      {
        path: "allUsers",
        element: <AdminRoute>
          <AllUsers></AllUsers>
        </AdminRoute>
      },
      {
        path: "addItems",
        element: <AdminRoute><AddItems></AddItems></AdminRoute>
      },
      {
        path: "manageItems",
        element: <AdminRoute> <ManageItems></ManageItems> </AdminRoute>
      },
      {
        path: "updateItem/:id",
        element: <UpdateItem></UpdateItem>,
        loader: ({ params }) => fetch(`http://localhost:5000/updateItem/${params.id}`)
      }

    ]
  }
]);