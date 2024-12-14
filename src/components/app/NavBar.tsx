import React from "react";
import NavMenu from "./NavMenu";

export default function NavBar() {
  return (
    <aside className="h-full min-w-[227px] max-w-[227px] bg-fa p-3 pt-5 hidden lg:flex flex-col">
      <p className="text-3xl font-bold text-primary">Tactology</p>

      <NavMenu />
    </aside>
  );
}
