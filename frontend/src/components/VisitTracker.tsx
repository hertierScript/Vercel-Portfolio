"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin") || pathname.startsWith("/analytics")) {
      return;
    }

    const logVisit = async (type: string) => {
      try {
        const data = {
          ip: "unknown", // In a real app, you'd get this from the server
          country: "unknown",
          startTime: new Date(),
          endTime: type === "end" ? new Date() : undefined,
          pages: [pathname],
        };
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/visits`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch (error) {
        console.error("Error logging visit:", error);
      }
    };

    // Log start
    logVisit("start");

    // Log page view
    logVisit("page");

    // Log end on unload
    const handleBeforeUnload = () => {
      logVisit("end");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      logVisit("end");
    };
  }, [pathname]);

  return null;
}
