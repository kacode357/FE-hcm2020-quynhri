// components/main-header.tsx
"use client";

import Link from "next/link";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import SiteLogo from "@/components/site-logo";
import ThemeToggle from "@/components/theme-toggle";
import MobileMenu from "@/components/mobile-menu";
import { NAV_ITEMS } from "@/lib/nav";
import { cls } from "@/lib/styles";

export default function MainHeader() {
  return (
    <header className={cls.header}>
      <div className={`${cls.container} ${cls.headerInner}`}>
        {/* Left: Logo + Mobile menu */}
        <div className="flex items-center gap-2">
          <MobileMenu />
          <SiteLogo />
        </div>

        {/* Center: Desktop nav */}
        <nav className={cls.nav} aria-label="Chuyển trang chính">
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {NAV_ITEMS.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link href={item.href} className={cls.navLink}>
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right: Actions */}
        <div className={cls.right}>
          <Button className={cls.cta} asChild>
            <Link href="/timeline">Bắt đầu</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
