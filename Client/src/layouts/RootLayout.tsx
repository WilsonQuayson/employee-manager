import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav"
import TopNav from "../components/TopNav";
import { Toaster } from "sonner";

const RootLayout: React.FC = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopNav />
          <Toaster
              position="top-center"
              offset={80}
              duration={3000}
              closeButton
              richColors
              toastOptions={{
                  classNames: {
                      toast: "!pr-10",
                      closeButton: "!left-auto !right-2 !top-1/2 !-translate-y-1/2"
                  }
              }}
          />
        <main className="min-h-0 flex-1 overflow-y-auto px-16 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
