import { createBrowserRouter } from "react-router";
import RootLayOuts from "../LayOuts/RootLayOuts";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";
import Books from "../Pages/Book/Books";
import BookDetails from "../Pages/Home/BookDetails";
import PriviteRoutes from "./PriviteRoutes";

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
 ]);
 export default router