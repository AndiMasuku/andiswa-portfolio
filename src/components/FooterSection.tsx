import { motion } from "framer-motion";
import { Linkedin, Mail, ArrowRight } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="py-20 md:py-28 px-6 md:px-12 bg-primary text-primary-foreground">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-medium uppercase tracking-widest text-primary-foreground/60">
            Let's Connect
          </span>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-6 mb-6 leading-[1.1]">
            Looking for a researcher with analytical rigour?
          </h2>

          <p className="text-primary-foreground/70 text-lg mb-10">
            I'm seeking opportunities in research, food science, environmental consulting, or data-driven roles.
          </p>

          {/* Primary CTA */}
          <a
            href="mailto:andiswa.masuku.southafrica@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-primary-foreground text-primary font-medium rounded-full hover:bg-primary-foreground/90 transition-colors group"
          >
            <Mail size={18} strokeWidth={1.5} />
            Get in Touch
            <ArrowRight size={18} strokeWidth={1.5} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <div className="text-center md:text-left">
            <p className="text-primary-foreground/80 font-medium">andiswa.masuku.southafrica@gmail.com</p>
            <p className="text-sm text-primary-foreground/50 mt-1">Johannesburg, South Africa</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/andiswa-masuku"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-primary-foreground/30 text-primary-foreground text-sm font-medium rounded-full hover:bg-primary-foreground/10 transition-colors"
            >
              <Linkedin size={16} strokeWidth={1.5} />
              LinkedIn
            </a>
            <span className="text-sm text-primary-foreground/40">© 2026</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
