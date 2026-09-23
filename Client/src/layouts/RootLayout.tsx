import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav"
import TopNav from "../components/TopNav";

const RootLayout: React.FC = () => {
  return (
    <div className="overflow-hidden flex">
      <SideNav />
      <TopNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
