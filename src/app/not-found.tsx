"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    try {
      const href = window.location.href;
      router.replace(`/not-found?from=${encodeURIComponent(href)}`);
    } catch {}
  }, [router]);
  return null;
}
