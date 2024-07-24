import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Header = () => {
  return (
    <div className=" p-5 border shadow-sm">
      <div className=" flex items-center justify-between">
        <div className=" flex gap-3 items-center">
          <Image
            src={"/khazi-logo.png"}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className=" text-blue-700 font-bold tracking-wide">
            LineDevLTD Form
          </h1>
        </div>
        <Button>Create form</Button>
      </div>
    </div>
  );
};

export default Header;
