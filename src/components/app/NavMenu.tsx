"use client";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";
import {ActiveIcon} from "icons/index";

const links = [
  {
    href: "/",
    name: "Departments",
    icon: ActiveIcon,
  },
];

export default function NavMenu() {
  const pathname = usePathname();

  return (
    <nav className="mt-6 w-full flex-grow">
      <ul className="h-full flex flex-col justify-between">
        <div className="divide-y divide-ea">
          <div className="pb-4">
            {/* This section iterates over the "links" array to render each navigation link. */}
            {links.map((link) => {
              const isActive = pathname?.startsWith(link.href);

              const Icon = link.icon;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={
                      !isActive
                        ? "flex gap-3 items-center py-4 px-2 text-primary/80"
                        : "flex gap-3 items-center py-4 px-2 bg-primary/10 rounded-lg text-primary"
                    }
                  >
                    <Icon />

                    <span className="whitespace-nowrap">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </div>
        </div>
      </ul>
    </nav>
  );
}
