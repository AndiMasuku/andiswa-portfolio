import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import ukznLabImage from "@/assets/ukzn-lab.webp";
import witsFieldworkImage from "@/assets/wits-fieldwork.webp";

const EducationSection = () => {
    return (
        <section id="education" className="py-16 md:py-24 px-6 md:px-12 section-gradient">
            <div className="max-w-[1400px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-10 text-center"
                >
                    <span className="label-spec text-muted-foreground">Education</span>
                    <h2 className="font-display text-3xl md:text-4xl text-primary mt-3">My Education</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* UKZN Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden rounded-2xl bg-white border border-border/50 shadow-lg hover:shadow-2xl hover:border-accent/30 transition-all duration-500"
                    >
                        {/* Extremely Prominent Hero Image */}
                        <div className="h-96 md:h-[450px] relative w-full overflow-hidden">
                            <img
                                src={ukznLabImage}
                                alt="Andiswa Masuku - UKZN Laboratory and Biological Sciences Education"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Floating badge on image */}
                            <div className="absolute top-6 left-6">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                                    <GraduationCap size={14} />
                                    Honours 2025
                                </span>
                            </div>

                            {/* Title overlay on image */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                                <h3 className="font-display text-3xl md:text-4xl text-white mb-2 drop-shadow-lg">
                                    University of KwaZulu-Natal
                                </h3>
                                <p className="text-white/90 text-xl font-medium">BSc Honours in Biological Sciences</p>
                            </div>
                        </div>

                        {/* Content below image */}
                        <div className="p-8 md:p-10">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {["Food Science", "Nutrition", "Lab Analysis", "R Programming"].map((skill) => (
                                    <span key={skill} className="skill-tag text-xs">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Accent glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl ring-2 ring-accent/0 group-hover:ring-accent/20 transition-all duration-500 pointer-events-none" />
                    </motion.div>

                    {/* Wits Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden rounded-2xl bg-white border border-border/50 shadow-lg hover:shadow-2xl hover:border-accent/30 transition-all duration-500"
                    >
                        {/* Extremely Prominent Hero Image */}
                        <div className="h-96 md:h-[450px] relative w-full overflow-hidden">
                            <img
                                src={witsFieldworkImage}
                                alt="Andiswa Masuku - Wits Fieldwork and Ecology Education"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            />
                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                            {/* Floating badge on image */}
                            <div className="absolute top-6 left-6 flex items-center gap-2">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-white text-xs font-bold rounded-full uppercase tracking-wider shadow-lg">
                                    <GraduationCap size={14} />
                                    BSc 2017-2020
                                </span>
                                <span className="inline-flex items-center gap-1 px-3 py-2 bg-white/90 backdrop-blur-sm text-accent text-xs font-bold rounded-full shadow-lg">
                                    <Award size={14} />
                                    Merit
                                </span>
                            </div>

                            {/* Title overlay on image */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                                <h3 className="font-display text-3xl md:text-4xl text-white mb-2 drop-shadow-lg">
                                    University of the Witwatersrand
                                </h3>
                                <p className="text-white/90 text-xl font-medium">BSc in Biological Sciences</p>
                                <p className="text-white/70 text-base mt-2">Certificate of Merit: Animal Behaviour</p>
                            </div>
                        </div>

                        {/* Content below image */}
                        <div className="p-8 md:p-10">
                            <div className="flex flex-wrap gap-2 justify-center">
                                {["Fieldwork", "GIS Mapping", "Forensic Genetics", "Ecology"].map((skill) => (
                                    <span key={skill} className="skill-tag text-xs">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Accent glow effect on hover */}
                        <div className="absolute inset-0 rounded-2xl ring-2 ring-accent/0 group-hover:ring-accent/20 transition-all duration-500 pointer-events-none" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default EducationSection;

