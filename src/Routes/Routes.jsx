import { createBrowserRouter } from "react-router";
import RootLayOuts from "../LayOuts/RootLayOuts";
import Home from "../Pages/Home/Home";
import LoginPage from "../Pages/Auth/LoginPage";
import RegisterPage from "../Pages/Auth/RegisterPage";

 const router =createBrowserRouter([
  {
    path:'/',
    element:<RootLayOuts/>,
    children:[
      {
        index:true,
        element:<Home/>
      },
      {
        path:'login',
        element:<LoginPage/>

      },
      {
        path:'register',
        element:<RegisterPage/>
      }
    ]
  }
 ])
 export default router