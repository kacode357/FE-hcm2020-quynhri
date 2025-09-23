// components/site-logo.tsx
"use client";

import Link from "next/link";
import { cls } from "@/lib/styles";

export default function SiteLogo() {
  return (
    <Link href="/" className={cls.logo} aria-label="Trang chủ">
      Hành trình tư tưởng
    </Link>
  );
}
