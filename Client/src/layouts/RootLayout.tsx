import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav"
import TopNav from "../components/TopNav";

const RootLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
        <main className="min-h-0 flex-1 overflow-y-auto px-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
