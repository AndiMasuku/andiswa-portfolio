import { motion } from "framer-motion";
import { Beaker, BarChart3, Microscope, FlaskConical, CheckCircle2, Lightbulb, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, SITE_URL, toAbsoluteUrl } from "@/lib/seo";
import { prefetchRoute } from "@/lib/prefetch";
import Navigation from "@/components/Navigation";
import ImageLightbox from "@/components/ImageLightbox";
import thesisImage from "@/assets/thesis-research.webp";
import breadTexture from "@/assets/bread-texture.webp";
import colourimetry from "@/assets/colourimetry.webp";
import edibleInsects from "@/assets/edible-insects.webp";

const ThesisDetail = () => {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
    const title = "Insect Protein Fortification Research | Andiswa Masuku Honours Thesis";
    const description =
        "Development of nutrient-rich bread fortified with edible termite and mopane worm meals to combat malnutrition in Southern Africa.";
    const canonicalUrl = `${SITE_URL}/projects/thesis`;
    const ogImage = toAbsoluteUrl(DEFAULT_OG_IMAGE);
    const methodologies = [
        {
            icon: <Beaker size={24} strokeWidth={1.5} className="text-accent" />,
            title: "Texture Profile Analysis",
            description: "Measured fracturability and hardness of fortified bread samples to assess structural integrity.",
            image: breadTexture,
        },
        {
            icon: <FlaskConical size={24} strokeWidth={1.5} className="text-accent" />,
            title: "Colourimetry",
            description: "Analysed food quality and visual appeal through colour measurement and comparison.",
            image: colourimetry,
        },
        {
            icon: <Microscope size={24} strokeWidth={1.5} className="text-accent" />,
            title: "Crumb Structure Analysis",
            description: "Microscopic evaluation of bread crumb to assess baking quality and texture uniformity.",
        },
        {
            icon: <BarChart3 size={24} strokeWidth={1.5} className="text-accent" />,
            title: "Statistical Validation",
            description: "Used R Programming to model and validate the nutritional viability of fortified bread.",
        },
    ];

    const significancePoints = [
        {
            title: "Consumer Acceptability",
            description: "Fortified bread maintains the same texture and appearance as regular bread, meaning consumers are unlikely to notice any difference.",
            icon: <CheckCircle2 size={22} className="text-accent" />,
        },
        {
            title: "Scalable Solution",
            description: "Low-concentration fortification (5%) can be implemented in existing bakeries without equipment changes or recipe modifications.",
            icon: <CheckCircle2 size={22} className="text-accent" />,
        },
        {
            title: "Nutritional Enhancement",
            description: "Even at low concentrations, insect protein adds essential amino acids and micronutrients to a staple food item.",
            icon: <CheckCircle2 size={22} className="text-accent" />,
        },
        {
            title: "Sustainable Protein",
            description: "Insect farming requires significantly less land, water, and feed compared to traditional livestock, making it environmentally viable.",
            icon: <CheckCircle2 size={22} className="text-accent" />,
        },
    ];

    const scholarlyArticleSchema = {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        "headline": "Insect Protein Fortification: Development of Nutrient-Rich Bread",
        "description": description,
        "author": {
            "@type": "Person",
            "name": "Andiswa Masuku",
            "url": SITE_URL
        },
        "publisher": {
            "@type": "Organization",
            "name": "University of KwaZulu-Natal"
        },
        "url": canonicalUrl,
        "image": ogImage,
        "about": ["Sustainable Food Security", "Entomophagy", "Nutritional Biochemistry"]
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": SITE_URL
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Projects",
                "item": `${SITE_URL}/projects`
            },
            {
                "@type": "ListItem",
                "position": 3,
                "name": "Honours Thesis",
                "item": canonicalUrl
            }
        ]
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
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
                <script type="application/ld+json">
                    {JSON.stringify(scholarlyArticleSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            </Helmet>
            <Navigation />

            {/* Top Hero & Breadcrumb Wayfinding */}
            <section className="pt-32 md:pt-40 pb-12 px-6 md:px-10">
                <div className="max-w-[1360px] mx-auto">
                    {/* Breadcrumb Wayfinding */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45 }}
                        className="flex flex-wrap items-center gap-2 mb-6"
                    >
                        <Link
                            to="/research"
                            onMouseEnter={() => prefetchRoute("/research")}
                            onTouchStart={() => prefetchRoute("/research")}
                            onFocus={() => prefetchRoute("/research")}
                            className="text-xs uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors font-medium"
                        >
                            Research
                        </Link>
                        <span className="text-muted-foreground/40 text-xs">•</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                            Honours Thesis • UKZN 2025
                        </span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center"
                    >
                        <div className="lg:col-span-6">
                            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-primary mb-6 leading-[1.08] tracking-tight">
                                Insect Protein Fortification
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground mb-8 leading-relaxed">
                                Developed <span className="text-accent font-medium">nutrient-rich bread</span> fortified with edible termite (<span className="text-accent font-medium">Termitomyces</span>)
                                and mopane worm (<span className="text-accent font-medium">Gonimbrasia belina</span>) meals, investigating their viability as sustainable protein sources to combat malnutrition.
                            </p>
                            <div className="flex flex-wrap gap-2.5">
                                {["Food Development", "Nutrition Science", "R Programming", "Laboratory Analysis"].map((tag) => (
                                    <span key={tag} className="skill-tag">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="lg:col-span-6 relative cursor-pointer group"
                            onClick={() => setSelectedImage({ src: thesisImage, alt: "Andiswa Masuku - Bread fortification research" })}
                        >
                            <div className="relative rounded-2xl overflow-hidden bg-secondary ring-1 ring-slate-900/5 shadow-lg">
                                <img
                                    src={thesisImage}
                                    alt="Andiswa Masuku - Bread fortification research"
                                    loading="eager"
                                    decoding="async"
                                    fetchPriority="high"
                                    className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
                                />
                                <div className="absolute top-3 right-3 z-20">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-xs transition-all">
                                        <Maximize2 size={14} />
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Specimen Overview Banner */}
            <section className="py-6 px-6 md:px-10">
                <div className="max-w-[1100px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-2xl overflow-hidden bg-secondary ring-1 ring-slate-900/5 shadow-md cursor-pointer group"
                        onClick={() => setSelectedImage({ src: edibleInsects, alt: "Andiswa Masuku | Sustainable protein sources research - termites and mopane worms" })}
                    >
                        <img
                            src={edibleInsects}
                            alt="Andiswa Masuku | Sustainable protein sources research - termites and mopane worms"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-auto group-hover:scale-[1.01] transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3 z-20">
                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-xs transition-all">
                                <Maximize2 size={14} />
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* The Problem & The Solution — Side-by-Side Comparison */}
            <section className="py-12 md:py-16 px-6 md:px-10">
                <div className="max-w-[1360px] mx-auto grid md:grid-cols-2 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-7 md:p-9 rounded-2xl bg-secondary/40 border border-border/60 flex flex-col justify-between"
                    >
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-2">
                                Nutritional Challenge
                            </span>
                            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-4">
                                The Problem
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                <span className="text-accent font-semibold">Protein-Energy Malnutrition (PEM)</span> remains a critical challenge
                                in South Africa and across the continent. Traditional protein sources are often expensive and inaccessible
                                to many communities, creating a need for innovative, affordable alternatives.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.08 }}
                        className="p-7 md:p-9 rounded-2xl bg-secondary/40 border border-border/60 flex flex-col justify-between"
                    >
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-2">
                                Bio-Fortification Approach
                            </span>
                            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-4">
                                The Solution
                            </h2>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                <span className="text-accent font-semibold">Sustainable protein enrichment</span> through indigenous edible insects.
                                This research involved the development of brown and white bread fortified with termite and mopane worm meals
                                to create an accessible, nutrient-dense staple food.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Methodology */}
            <section className="py-14 md:py-20 px-6 md:px-10 bg-secondary/25 border-y border-border/40">
                <div className="max-w-[1360px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-10"
                    >
                        <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-1.5">
                            Experimental Protocol
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary tracking-tight mb-2">
                            Methodology
                        </h2>
                        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
                            A systematic approach combining laboratory analysis with statistical validation
                        </p>
                    </motion.div>

                    {/* Contained Editorial Image Cards for Lab Analysis */}
                    <div className="grid md:grid-cols-2 gap-6 mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="cursor-pointer group bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                            onClick={() => setSelectedImage({ src: breadTexture, alt: "Andiswa Masuku methodology - Texture profile analysis" })}
                        >
                            <div className="relative aspect-video overflow-hidden bg-secondary">
                                <img
                                    src={breadTexture}
                                    alt="Andiswa Masuku methodology - Texture profile analysis"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2.5 right-2.5 z-20">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-xs transition-all">
                                        <Maximize2 size={13} />
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 sm:p-5">
                                <h3 className="font-display text-xl font-semibold text-primary group-hover:text-accent transition-colors mb-1">
                                    Texture Profile Analysis
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Measuring fracturability and hardness to assess structural integrity
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.08 }}
                            className="cursor-pointer group bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                            onClick={() => setSelectedImage({ src: colourimetry, alt: "Andiswa Masuku methodology - Colourimetry analysis" })}
                        >
                            <div className="relative aspect-video overflow-hidden bg-secondary">
                                <img
                                    src={colourimetry}
                                    alt="Andiswa Masuku methodology - Colourimetry analysis"
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-2.5 right-2.5 z-20">
                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-xs transition-all">
                                        <Maximize2 size={13} />
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 sm:p-5">
                                <h3 className="font-display text-xl font-semibold text-primary group-hover:text-accent transition-colors mb-1">
                                    Colourimetry
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    Analysing food quality and visual appeal through colour measurement
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {methodologies.map((method, index) => (
                            <motion.div
                                key={method.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: index * 0.06 }}
                                className="p-6 rounded-2xl bg-background border border-border/60 shadow-xs"
                            >
                                <div className="w-11 h-11 mb-4 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                                    {method.icon}
                                </div>
                                <h3 className="font-display text-lg font-semibold text-primary mb-2">{method.title}</h3>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{method.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Key Findings & Significance */}
            <section className="py-14 md:py-20 px-6 md:px-10">
                <div className="max-w-[1360px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-8"
                    >
                        <span className="text-xs font-semibold uppercase tracking-widest text-accent block mb-1.5">
                            Statistical Outcomes
                        </span>
                        <h2 className="font-display text-3xl md:text-4xl font-semibold text-primary tracking-tight">
                            Key Findings
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="p-8 md:p-10 rounded-2xl bg-secondary/40 border border-border/60 mb-12"
                    >
                        <div className="max-w-3xl">
                            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-accent/10 border border-accent/20 rounded-full mb-5">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-xs text-accent font-semibold uppercase tracking-wider">Core Discovery</span>
                            </div>
                            <p className="text-xl md:text-2xl font-display font-semibold text-primary leading-snug mb-3">
                                Physical properties of brown bread showed <span className="text-accent">no significant difference</span>{" "}
                                between control (0%) and 5% insect-fortified samples for both species
                            </p>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Texture, colour, and crumb structure remained statistically similar, demonstrating that fortification
                                can be achieved without compromising the bread's physical characteristics.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-6"
                    >
                        <div className="flex items-center gap-2.5">
                            <Lightbulb size={22} className="text-accent" />
                            <h3 className="font-display text-2xl font-semibold text-primary">Why This Matters</h3>
                        </div>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-5">
                        {significancePoints.map((point, index) => (
                            <motion.div
                                key={point.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.45, delay: index * 0.06 }}
                                className="p-6 rounded-2xl bg-background border border-border/60 shadow-xs"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                                        {point.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-display text-lg font-semibold text-primary mb-1.5">{point.title}</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Cross-Navigation CTA Dock (matches MscDetail) */}
            <section className="py-12 border-t border-border/50 bg-secondary/20">
                <div className="max-w-[1360px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="font-display text-xl font-semibold text-primary">
                            Explore More Scientific Work
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                            Discover Andiswa's MSc mountain spider climate modelling or interactive GIS telemetry maps.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            to="/projects/msc"
                            onMouseEnter={() => prefetchRoute("/projects/msc")}
                            onTouchStart={() => prefetchRoute("/projects/msc")}
                            onFocus={() => prefetchRoute("/projects/msc")}
                            className="px-5 py-2.5 rounded-full bg-secondary hover:bg-secondary/80 text-primary text-xs font-semibold transition-colors border border-border"
                        >
                            MSc Research (Mountain Spiders) →
                        </Link>
                        <Link
                            to="/projects/projects-map"
                            onMouseEnter={() => prefetchRoute("/projects/projects-map")}
                            onTouchStart={() => prefetchRoute("/projects/projects-map")}
                            onFocus={() => prefetchRoute("/projects/projects-map")}
                            className="px-5 py-2.5 rounded-full bg-accent text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
                        >
                            Interactive Spatial Map →
                        </Link>
                    </div>
                </div>
            </section>

            <footer className="border-t border-border pt-8 pb-24 md:pb-8 px-6 md:px-10">
                <div className="max-w-[1360px] mx-auto flex justify-between items-center text-sm text-muted-foreground">
                    <span>© 2026 Andiswa Masuku</span>
                    <Link
                        to="/"
                        onMouseEnter={() => prefetchRoute("/")}
                        onTouchStart={() => prefetchRoute("/")}
                        onFocus={() => prefetchRoute("/")}
                        className="hover:text-accent transition-colors font-medium"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </footer>

            <ImageLightbox
                src={selectedImage?.src ?? null}
                alt={selectedImage?.alt}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
};

export default ThesisDetail;
