import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Clock, BookOpen, ArrowRight, X } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { getArticleBySlug, articles } from "@/data/articles";
import { SITE_URL, toAbsoluteUrl } from "@/lib/seo";
import Navigation from "@/components/Navigation";

const ArticlePage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const article = slug ? getArticleBySlug(slug) : undefined;

    if (!article) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-display font-semibold mb-4">Article Not Found</h1>
                    <Link to="/projects" className="text-accent hover:underline">
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
                <div className="relative h-[40vh] min-h-[300px] overflow-hidden">
                    <img
                        src={article.heroImage}
                        alt={article.title}
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
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
            <main className="px-6 md:px-12 py-12">
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
                                    <span className="text-foreground/90 text-sm leading-relaxed text-justify">{point}</span>
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
                            {section.visual && (
                                <div className="bg-muted/30 rounded-xl p-6 border border-border">
                                    {section.visual.src ? (
                                        // Render actual media when src is provided
                                        <div className={`${section.visual.src.endsWith('.mp4') ? 'aspect-[9/16] max-h-[600px] mx-auto' : ''} rounded-lg overflow-hidden mb-3`}>
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
                                                <img
                                                    src={section.visual.src}
                                                    alt={section.visual.caption}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="w-full h-auto object-contain cursor-pointer hover:opacity-90 transition-opacity"
                                                    onClick={() => setSelectedImage(section.visual!.src!)}
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        // Show placeholder when no src
                                        <div className="aspect-[16/9] bg-gradient-to-br from-muted/50 to-muted rounded-lg flex items-center justify-center mb-3">
                                            <span className="text-muted-foreground/50 text-sm">
                                                [{section.visual.type === "chart" ? "📊" : section.visual.type === "diagram" ? "📐" : "🖼️"} Visual: {section.visual.caption}]
                                            </span>
                                        </div>
                                    )}
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
                            className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
                        >
                            <ArrowLeft size={16} />
                            Back to All Projects
                        </Link>
                    </motion.div>
                </div>
            </main>

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

export default ArticlePage;
