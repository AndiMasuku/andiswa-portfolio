import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, Linkedin } from "lucide-react";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { motion } from "framer-motion";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const navLinks = [
    { href: "/projects", label: "Projects", isRoute: true },
    { href: "#research", label: "Research" },
    { href: "#education", label: "Education" },
    { href: "#skills", label: "Skills" },
    { href: "#work", label: "Experience" },
    { href: "#contact", label: "Contact" },
  ];

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
        <a
          href="#"
          className="font-display text-2xl md:text-3xl font-semibold tracking-tight text-primary hover:opacity-70 transition-opacity duration-300"
        >
          AM
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            link.isRoute ? (
              <Link
                key={link.href}
                to={link.href}
                className="link-underline text-sm font-medium text-foreground/70 hover:text-accent transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </Link>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="link-underline text-sm font-medium text-foreground/70 hover:text-accent transition-colors duration-300 tracking-wide"
              >
                {link.label}
              </a>
            )
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

        {/* Mobile Navigation */}
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
              className="w-full sm:w-[400px] border-l border-border/50 bg-background p-8"
            >
              <VisuallyHidden.Root>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>Navigate to different sections</SheetDescription>
              </VisuallyHidden.Root>

              <div className="flex flex-col h-full pt-8">
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link, index) =>
                    link.isRoute ? (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                      >
                        <Link
                          to={link.href}
                          onClick={handleLinkClick}
                          className="font-display text-3xl text-primary hover:opacity-70 transition-opacity"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={handleLinkClick}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="font-display text-3xl text-primary hover:opacity-70 transition-opacity"
                      >
                        {link.label}
                      </motion.a>
                    )
                  )}
                </nav>

                <div className="mt-auto pt-12 border-t border-border/50">
                  <a
                    href="https://www.linkedin.com/in/andiswa-masuku"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin size={20} strokeWidth={1.5} />
                    <span className="text-sm font-medium tracking-wide">LinkedIn</span>
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
