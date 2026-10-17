import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, SITE_URL, toAbsoluteUrl } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import { ArrowRight, FileText, Maximize2 } from "lucide-react";
import { allResearchAreas } from "@/data/researchData";
import { prefetchRoute } from "@/lib/prefetch";
import ImageLightbox from "@/components/ImageLightbox";

const categories = [
  { id: "all", label: "All Research" },
  { id: "ecology", label: "Ecology & Climate" },
  { id: "food", label: "Food Science" },
  { id: "marine", label: "Marine" },
  { id: "genetics", label: "Genetics & Physiology" },
] as const;

const Research = () => {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const title = "Research | Andiswa Masuku - Biological Sciences & Predictive Ecology";
  const description =
    "Explore Andiswa Masuku's scientific research: MSc mountain spider climate shifts, Honours insect protein thesis, marine conservation, and high-altitude physiology.";
  const canonicalUrl = `${SITE_URL}/research`;
  const ogImage = toAbsoluteUrl(DEFAULT_OG_IMAGE);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: canonicalUrl,
    author: {
      "@type": "Person",
      name: "Andiswa Masuku",
      url: SITE_URL,
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
        name: "Research",
        item: canonicalUrl,
      },
    ],
  };

  const filteredAreas = useMemo(() => {
    if (activeCategory === "all") return allResearchAreas;
    if (activeCategory === "ecology") {
      return allResearchAreas.filter((a) =>
        ["mountain-spiders", "climate", "zoology"].includes(a.id)
      );
    }
    if (activeCategory === "food") {
      return allResearchAreas.filter((a) => a.id === "honours-thesis");
    }
    if (activeCategory === "marine") {
      return allResearchAreas.filter((a) => a.id === "marine");
    }
    if (activeCategory === "genetics") {
      return allResearchAreas.filter((a) =>
        ["physiology", "forensics"].includes(a.id)
      );
    }
    return allResearchAreas;
  }, [activeCategory]);

  const getCategoryCount = (catId: string) => {
    if (catId === "all") return allResearchAreas.length;
    if (catId === "ecology") {
      return allResearchAreas.filter((a) =>
        ["mountain-spiders", "climate", "zoology"].includes(a.id)
      ).length;
    }
    if (catId === "food") {
      return allResearchAreas.filter((a) => a.id === "honours-thesis").length;
    }
    if (catId === "marine") {
      return allResearchAreas.filter((a) => a.id === "marine").length;
    }
    if (catId === "genetics") {
      return allResearchAreas.filter((a) =>
        ["physiology", "forensics"].includes(a.id)
      ).length;
    }
    return allResearchAreas.length;
  };

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
        <meta property="og:image:alt" content="Andiswa Masuku academic research" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">{JSON.stringify(collectionSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      <Navigation />

      <main className="pt-28 md:pt-36 pb-20">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          {/* Left-Aligned Header */}
          <div className="mb-8 md:mb-10">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-border/50 pb-5">
              <div>
                <h1 className="font-display text-3xl md:text-5xl font-semibold text-primary tracking-tight">
                  Research Areas
                </h1>
                <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                  Predictive distribution modelling, laboratory investigations, and biodiversity conservation across South African biomes.
                </p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                UKZN & Wits University
              </span>
            </div>

            {/* Micro Discipline Filter Pills with Study Counts */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pt-4">
              {categories.map((c) => {
                const count = getCategoryCount(c.id);
                const isActive = activeCategory === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setActiveCategory(c.id)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                      isActive
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <span>{c.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-slate-200/80 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3-Column Contained Editorial Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAreas.map((area, index) => {
              const destination = area.link || (area.id === "mountain-spiders" ? "/projects/msc" : "/research");

              return (
                <div
                  key={area.id}
                  className="group relative bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 hover:border-slate-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-[box-shadow,border-color] duration-300 flex flex-col justify-between h-full cursor-pointer"
                >
                  {/* Full-Card Absolute Overlay Link */}
                  <Link
                    to={destination}
                    onMouseEnter={() => prefetchRoute(destination)}
                    onTouchStart={() => prefetchRoute(destination)}
                    onFocus={() => prefetchRoute(destination)}
                    className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    aria-label={`Read study: ${area.title}`}
                  />

                  {/* Edge-to-Edge Top Image Inside Card */}
                  <div className="block relative aspect-[16/10] w-full overflow-hidden bg-secondary border-b border-slate-100 dark:border-border/40 shrink-0">
                    <img
                      src={area.image}
                      alt={`Andiswa Masuku - ${area.title}`}
                      loading={index < 3 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

                    {/* Top-Right Full Image Popout Icon Button (z-20) */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedImage({ src: area.image, alt: area.title });
                      }}
                      className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md text-white border border-white/15 shadow-xs transition-all hover:scale-105"
                      title="View full image"
                      aria-label={`View full image for ${area.title}`}
                    >
                      <Maximize2 size={13} />
                    </button>

                    {/* Bottom-Left Frosted Category Badge */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-white border border-white/15 shadow-xs">
                        {area.categoryBadge}
                      </span>
                    </div>
                  </div>

                  {/* Contained Interior Card Body */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-1">
                        <span className="text-slate-700 font-medium">{area.institution}</span>
                        <span className="mx-1.5 text-slate-300">·</span>
                        <span>{area.subtitle}</span>
                      </p>

                      <h3 className="font-display text-[21px] sm:text-[22px] font-semibold text-slate-900 dark:text-foreground group-hover:text-emerald-700 transition-colors leading-tight line-clamp-1">
                        {area.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-muted-foreground leading-relaxed line-clamp-2 mt-2">
                        {area.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-border/50 flex flex-wrap items-center justify-between gap-2">
                      {/* Unboxed Editorial Skill Line */}
                      <span className="text-xs text-slate-500 truncate">
                        {area.skills.slice(0, 2).join(" · ")}
                      </span>

                      {/* Sub-Articles Shelf (only when multiple papers exist) or Explore Indicator */}
                      {area.articles && area.articles.length > 1 ? (
                        <div className="flex items-center gap-1.5 flex-wrap relative z-20">
                          {area.articles.map((article, idx) => (
                            <Link
                              key={article.slug}
                              to={`/projects/articles/${article.slug}`}
                              onMouseEnter={() => prefetchRoute(`/projects/articles/${article.slug}`)}
                              onTouchStart={() => prefetchRoute(`/projects/articles/${article.slug}`)}
                              onFocus={() => prefetchRoute(`/projects/articles/${article.slug}`)}
                              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 hover:text-emerald-900 transition-colors"
                              title={article.title}
                            >
                              <FileText size={10} className="shrink-0" />
                              <span>Paper {idx + 1}</span>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
                          <span>Explore</span>
                          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Footer with mobile safe bottom padding for floating dock */}
      <footer className="border-t border-border pt-8 pb-24 md:pb-8 bg-white">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 flex justify-between items-center text-sm text-muted-foreground">
          <span>© 2026 Andiswa Masuku • Biological Sciences</span>
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
        src={selectedImage?.src || null}
        alt={selectedImage?.alt}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default Research;
