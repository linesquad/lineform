import { SignedIn } from "@clerk/nextjs";
import React from "react";
import Sidenav from "./_components/Sidenav";

const DashboardLayout = ({ children }) => {
  return (
    <SignedIn>
      <div className=" grid grid-cols-1">
        <div className=" md:w-64 block md:fixed">
          <Sidenav />
        </div>
        <div className=" md:ml-64 bg-white">{children}</div>
      </div>
    </SignedIn>
  );
};

export default DashboardLayout;
