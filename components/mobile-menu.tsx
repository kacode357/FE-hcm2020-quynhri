// components/mobile-menu.tsx
"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NAV_ITEMS } from "@/lib/nav";
import { cls } from "@/lib/styles";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className={cls.ghostIcon} aria-label="Mở menu">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="text-red-700 dark:text-red-300">Điều hướng</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 grid gap-2">
          {NAV_ITEMS.map((item) => (
            <Button key={item.href} variant="ghost" className="justify-start" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
          <Button className={cls.cta} asChild>
            <Link href="/timeline">Bắt đầu đọc</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
