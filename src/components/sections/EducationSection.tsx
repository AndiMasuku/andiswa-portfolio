import { motion } from "framer-motion";
import { Award } from "lucide-react";
import ukznLabImage from "@/assets/ukzn-lab.png";
import witsFieldworkImage from "@/assets/wits-fieldwork.png";

const EducationSection = () => {
    return (
        <section id="education" className="py-20 md:py-28 px-6 md:px-12">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12"
                >
                    <span className="label-spec text-muted-foreground">Education</span>
                    <h2 className="font-display text-3xl md:text-4xl text-primary mt-3">My Education</h2>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* UKZN Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm flex flex-col"
                    >
                        {/* Image Top Banner */}
                        <div className="h-48 relative w-full overflow-hidden shrink-0">
                            <img
                                src={ukznLabImage}
                                alt="UKZN Laboratory"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full uppercase tracking-wider">
                                    Honours 2025
                                </span>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-display text-2xl text-primary mb-2">
                                    University of KwaZulu-Natal
                                </h3>
                                <p className="text-muted-foreground font-medium">BSc Honours in Biological Sciences</p>
                                <p className="text-sm text-accent italic mt-2">"Where curiosity meets sustainable solutions"</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {["Food Science", "Nutrition", "Lab Analysis", "R Programming"].map((skill) => (
                                    <span key={skill} className="text-xs text-foreground/80 bg-secondary px-2.5 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Wits Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm flex flex-col"
                    >
                        {/* Image Top Banner */}
                        <div className="h-48 relative w-full overflow-hidden shrink-0">
                            <img
                                src={witsFieldworkImage}
                                alt="Wits Fieldwork"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-8 flex flex-col flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <span className="inline-block px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full uppercase tracking-wider">
                                    BSc 2017-2020
                                </span>
                                <Award size={20} className="text-primary/60" />
                            </div>

                            <div className="mb-6">
                                <h3 className="font-display text-2xl text-primary mb-2">
                                    University of the Witwatersrand
                                </h3>
                                <p className="text-muted-foreground font-medium mb-1">BSc in Biological Sciences</p>
                                <p className="text-muted-foreground/70 text-sm">Certificate of Merit: Animal Behaviour</p>
                                <p className="text-sm text-accent italic mt-2">"From the lab to the wild – where science meets adventure"</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto">
                                {["Fieldwork", "GIS Mapping", "Forensic Genetics", "Ecology"].map((skill) => (
                                    <span key={skill} className="text-xs text-foreground/80 bg-secondary px-2.5 py-1 rounded-full">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
