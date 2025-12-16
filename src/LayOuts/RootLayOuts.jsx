import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navber from "../Pages/Shared/Navber";
import Footer from "../Pages/Shared/Footer";

const RootLayOuts = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex flex-col h-screen">
      <Navber theme={theme} setTheme={setTheme} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default RootLayOuts;
