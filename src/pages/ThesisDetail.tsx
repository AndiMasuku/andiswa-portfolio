import { motion, AnimatePresence } from "framer-motion";
import { Beaker, BarChart3, Microscope, FlaskConical, CheckCircle2, Lightbulb, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, SITE_URL, toAbsoluteUrl } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import thesisImage from "@/assets/thesis-research.webp";
import breadTexture from "@/assets/bread-texture.webp";
import colourimetry from "@/assets/colourimetry.webp";
import edibleInsects from "@/assets/edible-insects.webp";

const ThesisDetail = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const title = "Insect Protein Fortification Research | Andiswa Masuku Honours Thesis";
    const description =
        "Development of nutrient-rich bread fortified with edible termite and mopane worm meals to combat malnutrition in Southern Africa.";
    const canonicalUrl = `${SITE_URL}/projects/thesis`;
    const ogImage = toAbsoluteUrl(DEFAULT_OG_IMAGE);
    const methodologies = [
        {
            icon: <Beaker size={28} strokeWidth={1.5} className="text-accent" />,
            title: "Texture Profile Analysis",
            description: "Measured fracturability and hardness of fortified bread samples to assess structural integrity.",
            image: breadTexture,
        },
        {
            icon: <FlaskConical size={28} strokeWidth={1.5} className="text-accent" />,
            title: "Colourimetry",
            description: "Analysed food quality and visual appeal through colour measurement and comparison.",
            image: colourimetry,
        },
        {
            icon: <Microscope size={28} strokeWidth={1.5} className="text-accent" />,
            title: "Crumb Structure Analysis",
            description: "Microscopic evaluation of bread crumb to assess baking quality and texture uniformity.",
        },
        {
            icon: <BarChart3 size={28} strokeWidth={1.5} className="text-accent" />,
            title: "Statistical Validation",
            description: "Used R Programming to model and validate the nutritional viability of fortified bread.",
        },
    ];

    const significancePoints = [
        {
            title: "Consumer Acceptability",
            description: "Fortified bread maintains the same texture and appearance as regular bread, meaning consumers are unlikely to notice any difference.",
            icon: <CheckCircle2 size={24} className="text-accent" />,
        },
        {
            title: "Scalable Solution",
            description: "Low-concentration fortification (5%) can be implemented in existing bakeries without equipment changes or recipe modifications.",
            icon: <CheckCircle2 size={24} className="text-accent" />,
        },
        {
            title: "Nutritional Enhancement",
            description: "Even at low concentrations, insect protein adds essential amino acids and micronutrients to a staple food item.",
            icon: <CheckCircle2 size={24} className="text-accent" />,
        },
        {
            title: "Sustainable Protein",
            description: "Insect farming requires significantly less land, water, and feed compared to traditional livestock, making it environmentally viable.",
            icon: <CheckCircle2 size={24} className="text-accent" />,
        },
    ];

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:alt" content="Insect protein fortification research" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={ogImage} />
            </Helmet>
            <Navigation />

            <section className="pt-40 pb-16 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        <div>
                            <span className="label-spec text-accent block mb-4">Honours Thesis • UKZN 2025</span>
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl gradient-text mb-6 leading-tight">
                                Insect Protein Fortification
                            </h1>
                            <p className="body-text text-muted-foreground mb-8 leading-relaxed">
                                Developed <span className="text-accent font-medium">nutrient-rich bread</span> fortified with edible termite (<span className="text-accent font-medium">Termitomyces</span>)
                                and mopane worm (<span className="text-accent font-medium">Gonimbrasia belina</span>) meals, investigating their viability as sustainable protein sources to combat malnutrition.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {["Food Development", "Nutrition Science", "R Programming", "Laboratory Analysis"].map((tag) => (
                                    <span key={tag} className="skill-tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative cursor-pointer"
                            onClick={() => setSelectedImage(thesisImage)}
                        >
                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                <img
                                    src={thesisImage}
                                    alt="Andiswa Masuku - Bread fortification research"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                    className="w-full h-auto"
                                />
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="py-8 px-6 md:px-12">
                <div className="max-w-[1000px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                        onClick={() => setSelectedImage(edibleInsects)}
                    >
                        <img
                            src={edibleInsects}
                            alt="Andiswa Masuku | Sustainable protein sources research - termites and mopane worms"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto"
                        />
                    </motion.div>
                </div>
            </section>

            <section className="py-16 px-6 md:px-12 section-gradient">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-display text-3xl md:text-4xl text-primary mb-4 flex items-center justify-center gap-3">
                            <span className="w-8 h-0.5 bg-accent"></span>
                            The Problem
                            <span className="w-8 h-0.5 bg-accent"></span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="card-professional p-8 md:p-12 text-center"
                    >
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            <span className="text-accent font-semibold">Protein-Energy Malnutrition (PEM)</span> remains a critical challenge
                            in South Africa and across the continent. Traditional protein sources are often expensive and inaccessible
                            to many communities, creating a need for innovative, affordable alternatives.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-display text-3xl md:text-4xl text-primary mb-4 flex items-center justify-center gap-3">
                            <span className="w-8 h-0.5 bg-accent"></span>
                            The Solution
                            <span className="w-8 h-0.5 bg-accent"></span>
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="card-professional p-8 md:p-12 text-center"
                    >
                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                            <span className="text-accent font-semibold">Sustainable protein enrichment</span> through indigenous edible insects.
                            This research involved the development of brown and white bread fortified with termite and mopane worm meals
                            to create an accessible, nutrient-dense staple food.
                        </p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 px-6 md:px-12 section-gradient-reverse">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-display text-3xl md:text-4xl text-primary mb-4 flex items-center justify-center gap-3">
                            <span className="w-8 h-0.5 bg-accent"></span>
                            Methodology
                            <span className="w-8 h-0.5 bg-accent"></span>
                        </h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            A systematic approach combining laboratory analysis with statistical validation
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8 mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="card-professional overflow-hidden cursor-pointer group"
                            onClick={() => setSelectedImage(breadTexture)}
                        >
                            <img
                                src={breadTexture}
                                alt="Andiswa Masuku methodology - Texture profile analysis"
                                loading="lazy"
                                decoding="async"
                                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="p-6">
                                <h3 className="font-display text-xl font-semibold text-primary mb-2">Texture Profile Analysis</h3>
                                <p className="text-sm text-muted-foreground">Measuring fracturability and hardness to assess structural integrity</p>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="card-professional overflow-hidden cursor-pointer group"
                            onClick={() => setSelectedImage(colourimetry)}
                        >
                            <img
                                src={colourimetry}
                                alt="Andiswa Masuku methodology - Colourimetry analysis"
                                loading="lazy"
                                decoding="async"
                                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="p-6">
                                <h3 className="font-display text-xl font-semibold text-primary mb-2">Colourimetry</h3>
                                <p className="text-sm text-muted-foreground">Analysing food quality and visual appeal through colour measurement</p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {methodologies.map((method, index) => (
                            <motion.div
                                key={method.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="card-professional p-6 text-center"
                            >
                                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                                    {method.icon}
                                </div>
                                <h3 className="font-display text-lg font-semibold text-primary mb-3">{method.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{method.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="font-display text-3xl md:text-4xl text-primary mb-4 flex items-center justify-center gap-3">
                            <span className="w-8 h-0.5 bg-accent"></span>
                            Key Findings
                            <span className="w-8 h-0.5 bg-accent"></span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="card-professional p-8 md:p-12 mb-12"
                    >
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-accent/10 rounded-full mb-6">
                                <span className="w-3 h-3 rounded-full bg-accent animate-pulse"></span>
                                <span className="text-accent font-semibold">Core Discovery</span>
                            </div>
                            <p className="text-xl md:text-2xl font-display text-primary leading-relaxed mb-4 text-center w-full">
                                Physical properties of brown bread showed <span className="text-accent">no significant difference</span><br />
                                between control (0%) and 5% insect-fortified samples for both species
                            </p>
                            <p className="text-muted-foreground w-full mx-auto text-center text-balance">
                                Texture, colour, and crumb structure remained statistically similar, demonstrating that fortification
                                can be achieved without compromising the bread's physical characteristics.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Lightbulb size={24} className="text-accent" />
                            <h3 className="font-display text-2xl font-semibold text-primary">Why This Matters</h3>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {significancePoints.map((point, index) => (
                            <motion.div
                                key={point.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="card-professional p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                                        {point.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-display text-lg font-semibold text-primary mb-2">{point.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="border-t border-border py-8 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto flex justify-between items-center text-sm text-muted-foreground">
                    <span>© 2026 Andiswa Masuku</span>
                    <Link to="/" className="hover:text-accent transition-colors">
                        Back to Home
                    </Link>
                </div>
            </footer>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110]"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <X size={24} />
                        </motion.button>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="relative max-w-5xl w-full h-full flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img
                                src={selectedImage}
                                alt="Full screen preview"
                                decoding="async"
                                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThesisDetail;
