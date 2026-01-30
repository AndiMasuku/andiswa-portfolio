import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import thesisImage from "@/assets/thesis-research.png";
import marineConservation from "@/assets/marine-conservation.png";
import MarqueeTicker from "../MarqueeTicker";

const ThesisSection = () => {
    return (
        <section id="research" className="py-20 md:py-32 px-6 md:px-12 bg-secondary/30 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <span className="label-spec text-accent uppercase tracking-widest mb-4 block">Academic Work</span>
                    <h2 className="font-display text-4xl md:text-5xl text-primary font-semibold">Projects & Research</h2>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 items-stretch mb-24">
                    {/* Academic Projects Card (Left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm flex flex-col"
                    >
                        <div className="h-64 relative w-full overflow-hidden shrink-0">
                            <img
                                src={marineConservation}
                                alt="Academic Projects"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-30" />
                        </div>

                        <div className="p-8 md:p-10 flex flex-col flex-1 relative z-40 -mt-20">
                            <h3 className="font-display text-3xl text-white leading-tight mb-6 drop-shadow-md">
                                Academic Projects
                            </h3>

                            <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-sm border border-border/50 flex-1 flex flex-col">
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    Exploring diverse fields from mapping natural resources in Limpopo to assessing ecological health in Johannesburg streams.
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {["Fieldwork", "GIS Analysis", "Community Research", "Water Quality"].map((field) => (
                                        <span key={field} className="skill-tag">
                                            {field}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto pt-6 border-t border-border flex justify-end">
                                    <Link
                                        to="/projects"
                                        className="btn-professional group flex items-center gap-2 whitespace-nowrap bg-accent text-white px-6 py-3 rounded-xl hover:bg-accent/90 transition-all font-medium shadow-sm shadow-accent/20"
                                    >
                                        Browse All Projects
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Honours Research Card (Right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm flex flex-col"
                    >
                        <div className="h-64 relative w-full overflow-hidden shrink-0">
                            <img
                                src={thesisImage}
                                alt="Honours Research"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>

                        <div className="p-8 md:p-10 flex flex-col flex-1 relative z-10 -mt-20">
                            <h3 className="font-display text-3xl text-white leading-tight mb-6 drop-shadow-md">
                                Honours Research
                            </h3>

                            <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-sm border border-border/50 flex-1 flex flex-col">
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                                    Investigating the viability of locally-sourced termite protein to create affordable, nutritious bread for Southern Africa.
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {["Nutrition Science", "R Programming", "Lab Analysis"].map((method) => (
                                        <span key={method} className="skill-tag">
                                            {method}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-auto pt-6 border-t border-border flex justify-end">
                                    <Link
                                        to="/projects/thesis"
                                        className="btn-professional group flex items-center gap-2 whitespace-nowrap bg-accent text-white px-6 py-3 rounded-xl hover:bg-accent/90 transition-all shadow-sm shadow-accent/20 font-medium"
                                    >
                                        View Research Tour
                                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <MarqueeTicker items={[
                        "Marine Bio Research",
                        "Impact of Fences on Wildlife",
                        "Hypoxia in High Altitude Populations",
                        "Sustainable Ecosystems"
                    ]} />
                </motion.div>
            </div>
        </section>
    );
};

export default ThesisSection;
