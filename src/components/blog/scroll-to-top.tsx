"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      const footerVisible = footer
        ? footer.getBoundingClientRect().top < window.innerHeight
        : false;
      setVisible(window.scrollY > 300 && !footerVisible);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-6 bottom-20 z-50 size-9 flex items-center justify-center rounded-lg border border-border bg-background shadow-sm transition-all hover:bg-muted ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-2 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="size-4 transition-transform hover:-translate-y-0.5" />
    </button>
  );
}
