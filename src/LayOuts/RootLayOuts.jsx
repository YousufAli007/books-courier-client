import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import Navber from "../Pages/Shared/Navber";

const RootLayOuts = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div>
      <Navber theme={theme} setTheme={setTheme} />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayOuts;
