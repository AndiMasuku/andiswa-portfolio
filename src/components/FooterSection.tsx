import { motion } from "framer-motion";
import { Linkedin, Mail, ArrowRight } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="py-20 md:py-28 px-6 md:px-12 bg-gradient-to-br from-primary via-primary to-[hsl(168,35%,25%)] text-primary-foreground">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-xs font-medium uppercase tracking-widest text-primary-foreground/80 mb-6">
            Let's Connect
          </span>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary-foreground mt-2 mb-6 leading-[1.1]">
            Ready to make an <span className="text-[hsl(168,65%,65%)]">impact</span> together?
          </h2>

          <p className="text-primary-foreground/70 text-lg mb-10">
            I'm seeking opportunities in research, food science, environmental consulting, or data-driven roles.
          </p>

          {/* Primary CTA */}
          <a
            href="mailto:andiswa.masuku.southafrica@gmail.com"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[hsl(168,65%,38%)] text-white font-medium rounded-full hover:bg-[hsl(168,65%,32%)] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
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
          className="mt-20 pt-12 border-t border-primary-foreground/10"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-primary-foreground/40 font-semibold mb-2">Navigation</span>
              <a href="#research" className="text-sm text-primary-foreground/70 hover:text-[hsl(168,65%,65%)] transition-colors">Research</a>
              <a href="#education" className="text-sm text-primary-foreground/70 hover:text-[hsl(168,65%,65%)] transition-colors">Education</a>
              <a href="#skills" className="text-sm text-primary-foreground/70 hover:text-[hsl(168,65%,65%)] transition-colors">Skills</a>
              <a href="#work" className="text-sm text-primary-foreground/70 hover:text-[hsl(168,65%,65%)] transition-colors">Experience</a>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs uppercase tracking-widest text-primary-foreground/40 font-semibold mb-2">Social</span>
              <a href="https://www.linkedin.com/in/andiswa-masuku" target="_blank" rel="noopener noreferrer" className="text-sm text-primary-foreground/70 hover:text-[hsl(168,65%,65%)] transition-colors">LinkedIn</a>
            </div>
            <div className="md:col-span-2 flex flex-col md:items-end gap-3">
              <span className="text-xs uppercase tracking-widest text-primary-foreground/40 font-semibold mb-2">Contact</span>
              <p className="text-sm text-primary-foreground/70">Johannesburg, South Africa</p>
              <a href="mailto:andiswa.masuku.southafrica@gmail.com" className="text-sm text-primary-foreground/70 hover:text-[hsl(168,65%,65%)] transition-colors">andiswa.masuku.southafrica@gmail.com</a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-primary-foreground/5">
            <div className="text-center md:text-left">
              <p className="text-sm text-primary-foreground/40">© {new Date().getFullYear()} Andiswa Masuku. All rights reserved.</p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/andiswa-masuku"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 border border-primary-foreground/30 text-primary-foreground text-sm font-medium rounded-full hover:bg-primary-foreground/10 transition-all hover:scale-105"
              >
                <Linkedin size={20} strokeWidth={1.5} />
                LinkedIn
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default FooterSection;
