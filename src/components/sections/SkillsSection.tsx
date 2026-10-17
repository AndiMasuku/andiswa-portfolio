import { BarChart3, Microscope, Bot, MessageSquare, type LucideIcon } from "lucide-react";

interface SkillCategory {
    title: string;
    subtitle: string;
    icon: LucideIcon;
    skills: string[];
}

const skillCategories: SkillCategory[] = [
    {
        title: "Data & Analysis",
        subtitle: "Quantitative & Spatial",
        icon: BarChart3,
        skills: ["R Programming", "Excel Advanced", "SQL Basics", "GIS Mapping", "Statistical Modelling"],
    },
    {
        title: "Laboratory",
        subtitle: "Empirical Biology",
        icon: Microscope,
        skills: ["Food Development", "Texture Analysis", "Colourimetry", "Microscopy", "Proximate Analysis"],
    },
    {
        title: "AI & Tech",
        subtitle: "Digital Workflows",
        icon: Bot,
        skills: ["Prompt Engineering", "Gemini/Antigravity", "Veo 3", "Data Visualisation"],
    },
    {
        title: "Communication",
        subtitle: "Research & Languages",
        icon: MessageSquare,
        skills: ["Scientific Writing", "Presentations", "English (Fluent)", "IsiZulu (Native)"],
    },
];

const SkillsSection = () => {
    return (
        <section id="skills" className="py-10 md:py-12 bg-background border-b border-border/40">
            <div className="max-w-[1360px] mx-auto px-6 md:px-10">
                {/* Editorial Section Header */}
                <div className="flex items-baseline justify-between mb-6">
                    <div className="flex items-baseline gap-3">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] text-primary font-semibold tracking-tight">
                            Core Capabilities
                        </h2>
                        <span className="hidden sm:inline-block text-xs text-muted-foreground">
                            Methods & Technical Stack
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {skillCategories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <div
                                key={category.title}
                                className="group p-5 sm:p-6 bg-white dark:bg-card rounded-2xl border border-slate-200/80 dark:border-border/70 hover:border-emerald-600/35 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 transition-[transform,box-shadow,border-color] duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Card Header with Tactile Icon Badge */}
                                    <div className="flex items-center gap-3.5 pb-4 mb-4 border-b border-slate-100 dark:border-border/50">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/15 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-emerald-600 transition-colors duration-300">
                                            <IconComponent size={19} strokeWidth={1.75} />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-[21px] font-semibold text-slate-900 dark:text-foreground leading-tight">
                                                {category.title}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-muted-foreground mt-0.5">
                                                {category.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Tactile Skill Pills */}
                                    <ul className="flex flex-wrap gap-2">
                                        {category.skills.map((skill) => (
                                            <li
                                                key={skill}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-secondary/60 border border-slate-200/70 dark:border-border/60 text-xs font-medium text-slate-700 dark:text-foreground/90 group-hover:border-slate-300/80 transition-colors"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600/80 shrink-0" />
                                                <span>{skill}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
