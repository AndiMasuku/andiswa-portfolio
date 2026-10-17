import { useState } from "react";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { ArrowRight, Award } from "lucide-react";

interface TimelineItem {
    id: string;
    title: string;
    role: string;
    year: string;
    highlight: string;
    description: string;
}

const workData: TimelineItem[] = [
    {
        id: "01",
        title: "Afrishore BPO",
        role: "Client Services & Operations Specialist",
        year: "Aug 2023 - Jan 2025",
        highlight: "Employee of the Year 2023",
        description: "Managed 50+ daily client inquiries for US insurance clients, achieving 95% satisfaction rate and 15% increase in feedback scores. Trained new team members.",
    },
    {
        id: "02",
        title: "Procter & Gamble",
        role: "Analytics Intern",
        year: "Jun 2022 - Aug 2022",
        highlight: "Presented to Regional Head",
        description: "Analysed market trends for Sub-Saharan Africa baby care products. Created data visualisations in Excel and presented findings directly to Regional Head.",
    },
    {
        id: "03",
        title: "Mila Decorative Flowers",
        role: "Florist & Social Media",
        year: "Jan 2021 - Dec 2021",
        highlight: "Brand growth",
        description: "Managed inventory, created floral arrangements, grew social media presence through content creation.",
    },
];

const WorkSection = () => {
    const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

    return (
        <section id="work" className="py-10 md:py-12 bg-background border-b border-border/40">
            <div className="max-w-[1360px] mx-auto px-6 md:px-10">
                {/* Editorial Section Header */}
                <div className="flex items-baseline justify-between mb-6">
                    <div className="flex items-baseline gap-3">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] text-primary font-semibold tracking-tight">
                            Work Experience
                        </h2>
                        <span className="hidden sm:inline-block text-xs text-muted-foreground">
                            Corporate & Operational Roles
                        </span>
                    </div>
                </div>

                <div className="relative">
                    <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-5 overflow-x-auto md:overflow-visible snap-x md:snap-none scrollbar-hide pb-2">
                        {workData.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.4, delay: index * 0.06 }}
                                onClick={() => setSelectedItem(item)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setSelectedItem(item);
                                    }
                                }}
                                className="w-[285px] sm:w-[310px] md:w-auto shrink-0 md:shrink snap-start group p-5 sm:p-6 bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 hover:border-emerald-600/35 rounded-2xl cursor-pointer transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.03),0_6px_16px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_28px_-6px_rgba(0,0,0,0.07)] hover:-translate-y-0.5 flex flex-col justify-between text-left"
                            >
                                <div>
                                    <div className="mb-3">
                                        <span className="inline-block text-[11px] font-medium px-2.5 py-1 bg-slate-100 dark:bg-secondary text-slate-700 dark:text-foreground border border-slate-200/60 dark:border-border rounded-full">
                                            {item.year}
                                        </span>
                                    </div>

                                    <h3 className="font-display text-[21px] sm:text-[22px] font-semibold text-slate-900 dark:text-foreground leading-tight group-hover:text-emerald-700 transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mt-1 mb-3">
                                        {item.role}
                                    </p>
                                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-muted-foreground leading-relaxed mb-4">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="pt-3.5 border-t border-slate-100 dark:border-border/50 flex items-center justify-between gap-2">
                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/8 text-emerald-800 dark:text-emerald-300 border border-emerald-500/15 text-[11px] font-medium truncate">
                                        <Award size={12} className="text-emerald-600 shrink-0" />
                                        <span className="truncate">{item.highlight}</span>
                                    </span>
                                    <span className="text-xs text-emerald-700 font-medium flex items-center gap-1 shrink-0">
                                        <span>Details</span>
                                        <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right-edge soft gradient fade to indicate scrollable content on mobile */}
                    <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent z-10 md:hidden" />
                </div>
            </div>

            <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                <DialogContent className="max-w-md p-6 md:p-8 bg-white dark:bg-card border border-slate-200/80 rounded-2xl">
                    {selectedItem && (
                        <>
                            <DialogHeader className="text-left">
                                <span className="text-xs text-slate-500 mb-1">{selectedItem.year}</span>
                                <DialogTitle className="font-display text-2xl text-primary font-semibold">
                                    {selectedItem.title}
                                </DialogTitle>
                                <DialogDescription className="text-slate-700 font-medium">
                                    {selectedItem.role}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 space-y-4 text-left">
                                <p className="text-muted-foreground text-sm leading-relaxed">{selectedItem.description}</p>
                                <div className="pt-3 border-t border-border/50 flex items-end justify-between gap-3">
                                    <div>
                                        <span className="text-xs text-muted-foreground uppercase tracking-wide">Key Outcome</span>
                                        <p className="text-primary font-medium mt-1">
                                            {selectedItem.highlight}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedItem(null)}
                                        className="md:hidden shrink-0 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold active:scale-95 transition-all"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default WorkSection;
