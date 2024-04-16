"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const navigation = [
  { name: "New Meeting", href: "/" },
  { name: "About", href: "/about" },
];

export function Navbar() {
  const path = usePathname();
  return (
    <nav className="bg-black sticky top-0 z-30 backdrop-blur-md w-full font-mono">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 w-full">
        <div className="relative flex h-12 items-center justify-between">
          {/* desktop menu button */}
          <div className="flex w-full items-center justify-center sm:items-stretch sm:justify-between">
            <div className="sm:ml-6 sm:flex sm:space-x-8">
              <div className="flex space-x-4 text-white font-bold">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      path === item.href
                        ? "hover:underline hover:decoration-2 hover:underline-offset-4"
                        : "hover:underline hover:decoration-2 hover:underline-offset-4",
                      "rounded-md px-3 py-2 text-sm ",
                    )}
                    aria-current={path === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
