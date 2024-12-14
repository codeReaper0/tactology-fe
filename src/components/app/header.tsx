"use client";
import React from "react";
import {Avatar} from "images/index";
import Image from "next/image";
import {signOut} from "next-auth/react";

export default function Header() {
  return (
    <header className="px-6 py-3 flex gap-6 items-center justify-between shadow-[0px_1px_0px_0px_rgba(0,0,0,0.10)] w-full">
      <div className="flex gap-3.5">
        <p className="text-2xl text-text-secondary font-semibold lg:hidden text-primary">
          <span>Tactology</span>
        </p>
        <p className="text-2xl text-text-secondary hidden lg:block">
          <span>Hello</span>
        </p>
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2 cursor-pointer hover:bg-primary/10 p-2 rounded transition-colors duration-300">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image src={Avatar} width={200} height={200} alt="avatar" />
          </div>
        </div>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </header>
  );
}
