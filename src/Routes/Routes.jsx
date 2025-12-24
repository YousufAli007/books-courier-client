import { createBrowserRouter } from "react-router";
import RootLayOuts from "../LayOuts/RootLayOuts";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
import Books from "../Pages/Book/Books";
import BookDetails from "../Pages/Home/BookDetails";
import PriviteRoutes from "./PriviteRoutes";
import DashboardLayout from "../LayOuts/DashboardLayout";
import MyOrders from "../Pages/Dashboard/MyOrders";
import Invoices from "../Pages/Dashboard/Invoices";
import MyProfile from "../Pages/Dashboard/MyProfile";
import AddBook from "../Pages/Dashboard/AddBook";
import MyBook from "../Pages/Dashboard/MyBook";
import EditeBook from "../Pages/Dashboard/EditeBook";
import Order from "../Pages/Dashboard/Order";
import AllUser from "../Pages/Dashboard/AllUser";
import ManageBook from "../Pages/Dashboard/ManageBook";
import Wishlist from "../Pages/Dashboard/Wishlist";
import NotFound from "../Components/NotFound";
import Payment from "../Pages/Dashboard/Payment";
import PaymentSuccess from "../Pages/Dashboard/PaymentSuccess";
import PaymentCencel from "../Pages/Dashboard/PaymentCencel";

 const router = createBrowserRouter([
   {
     path: "/",
     element: <RootLayOuts />,
     children: [
       {
         index: true,
         element: <Home />,
       },
       {
         path: "login",
         element: <LoginPage />,
       },
       {
         path: "register",
         element: <RegisterPage />,
       },
       {
         path: "books",
         element: <Books />,
       },
       {
         path: "book-details/:id",
         element: (
           <PriviteRoutes>
             <BookDetails />
           </PriviteRoutes>
         ),
       },
     ],
   },
   {
     path: "/dashboard",
     element: (
       <PriviteRoutes>
         <DashboardLayout />
       </PriviteRoutes>
     ),
     children: [
       {
         path: "profile",
         element: <MyProfile />,
       },
       {
         path: "my-orders",
         element: <MyOrders />,
       },
       {
         path: "invoice",
         element: <Invoices />,
       },
       {
         path: "add-book",
         element: <AddBook />,
       },
       {
         path: "my-book",
         element: <MyBook />,
       },
       {
         path: "edite-book/:id",
         element: <EditeBook />,
       },
       {
         path: "order",
         element: <Order />,
       },
       {
         path: "all-user",
         element: <AllUser />,
       },
       {
         path: "manage-book",
         element: <ManageBook />,
       },
       {
         path: "wishlist",
         element: <Wishlist />,
       },
       {
         path: "payment/:parcelId",
         element: <Payment />,
       },
       {
         path: "payment-success",
         element: <PaymentSuccess />,
       },
       {
         path: "payment-cancel",
         element:<PaymentCencel></PaymentCencel>
       },
     ],
   },
   {
     path: "*",
     element: <NotFound />,
   },
 ]);
 export default router