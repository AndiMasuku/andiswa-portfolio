import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      window.innerWidth < 768 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const cursor = cursorRef.current;
    if (!cursor) return;

    let rafId = 0;
    let x = 0;
    let y = 0;

    const updateCursor = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursor.style.transform = `translate3d(${x - 12}px, ${y - 12}px, 0)`;
      });
    };

    const show = () => {
      cursor.style.opacity = "1";
    };
    const hide = () => {
      cursor.style.opacity = "0";
    };

    document.addEventListener("mousemove", updateCursor, { passive: true });
    document.addEventListener("mouseenter", show);
    document.addEventListener("mouseleave", hide);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseenter", show);
      document.removeEventListener("mouseleave", hide);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9998] w-6 h-6 rounded-full border border-emerald-600/35 hidden md:block transition-opacity duration-200"
      style={{ opacity: 0, willChange: "transform" }}
    />
  );
};

export default CustomCursor;
