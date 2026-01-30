import { motion } from "framer-motion";

const ProcterGambleSection = () => {
    return (
        <section
            id="procter-gamble"
            className="relative min-h-screen py-24 md:py-32 overflow-hidden"
            style={{
                backgroundColor: "hsl(220, 50%, 98%)", // Clean white-blue
                color: "hsl(220, 40%, 20%)" // Deep blue
            }}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-transparent to-indigo-100/30" />

            {/* Content */}
            <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="max-w-3xl">
                    {/* Company name & years */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-2 mb-8"
                    >
                        <h2 className="font-display text-5xl md:text-6xl font-semibold" style={{ color: "hsl(220, 60%, 35%)" }}>
                            Procter & Gamble
                        </h2>
                        <p className="caption-luxury" style={{ color: "hsl(220, 30%, 50%)" }}>
                            August 2022 — October 2022
                        </p>
                    </motion.div>

                    {/* Role */}
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="headline-secondary mb-8"
                        style={{ color: "hsl(220, 40%, 25%)" }}
                    >
                        Analytics and Insights Intern
                    </motion.h3>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="body-text space-y-6 max-w-2xl text-justify"
                        style={{
                            color: "hsl(220, 30%, 35%)",
                            lineHeight: "1.8"
                        }}
                    >
                        <p>
                            Conducted SEO and keyword trend research to inform social media strategies, directly
                            supporting Sub-Saharan Africa regional sales for baby care products.
                        </p>
                        <p>
                            Uncovered key insights that contributed to a <strong style={{ color: "hsl(220, 60%, 35%)" }}>
                                5% improvement in sales strategies</strong> and decision-making processes.
                        </p>
                        <p>
                            Leveraged <strong style={{ color: "hsl(220, 60%, 35%)" }}>Advanced Excel</strong> to
                            analyse datasets and adapted global marketing concepts for local relevance in African markets.
                        </p>
                        <p>
                            Presented research findings and strategic recommendations directly to the Regional Head
                            for Sub-Saharan Africa in a virtual forum.
                        </p>
                    </motion.div>

                    {/* Achievement tagline */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 caption-luxury flex items-center gap-4"
                        style={{ color: "hsl(220, 50%, 45%)" }}
                    >
                        <span>DATA-DRIVEN INSIGHTS</span>
                        <span className="w-12 h-px bg-current opacity-40" />
                        <span>RIVONIA, SANDTON</span>
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
};

export default ProcterGambleSection;
