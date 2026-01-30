import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

const AfrishoreSection = () => {
    return (
        <section
            id="afrishore-bpo"
            className="relative min-h-screen py-24 md:py-32 overflow-hidden"
            style={{
                backgroundColor: "hsl(210, 35%, 15%)", // Deep navy blue
                color: "hsl(210, 20%, 95%)" // Light blue-white
            }}
        >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-teal-900/20" />

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
                        <h2 className="font-display text-5xl md:text-6xl font-semibold" style={{ color: "hsl(180, 60%, 70%)" }}>
                            Afrishore BPO
                        </h2>
                        <p className="caption-luxury" style={{ color: "hsl(210, 20%, 70%)" }}>
                            March 2023 — January 2025
                        </p>
                    </motion.div>

                    {/* Role */}
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="headline-secondary mb-8"
                        style={{ color: "hsl(210, 20%, 90%)" }}
                    >
                        Client Services & Operations Specialist
                    </motion.h3>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="body-text space-y-6 max-w-2xl text-justify"
                        style={{
                            color: "hsl(210, 20%, 80%)",
                            lineHeight: "1.8"
                        }}
                    >
                        <p>
                            Managed a high-volume desk with 50+ daily inquiries for US-based insurance clients,
                            consistently meeting strict ROI targets and Service Level Agreements (SLAs).
                        </p>
                        <p>
                            Achieved a <strong style={{ color: "hsl(180, 60%, 70%)" }}>95% customer satisfaction rate</strong> and
                            a <strong style={{ color: "hsl(180, 60%, 70%)" }}>15% increase in positive feedback scores</strong> over
                            six months through refined communication strategies.
                        </p>
                        <p>
                            Utilised proprietary CRM interfaces to log interactions, update policyholder data, and track claim
                            statuses with <strong style={{ color: "hsl(180, 60%, 70%)" }}>100% accuracy</strong>.
                        </p>
                    </motion.div>

                    {/* Achievement tagline */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="mt-12 caption-luxury flex items-center gap-4"
                        style={{ color: "hsl(45, 80%, 60%)" }}
                    >
                        <span className="flex items-center gap-2">
                            <Trophy size={18} /> EMPLOYEE OF THE YEAR 2023
                        </span>
                        <span className="w-12 h-px bg-current opacity-40" />
                        <span>BRYANSTON, SANDTON</span>
                    </motion.div>
                </div>
            </div>

            {/* Bottom gradient fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </section>
    );
};

export default AfrishoreSection;
