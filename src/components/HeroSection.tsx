import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import andiswaPortrait from "@/assets/andiswa-hero.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col lg:block overflow-hidden bg-background">
      {/* Mobile Layout: Image Background */}
      <div className="lg:hidden absolute inset-0 z-0">
        <img
          src={andiswaPortrait}
          alt="Andiswa Masuku"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full relative z-10 flex flex-col justify-end lg:justify-center min-h-screen pb-16 lg:pb-0 pt-24 lg:pt-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">

          {/* Text Content */}
          <div className="lg:w-[55%] order-2 lg:order-1 space-y-8 mt-auto lg:mt-0">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-spec text-muted-foreground block mb-4">
                Biological Sciences Researcher
              </span>
              <h1 className="headline-primary text-primary text-balance">
                Andiswa Masuku
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4 max-w-xl"
            >
              <p className="body-text text-muted-foreground text-justify">
                My Honours research at the University of KwaZulu-Natal tested whether locally-sourced termite protein in bread can create an affordable, nutritious food source.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-2"
            >
              {["Food Security", "Nutrition Science", "Data Analysis", "Ecology", "Climate Change", "Conservation", "Sustainability"].map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 bg-secondary/80 text-foreground/80 text-sm font-medium rounded-full"
                >
                  {area}
                </span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground pt-2"
            >
              <span>Johannesburg, South Africa</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <span>BSc Honours Graduate</span>
              <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
              <a
                href="https://www.linkedin.com/in/andiswa-masuku"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#0A66C2] text-white text-xs font-semibold rounded-full hover:bg-[#004182] transition-colors shadow-sm"
              >
                <Linkedin size={14} strokeWidth={2} />
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Desktop Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block lg:w-[40%] order-1 lg:order-2"
          >
            <div className="relative rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-xl)' }}>
              <img
                src={andiswaPortrait}
                alt="Andiswa Masuku - Biological Sciences Researcher"
                className="w-full h-auto max-h-[75vh] object-cover object-top"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - desktop only */}
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
