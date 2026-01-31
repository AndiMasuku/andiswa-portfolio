import { motion } from "framer-motion";
import { BarChart3, Microscope, Bot, MessageSquare } from "lucide-react";

const skillCategories = [
    {
        title: "Data & Analysis",
        icon: <BarChart3 size={32} strokeWidth={1.5} className="mb-5 text-accent" />,
        skills: ["R Programming", "Excel Advanced", "SQL Basics", "GIS Mapping", "Statistical Modelling"],
    },
    {
        title: "Laboratory",
        icon: <Microscope size={32} strokeWidth={1.5} className="mb-5 text-accent" />,
        skills: ["Texture Analysis", "Colourimetry", "Microscopy", "Proximate Analysis", "Equipment Calibration"],
    },
    {
        title: "AI & Tech",
        icon: <Bot size={32} strokeWidth={1.5} className="mb-5 text-accent" />,
        skills: ["Prompt Engineering", "Gemini/Antigravity", "Veo 3", "Data Visualisation"],
    },
    {
        title: "Communication",
        icon: <MessageSquare size={32} strokeWidth={1.5} className="mb-5 text-accent" />,
        skills: ["Scientific Writing", "Presentations", "English (Fluent)", "IsiZulu (Native)"],
    },
];

const SkillsSection = () => {
    return (
        <section id="skills" className="py-20 md:py-28 px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12 text-center"
                >
                    <span className="label-spec text-muted-foreground">Capabilities</span>
                    <h2 className="font-display text-3xl md:text-4xl text-primary mt-3">What I Can Do</h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className="card-professional p-6"
                        >
                            {category.icon}
                            <h3 className="font-display text-lg text-primary mb-4 font-semibold">{category.title}</h3>
                            <ul className="space-y-2">
                                {category.skills.map((skill) => (
                                    <li key={skill} className="text-sm text-muted-foreground flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
