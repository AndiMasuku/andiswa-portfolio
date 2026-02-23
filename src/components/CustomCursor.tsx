import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only show custom cursor on desktop
    if (window.innerWidth < 768) return;

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
        cursor.style.left = `${x - 12}px`;
        cursor.style.top = `${y - 12}px`;
      });
    };

    const show = () => { cursor.style.opacity = "1"; };
    const hide = () => { cursor.style.opacity = "0"; };

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
      className="fixed pointer-events-none z-[9998] w-6 h-6 rounded-full border border-primary blend-difference hidden md:block"
      style={{ opacity: 0, willChange: "left, top" }}
    />
  );
};

export default CustomCursor;
