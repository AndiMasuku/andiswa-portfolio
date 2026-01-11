import { useState } from "react";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

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
        year: "2023-2025",
        highlight: "Employee of the Year 2023",
        description: "Managed 50+ daily client inquiries for US insurance clients, achieving 95% satisfaction rate and 15% increase in feedback scores. Trained new team members.",
    },
    {
        id: "02",
        title: "Procter & Gamble",
        role: "Analytics Intern",
        year: "2022",
        highlight: "Presented to Regional Head",
        description: "Analysed market trends for Sub-Saharan Africa baby care products. Created data visualisations in Excel and presented findings directly to Regional Head.",
    },
    {
        id: "03",
        title: "Mila Decorative Flowers",
        role: "Florist & Social Media",
        year: "2021",
        highlight: "Brand growth",
        description: "Managed inventory, created floral arrangements, grew social media presence through content creation.",
    },
];

const WorkSection = () => {
    const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

    return (
        <section id="work" className="py-20 md:py-28 px-6 md:px-12 bg-secondary/30">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12"
                >
                    <span className="label-spec text-muted-foreground">Work Experience</span>
                    <h2 className="font-display text-3xl md:text-4xl text-primary mt-3">Building Character</h2>
                    <p className="text-muted-foreground mt-3 max-w-lg">
                        Roles that built discipline, communication skills, and real-world problem solving.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {workData.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            onClick={() => setSelectedItem(item)}
                            className="group p-6 bg-background border border-border/50 rounded-2xl cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/20"
                        >
                            <div className="flex items-center justify-between mb-5">
                                <span className="text-xs text-muted-foreground font-medium">{item.year}</span>
                                <span className="text-xs text-muted-foreground/50">{item.id}</span>
                            </div>

                            <h3 className="font-display text-xl text-primary mb-1 group-hover:text-primary/80 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-5">{item.role}</p>

                            <div className="pt-4 border-t border-border/50">
                                <span className="text-sm font-medium text-primary/80">{item.highlight}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Detail Modal */}
            <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
                <DialogContent className="max-w-md p-8 bg-background border-border/50 rounded-2xl">
                    {selectedItem && (
                        <>
                            <DialogHeader>
                                <span className="label-spec text-muted-foreground mb-2">{selectedItem.year}</span>
                                <DialogTitle className="font-display text-2xl text-primary">
                                    {selectedItem.title}
                                </DialogTitle>
                                <DialogDescription className="text-primary/70 font-medium">
                                    {selectedItem.role}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="mt-4 space-y-4">
                                <p className="text-muted-foreground leading-relaxed text-justify">{selectedItem.description}</p>
                                <div className="pt-4 border-t border-border/50">
                                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Key Outcome</span>
                                    <p className="text-primary font-medium mt-1">{selectedItem.highlight}</p>
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
