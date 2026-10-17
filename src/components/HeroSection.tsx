import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import andiswaPortrait from "@/assets/andiswa-hero.webp";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] lg:min-h-screen flex flex-col lg:block overflow-hidden bg-background">
      <div className="lg:hidden absolute inset-0 z-0">
        <img
          src={andiswaPortrait}
          alt="Andiswa Masuku - Biological Sciences Researcher"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full relative z-10 flex flex-col justify-end lg:justify-center min-h-[90vh] lg:min-h-screen pb-12 lg:pb-0 pt-20 lg:pt-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">

          <div className="lg:w-[55%] order-2 lg:order-1 space-y-6 mt-auto lg:mt-0">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="headline-primary gradient-text text-balance">
                Andiswa Masuku
              </h1>
              <p className="font-display text-xl md:text-2xl text-accent font-semibold mt-2">
                MSc Biological Sciences
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2.5"
            >
              {[
                "Climate & Biodiversity",
                "Spatial Telemetry (GIS)",
                "Sustainable Food Systems",
              ].map((domain, index) => (
                <motion.span
                  key={domain}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                  className="skill-tag cursor-default"
                >
                  {domain}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="https://www.linkedin.com/in/andiswa-masuku"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Andiswa Masuku on LinkedIn"
                className="btn-outline group min-w-[150px]"
              >
                <Linkedin size={16} strokeWidth={2} className="mr-2" />
                LinkedIn
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block lg:w-[40%] order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-xl)' }}>
              <img
                src={andiswaPortrait}
                alt="Andiswa Masuku - Professional Biological Sciences Researcher Portrait"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-auto max-h-[75vh] object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-muted-foreground/50 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
