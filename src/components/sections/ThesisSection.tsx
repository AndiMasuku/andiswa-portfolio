import { motion } from "framer-motion";
import thesisImage from "@/assets/thesis-research.png";

import MarqueeTicker from "../MarqueeTicker"; // Added import for MarqueeTicker

const ThesisSection = () => {
    return (
        <section id="research" className="py-6 md:py-12 px-6 md:px-12 bg-secondary/30">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-10"
                >
                    <span className="label-spec text-muted-foreground uppercase tracking-widest">Projects and Research</span>
                </motion.div>

                <div className="max-w-4xl mx-auto mb-16">
                    {/* Main Thesis Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm flex flex-col"
                    >
                        {/* Image Top Banner */}
                        <div className="h-64 md:h-80 relative w-full overflow-hidden shrink-0">
                            <img
                                src={thesisImage}
                                alt="Bread fortification"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>

                        <div className="p-8 md:p-12 flex flex-col flex-1 relative z-10 -mt-20">
                            <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-6 text-balance text-center md:text-left drop-shadow-md">
                                Insect Protein Fortification
                            </h2>

                            <div className="bg-white/95 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-sm border border-border/50">
                                <p className="text-muted-foreground text-lg mb-8 leading-relaxed text-balance">
                                    Investigating the viability of locally-sourced termite protein to create affordable, nutritious bread, aiming to combat malnutrition in Southern Africa.
                                </p>

                                <div className="flex flex-wrap gap-2 mb-8">
                                    {["Texture Analysis", "Nutritional Modelling", "R Programming"].map((method) => (
                                        <span
                                            key={method}
                                            className="px-4 py-1.5 bg-secondary text-secondary-foreground text-sm font-medium rounded-full"
                                        >
                                            {method}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4 pt-6 border-t border-border">
                                    <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center text-muted-foreground">
                                        <span className="font-display text-sm font-semibold">UKZN</span>
                                    </div>
                                    <div>
                                        <p className="text-foreground font-medium">Honours Thesis</p>
                                        <p className="text-muted-foreground text-sm">2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Other Research Ticker */}
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
