"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const path = usePathname();
  if (path.includes("aiform")) return null;
  return (
    <div className=" p-5 border shadow-sm">
      <div className=" flex items-center justify-between">
        <Link href="/" className="flex gap-3 items-center">
          <Image
            src={"/trlogo.png"}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <h1 className=" text-primary font-bold tracking-wide">TR Form</h1>
        </Link>
        {isSignedIn ? (
          <div className=" flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <Button>Create form</Button>
          </SignInButton>
        )}
      </div>
    </div>
  );
};

export default Header;
