import { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Linkedin, Home, Briefcase, BookOpen, MapPin } from "lucide-react";
import { prefetchRoute } from "@/lib/prefetch";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 50 : false
  );
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    setIsScrolled(window.scrollY > 50);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/research", label: "Research", icon: BookOpen },
    { href: "/projects", label: "Projects", icon: Briefcase },
    { href: "/projects/projects-map", label: "Map", icon: MapPin },
  ] as const;

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/projects/projects-map") return pathname === "/projects/projects-map";
    if (href === "/research") {
      return (
        pathname === "/research" ||
        pathname.startsWith("/projects/msc") ||
        pathname.startsWith("/projects/thesis") ||
        pathname.startsWith("/projects/mountain-spiders")
      );
    }
    if (href === "/projects") {
      return (
        pathname === "/projects" ||
        pathname.startsWith("/projects/articles/")
      );
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Top Header Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,padding,box-shadow,border-color] duration-300 ${
          isScrolled ? "nav-glass py-4 shadow-sm" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-[1360px] mx-auto flex items-center justify-between px-6 md:px-10">
          <Link
            to="/"
            className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-primary hover:opacity-70 transition-opacity duration-300"
          >
            AM
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onMouseEnter={() => prefetchRoute(link.href)}
                onTouchStart={() => prefetchRoute(link.href)}
                onFocus={() => prefetchRoute(link.href)}
                className={`link-underline text-sm font-medium tracking-wide transition-colors duration-300 ${
                  isLinkActive(link.href)
                    ? "text-primary font-semibold"
                    : "text-foreground/70 hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://www.linkedin.com/in/andiswa-masuku"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors duration-300 ml-2"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} strokeWidth={1.5} />
            </a>
          </div>

          {/* Mobile Top-Right Actions */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="https://www.linkedin.com/in/andiswa-masuku"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-foreground/70 hover:text-primary transition-colors"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </nav>

      {/* Bottom Floating Pill Navigation Dock (Mobile Reachability) */}
      <div className="md:hidden fixed bottom-5 inset-x-0 mx-auto w-fit z-50 pointer-events-auto px-4">
        <nav
          className="flex items-center gap-1 p-1.5 bg-white/95 dark:bg-card/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 shadow-2xl shadow-black/20 rounded-full"
          aria-label="Mobile Navigation Dock"
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                to={link.href}
                onMouseEnter={() => prefetchRoute(link.href)}
                onTouchStart={() => prefetchRoute(link.href)}
                onFocus={() => prefetchRoute(link.href)}
                className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs transition-colors duration-200 ${
                  active
                    ? "bg-slate-900 text-white font-semibold shadow-md dark:bg-white dark:text-slate-900"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white"
                }`}
              >
                <Icon size={16} strokeWidth={active ? 2.2 : 1.7} />
                <span className="text-[11px] tracking-tight">{link.label}</span>
                {active && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-600 inline-block shrink-0 ml-0.5" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
};

export default Navigation;
