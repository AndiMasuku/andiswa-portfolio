import { motion } from "framer-motion";
import { ArrowLeft, Clock, BookOpen, ArrowRight, Maximize2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { getArticleBySlug, articles } from "@/data/articles";
import { SITE_URL, toAbsoluteUrl } from "@/lib/seo";
import { prefetchRoute } from "@/lib/prefetch";
import Navigation from "@/components/Navigation";
import ImageLightbox from "@/components/ImageLightbox";

const ArticlePage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const article = slug ? getArticleBySlug(slug) : undefined;

    if (!article) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Helmet>
                    <title>Article Not Found | Andiswa Masuku Research</title>
                    <meta name="robots" content="noindex, nofollow" />
                </Helmet>
                <div className="text-center">
                    <h1 className="text-2xl font-display font-semibold mb-4">Article Not Found</h1>
                    <Link
                        to="/projects"
                        onMouseEnter={() => prefetchRoute("/projects")}
                        onTouchStart={() => prefetchRoute("/projects")}
                        onFocus={() => prefetchRoute("/projects")}
                        className="text-accent hover:underline"
                    >
                        ← Back to Projects
                    </Link>
                </div>
            </div>
        );
    }

    // Get category color classes
    const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
        emerald: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20" },
        blue: { bg: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/20" },
        purple: { bg: "bg-purple-500/10", text: "text-purple-600", border: "border-purple-500/20" },
        teal: { bg: "bg-teal-500/10", text: "text-teal-600", border: "border-teal-500/20" },
    };

    const colors = categoryColors[article.categoryColor] || categoryColors.blue;
    const canonicalUrl = `${SITE_URL}/projects/articles/${article.slug}`;
    const ogImage = toAbsoluteUrl(article.heroImage);

    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.subtitle,
        image: [ogImage],
        author: {
            "@type": "Person",
            name: "Andiswa Masuku",
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": canonicalUrl,
        },
    };

    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: `${SITE_URL}/`,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Projects",
                item: `${SITE_URL}/projects`,
            },
            {
                "@type": "ListItem",
                position: 3,
                name: article.title,
                item: canonicalUrl,
            },
        ],
    };

    // Find related articles
    const relatedArticles = articles.filter(
        (a) => a.id !== article.id && a.relatedProjects.some(p => article.relatedProjects.includes(p))
    ).slice(0, 2);

    return (
        <div className="min-h-screen bg-background">
            <Helmet>
                <title>{article.title} | Andiswa Masuku Research</title>
                <meta name="description" content={article.subtitle} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={article.title} />
                <meta property="og:description" content={article.subtitle} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={ogImage} />
                <meta property="og:image:alt" content={article.title} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={article.title} />
                <meta name="twitter:description" content={article.subtitle} />
                <meta name="twitter:image" content={ogImage} />
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
            </Helmet>

            <Navigation />

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative pt-20"
            >
                {/* Hero Image */}
                <div
                    className="relative h-[40vh] min-h-[300px] overflow-hidden cursor-pointer group"
                    onClick={() => setSelectedImage(article.heroImage)}
                >
                    <img
                        src={article.heroImage}
                        alt={article.title}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(article.heroImage);
                        }}
                        aria-label={`View full image for ${article.title}`}
                        title="View full image"
                        className="absolute top-4 right-4 md:right-8 z-20 inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-xs transition-all active:scale-95"
                    >
                        <Maximize2 size={15} />
                    </button>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8 pointer-events-none">
                    <div className="max-w-3xl mx-auto pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            {/* Top Wayfinding Breadcrumbs */}
                            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-medium text-muted-foreground">
                                <Link
                                    to="/research"
                                    onMouseEnter={() => prefetchRoute("/research")}
                                    onTouchStart={() => prefetchRoute("/research")}
                                    onFocus={() => prefetchRoute("/research")}
                                    className="hover:text-accent transition-colors uppercase tracking-wider"
                                >
                                    Research
                                </Link>
                                <span className="text-muted-foreground/40">•</span>
                                <Link
                                    to="/projects"
                                    onMouseEnter={() => prefetchRoute("/projects")}
                                    onTouchStart={() => prefetchRoute("/projects")}
                                    onFocus={() => prefetchRoute("/projects")}
                                    className="hover:text-accent transition-colors uppercase tracking-wider"
                                >
                                    Fieldwork Projects
                                </Link>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${colors.bg} ${colors.text} border ${colors.border}`}>
                                    {article.category}
                                </span>
                                <span className="flex items-center gap-1.5 text-muted-foreground text-sm">
                                    <Clock size={14} />
                                    {article.readTime} read
                                </span>
                            </div>
                            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground leading-tight mb-3">
                                {article.title}
                            </h1>
                            <p className="text-lg text-muted-foreground">
                                {article.subtitle}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Article Content */}
            <main className="px-6 md:px-12 pt-12 pb-24 md:pb-16">
                <div className="max-w-3xl mx-auto">

                    {/* TLDR Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className={`p-6 rounded-2xl ${colors.bg} border ${colors.border} mb-12`}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <BookOpen size={18} className={colors.text} />
                            <h2 className={`text-sm font-semibold uppercase tracking-wider ${colors.text}`}>Key Findings</h2>
                        </div>
                        <ul className="space-y-3">
                            {article.tldr.map((point, index) => (
                                <li key={index} className="flex gap-3">
                                    <span className={`flex-shrink-0 w-6 h-6 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs font-bold border ${colors.border}`}>
                                        {index + 1}
                                    </span>
                                    <span className="text-foreground/90 text-sm leading-relaxed">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Article Sections */}
                    {article.sections.map((section, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                            className="mb-12"
                        >
                            <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-4">
                                {section.heading}
                            </h2>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                {section.content}
                            </p>

                            {/* Visual Media */}
                            {section.visual && section.visual.src && (
                                <div className="bg-white dark:bg-card rounded-2xl p-4 sm:p-5 border border-slate-200/80 dark:border-border shadow-xs">
                                    <div className={`relative ${section.visual.src.endsWith('.mp4') ? 'aspect-[9/16] max-h-[600px] mx-auto' : ''} rounded-xl overflow-hidden mb-3 bg-secondary/30`}>
                                        {section.visual.src.endsWith('.mp4') ? (
                                            <video
                                                src={section.visual.src}
                                                autoPlay
                                                muted
                                                loop
                                                playsInline
                                                preload="metadata"
                                                className="w-full h-full object-contain"
                                            />
                                        ) : (
                                            <div
                                                className="relative cursor-pointer group"
                                                onClick={() => setSelectedImage(section.visual!.src!)}
                                            >
                                                <img
                                                    src={section.visual.src}
                                                    alt={section.visual.caption}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-auto object-contain group-hover:opacity-95 transition-opacity"
                                                />
                                                <div className="absolute top-2.5 right-2.5 z-20">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-xs transition-all">
                                                        <Maximize2 size={13} />
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-xs text-muted-foreground text-center italic">
                                        {section.visual.caption}
                                    </p>
                                </div>
                            )}
                        </motion.section>
                    ))}


                    {/* Related Articles */}
                    {relatedArticles.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="border-t border-border pt-12"
                        >
                            <h3 className="font-display text-xl font-semibold text-foreground mb-6">Related Research</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                {relatedArticles.map((related) => {
                                    const relatedColors = categoryColors[related.categoryColor] || categoryColors.blue;
                                    return (
                                        <Link
                                            key={related.id}
                                            to={`/projects/articles/${related.slug}`}
                                            onMouseEnter={() => prefetchRoute(`/projects/articles/${related.slug}`)}
                                            onTouchStart={() => prefetchRoute(`/projects/articles/${related.slug}`)}
                                            onFocus={() => prefetchRoute(`/projects/articles/${related.slug}`)}
                                            className="group p-4 rounded-xl bg-muted/30 border border-border hover:border-accent/30 transition-all"
                                        >
                                            <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${relatedColors.bg} ${relatedColors.text} mb-2`}>
                                                {related.category}
                                            </span>
                                            <h4 className="font-medium text-foreground group-hover:text-accent transition-colors mb-1 line-clamp-2">
                                                {related.title}
                                            </h4>
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                Read article <ArrowRight size={12} />
                                            </span>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    )}

                    {/* Interactive Telemetry Map Callout if Caracal article */}
                    {article.relatedProjects?.includes("laduma-tracking") && (
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-8 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl border border-emerald-500/30"
                        >
                            <div>
                                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 uppercase tracking-wider mb-1.5">
                                    Interactive Spatial Map
                                </span>
                                <h4 className="font-display text-lg font-bold">Explore Laduma's Live GPS Tracks</h4>
                                <p className="text-xs text-slate-300 mt-0.5">Visualise all 1,749 collar coordinates, home range bounds, and spatial clusters.</p>
                            </div>
                            <Link
                                to="/projects/projects-map?project=laduma-tracking"
                                onMouseEnter={() => prefetchRoute("/projects/projects-map?project=laduma-tracking")}
                                onTouchStart={() => prefetchRoute("/projects/projects-map?project=laduma-tracking")}
                                onFocus={() => prefetchRoute("/projects/projects-map?project=laduma-tracking")}
                                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shrink-0 shadow-sm"
                            >
                                <span>Open Telemetry Map</span>
                                <ArrowRight size={14} />
                            </Link>
                        </motion.div>
                    )}

                    {/* Back to Projects */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mt-12 text-center"
                    >
                        <Link
                            to="/projects"
                            onMouseEnter={() => prefetchRoute("/projects")}
                            onTouchStart={() => prefetchRoute("/projects")}
                            onFocus={() => prefetchRoute("/projects")}
                            className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                        >
                            <ArrowLeft size={16} />
                            Back to All Projects
                        </Link>
                    </motion.div>
                </div>
            </main>

            <ImageLightbox
                src={selectedImage}
                alt={article.title}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
};

export default ArticlePage;
