import { motion } from "framer-motion";
import { Award } from "lucide-react";
import ukznLabImage from "@/assets/ukzn-lab.png";
import witsFieldworkImage from "@/assets/wits-fieldwork.png";

const EducationSection = () => {
    return (
        <section id="education" className="py-20 md:py-28 px-6 md:px-12 section-gradient">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-12 text-center"
                >
                    <span className="label-spec text-muted-foreground">Education</span>
                    <h2 className="font-display text-3xl md:text-4xl text-primary mt-3">My Education</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                    {/* UKZN Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm flex flex-col"
                    >
                        {/* Image Top Banner */}
                        <div className="h-56 relative w-full overflow-hidden shrink-0">
                            <img
                                src={ukznLabImage}
                                alt="Andiswa Masuku - UKZN Laboratory and Biological Sciences Education"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-10 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wider">
                                    Honours 2025
                                </span>
                                <div className="w-5 h-5" /> {/* Spacer for balance */}
                            </div>

                            <div className="mb-6 flex-1">
                                <h3 className="font-display text-2xl md:text-3xl text-primary mb-2">
                                    University of KwaZulu-Natal
                                </h3>
                                <p className="text-muted-foreground text-lg font-medium mb-1">BSc Honours in Biological Sciences</p>
                                <p className="text-muted-foreground/80 text-sm h-5 invisible">Spacer</p> {/* Alignment spacer */}
                                <p className="text-sm text-accent italic mt-3">"Where curiosity meets sustainable solutions"</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border/10">
                                {["Food Science", "Nutrition", "Lab Analysis", "R Programming"].map((skill) => (
                                    <span key={skill} className="skill-tag text-xs">
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
                        <div className="h-56 relative w-full overflow-hidden shrink-0">
                            <img
                                src={witsFieldworkImage}
                                alt="Andiswa Masuku - Wits Fieldwork and Ecology Education"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-10 flex flex-col flex-1 border-t border-border/50">
                            <div className="flex items-center justify-between mb-4">
                                <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full uppercase tracking-wider">
                                    BSc 2017-2020
                                </span>
                                <Award size={20} className="text-accent" />
                            </div>

                            <div className="mb-6 flex-1">
                                <h3 className="font-display text-2xl md:text-3xl text-primary mb-2">
                                    University of the Witwatersrand
                                </h3>
                                <p className="text-muted-foreground text-lg font-medium mb-1">BSc in Biological Sciences</p>
                                <p className="text-muted-foreground/80 text-sm">Certificate of Merit: Animal Behaviour</p>
                                <p className="text-sm text-accent italic mt-3">"From the lab to the wild – where science meets adventure"</p>
                            </div>

                            <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-border/10">
                                {["Fieldwork", "GIS Mapping", "Forensic Genetics", "Ecology"].map((skill) => (
                                    <span key={skill} className="skill-tag text-xs">
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
