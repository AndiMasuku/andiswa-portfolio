import { motion } from "framer-motion";

const MilaSection = () => {
    return (
        <section
            id="mila-flowers"
            className="relative min-h-screen py-24 md:py-32 overflow-hidden"
            style={{
                backgroundColor: "hsl(340, 30%, 95%)", // Soft pink
                color: "hsl(340, 30%, 20%)" // Deep rose
            }}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-100/50 via-transparent to-pink-100/30" />

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
                        <h2 className="font-display text-5xl md:text-6xl font-semibold" style={{ color: "hsl(340, 50%, 40%)" }}>
                            Mila Decorative Flowers
                        </h2>
                        <p className="caption-luxury" style={{ color: "hsl(340, 20%, 50%)" }}>
                            February 2021 — December 2021
                        </p>
                    </motion.div>

                    {/* Role */}
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="headline-secondary mb-8"
                        style={{ color: "hsl(340, 30%, 25%)" }}
                    >
                        Florist & Social Media Manager
                    </motion.h3>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="body-text space-y-6 max-w-2xl text-justify"
                        style={{
                            color: "hsl(340, 25%, 35%)",
                            lineHeight: "1.8"
                        }}
                    >
                        <p>
                            Sourced flowers from warehouses, managed supplier relationships, and controlled inventory
                            to ensure consistent quality and availability.
                        </p>
                        <p>
                            Created bespoke floral arrangements for <strong style={{ color: "hsl(340, 50%, 40%)" }}>
                                weddings and corporate events</strong>, combining creativity with client requirements.
                        </p>
                        <p>
                            Managed social media presence on <strong style={{ color: "hsl(340, 50%, 40%)" }}>
                                Instagram and TikTok</strong>, including content strategy, video editing, and photography,
                            driving brand awareness and customer engagement.
                        </p>
                    </motion.div>

                    {/* Achievement tagline */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 caption-luxury flex items-center gap-4"
                        style={{ color: "hsl(340, 40%, 50%)" }}
                    >
                        <span>CREATIVE DIRECTION</span>
                        <span className="w-12 h-px bg-current opacity-40" />
                        <span>JOHANNESBURG</span>
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
};

export default MilaSection;
