import Header from "@/components/app/header";
import NavBar from "@/components/app/NavBar";
import React from "react";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-screen h-screen overflow-hidden">
      <NavBar />
      <div className="flex-grow h-full overflow-hidden flex flex-col">
        <Header />
        <div className="flex-grow w-full p-4 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
