"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChartLine, LibraryBig, MessageSquareMore, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Sidenav = () => {
  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquareMore,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: ChartLine,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  const path = usePathname();

  // useEffect(() => {
  //   console.log(path);
  // }, [path]);

  return (
    <div className=" md:h-screen shadow-md border">
      <div className=" p-5">
        {menuList.map((menu, i) => (
          <Link key={i} href={menu.path}>
            <h2
              className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer text-gray-500  ${
                path === menu.path && "bg-primary text-white"
              }`}
            >
              <menu.icon />
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      <div className=" block md:fixed bottom-10 p-5 w-64">
        <Button className="w-full">Create form</Button>
        <div className=" mt-5">
          <Progress value={33} />
          <h2 className=" text-sm mt-2 text-gray-600">
            <strong>2</strong> out of <strong>3</strong> File created
          </h2>
          <h2 className=" text-xs mt-3 text-gray-600">
            Upgrade your plan for unlimited form
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Sidenav;
