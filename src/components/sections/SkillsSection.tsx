import { motion } from "framer-motion";
import { BarChart3, Microscope, Bot, MessageSquare } from "lucide-react";

const skillCategories = [
    {
        title: "Data & Analysis",
        icon: <BarChart3 size={32} strokeWidth={1.5} className="mb-5 text-primary" />,
        skills: ["R Programming", "Excel Advanced", "SQL Basics", "GIS Mapping", "Statistical Modelling"],
        color: "from-blue-50 to-indigo-50",
        border: "border-blue-100",
    },
    {
        title: "Laboratory",
        icon: <Microscope size={32} strokeWidth={1.5} className="mb-5 text-primary" />,
        skills: ["Texture Analysis", "Colourimetry", "Microscopy", "Proximate Analysis", "Equipment Calibration"],
        color: "from-stone-50 to-neutral-50",
        border: "border-stone-100",
    },
    {
        title: "AI & Tech",
        icon: <Bot size={32} strokeWidth={1.5} className="mb-5 text-primary" />,
        skills: ["Prompt Engineering", "Gemini/Antigravity", "Veo 3", "Data Visualisation"],
        color: "from-violet-50 to-purple-50",
        border: "border-violet-100",
    },
    {
        title: "Communication",
        icon: <MessageSquare size={32} strokeWidth={1.5} className="mb-5 text-primary" />,
        skills: ["Scientific Writing", "Presentations", "English (Fluent)", "IsiZulu (Native)"],
        color: "from-amber-50 to-orange-50",
        border: "border-amber-100",
    },
];

const SkillsSection = () => {
    return (
        <section id="skills" className="py-20 md:py-28 px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12"
                >
                    <span className="label-spec text-muted-foreground">Capabilities</span>
                    <h2 className="font-display text-3xl md:text-4xl text-primary mt-3">What I Can Do</h2>
                </motion.div>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {skillCategories.map((category, index) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                            className={`group p-6 bg-gradient-to-br ${category.color} border ${category.border} rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}
                        >
                            {category.icon}
                            <h3 className="font-display text-lg text-primary mb-4 font-semibold">{category.title}</h3>
                            <ul className="space-y-2">
                                {category.skills.map((skill) => (
                                    <li key={skill} className="text-sm text-muted-foreground">
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
