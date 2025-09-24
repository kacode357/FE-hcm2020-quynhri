// components/main-header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import SiteLogo from "@/components/site-logo";
import ThemeToggle from "@/components/theme-toggle";
import MobileMenu from "@/components/mobile-menu";
import { NAV_ITEMS } from "@/lib/nav";
import { cls } from "@/lib/styles";

export default function MainHeader() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <header className={cls.header}>
      <div className={`${cls.container} ${cls.headerInner}`}>
        {/* Left: Logo + Mobile menu */}
        <div className="flex items-center gap-2">
          {/* Mobile menu: chỉ hiện trên mobile */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
          <SiteLogo />
        </div>

        {/* Center: Desktop nav */}
        <nav className={`${cls.nav} hidden md:flex`} aria-label="Chuyển trang chính">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.href);
                return (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        cls.navLink,
                        "relative aria-[current=page]:text-primary aria-[current=page]:font-semibold",
                        "aria-[current=page]:after:absolute aria-[current=page]:after:left-0 aria-[current=page]:after:right-0",
                        "aria-[current=page]:after:-bottom-1 aria-[current=page]:after:h-0.5 aria-[current=page]:after:bg-primary",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right: Actions */}
        <div className={cls.right}>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
