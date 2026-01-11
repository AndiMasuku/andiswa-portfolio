import { motion } from "framer-motion";

const expertise = [
  "Food Security & Nutrition Research",
  "Data Analysis with R",
  "Laboratory Testing & Analysis",
  "Ecology & Conservation",
  "Scientific Communication",
  "Project Coordination",
  "Bilingual: English & IsiZulu",
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 md:py-28 px-6 md:px-12 border-t border-border/50">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-spec text-muted-foreground">About Me</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary mt-6 mb-10 leading-[1.1]">
            Researcher<br />& Scientist
          </h2>
          <div className="space-y-5 text-lg text-muted-foreground leading-relaxed max-w-lg text-justify">
            <p>
              I'm a Biological Sciences graduate with a passion for solving real-world problems through research.
            </p>
            <p>
              My Honours thesis explores whether indigenous insects can provide affordable protein to communities facing malnutrition, combining laboratory science with practical food solutions.
            </p>
            <p>
              I bring strong analytical skills (R programming, data visualisation) and hands-on experience from fieldwork across South Africa, from Limpopo conservation studies to Johannesburg ecosystem assessments.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:pt-20"
        >
          <span className="label-spec text-muted-foreground mb-6 block">What I Do</span>
          <div className="border-t border-border/50">
            {expertise.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between py-5 border-b border-border/50 group"
              >
                <span className="text-lg text-primary group-hover:translate-x-2 transition-transform duration-300">
                  {item}
                </span>
                <span className="text-xs text-muted-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
