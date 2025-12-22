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
         path: "my-orders",
         element: <MyOrders />,
       },
       {
         path: "invoice",
         element: <Invoices />,
       },
       {
         path: "profile",
         element: <MyProfile />,
       },
       {
         path: "add-book",
         element:<AddBook/>
       },
     ],
   },
 ]);
 export default router