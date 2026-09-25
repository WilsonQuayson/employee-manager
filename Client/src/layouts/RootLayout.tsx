import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav"
import TopNav from "../components/TopNav";

const RootLayout: React.FC = () => {
  return (
    <div className="overflow-hidden flex">
      <SideNav />
      <div className="flex flex-col w-screen">
        <TopNav />
        <main className="px-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
