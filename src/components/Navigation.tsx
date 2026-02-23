import { useState, useEffect, useLayoutEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Linkedin } from "lucide-react";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/projects/thesis", label: "Research" },
    { href: "/projects/projects-map", label: "Projects Map" },
  ] as const;



  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
        ? "nav-glass py-4 shadow-sm"
        : "bg-transparent py-6"
        }`}
    >
      <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 md:px-12">
        <Link
          to="/"
          className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-primary hover:opacity-70 transition-opacity duration-300"
        >
          AM
        </Link>

        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              onClick={() => setIsOpen(false)}
              className="link-underline text-sm font-medium text-foreground/70 hover:text-accent transition-colors duration-300 tracking-wide"
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

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              className="p-2 -mr-2 text-primary hover:opacity-70 transition-opacity"
              aria-label="Open menu"
            >
              <Menu size={24} strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-[400px] border-l border-border/50 bg-background p-8 flex flex-col"
            >
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                <span className="font-display text-xl font-semibold uppercase tracking-widest text-muted-foreground/50">Menu</span>
              </div>

              <div className="flex flex-col h-full pt-8">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                    >
                      <Link
                        to={link.href}
                        onClick={() => setIsOpen(false)}
                        className="font-display text-3xl text-primary hover:text-accent transition-colors py-2 block"
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="mt-auto py-8 border-t border-border/50">
                  <a
                    href="https://www.linkedin.com/in/andiswa-masuku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors p-3 -ml-3"
                  >
                    <Linkedin size={24} strokeWidth={1.5} />
                    <span className="text-lg font-medium tracking-wide">LinkedIn</span>
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
