import React from "react";
import { Outlet, Link } from "react-router-dom";
import Nav from "../components/Nav"

const RootLayout: React.FC = () => {
  return (
    <div>
        <Nav />
        <main className="p-4">
            <Outlet />
        </main>
    </div>
  );
};

export default RootLayout;
