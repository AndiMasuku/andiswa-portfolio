import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import andiswaPortrait from "@/assets/andiswa-hero.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col lg:block overflow-hidden bg-background">
      <div className="lg:hidden absolute inset-0 z-0">
        <img
          src={andiswaPortrait}
          alt="Andiswa Masuku - Biological Sciences Researcher"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full relative z-10 flex flex-col justify-end lg:justify-center min-h-screen pb-16 lg:pb-0 pt-24 lg:pt-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-20">

          <div className="lg:w-[55%] order-2 lg:order-1 space-y-8 mt-auto lg:mt-0">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="label-spec text-accent block mb-4">
                Biological Sciences Researcher
              </span>
              <h1 className="headline-primary gradient-text text-balance">
                Andiswa Masuku
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-xl"
            >
              <p className="body-text text-muted-foreground leading-relaxed">
                Bridging the gap between ecological research and sustainable development with data-driven scientific insights.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3"
            >
              {["Spatial Analysis (GIS)", "Marine Ecology", "R Programming", "Conservation Science", "Data Modelling"].map((area, index) => (
                <motion.span
                  key={area}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
                  className="skill-tag cursor-default"
                >
                  {area}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <a
                href="#contact"
                className="btn-professional group min-w-[160px]"
              >
                Get in Touch
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/andiswa-masuku"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline group min-w-[160px]"
              >
                <Linkedin size={16} strokeWidth={2} className="mr-2" />
                LinkedIn
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex items-center gap-3 text-sm text-muted-foreground pt-2"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                Available for opportunities
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Johannesburg, South Africa</span>
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
                alt="Andiswa Masuku - Professional Biological Sciences Researcher Portait"
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
