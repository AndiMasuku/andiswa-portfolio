import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, SITE_URL, toAbsoluteUrl } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import { ArrowRight, FileText, MapPin, Compass, Maximize2 } from "lucide-react";
import { allFieldworkProjects } from "@/data/researchData";
import { prefetchRoute } from "@/lib/prefetch";
import ImageLightbox from "@/components/ImageLightbox";

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const title = "Fieldwork & Projects | Andiswa Masuku - Predictive Ecology & GIS";
  const description =
    "Explore Andiswa Masuku's fieldwork and geospatial expeditions: Cape Caracal GPS collar telemetry, Limpopo conservation stewardship, and aquatic bio-monitoring.";
  const canonicalUrl = `${SITE_URL}/projects`;
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
        name: "Fieldwork Projects",
        item: canonicalUrl,
      },
    ],
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
        <meta property="og:image:alt" content="Andiswa Masuku fieldwork and GIS projects" />
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
                  Projects
                </h1>
                <p className="text-sm md:text-base text-muted-foreground mt-2 max-w-2xl leading-relaxed">
                  Wildlife telemetry, ecological sampling transects, and community resource stewardship expeditions across Southern Africa.
                </p>
              </div>
              <span className="text-xs text-muted-foreground shrink-0">
                Spatial Ecology & GIS
              </span>
            </div>
          </div>

          {/* 3-Column Contained Editorial Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allFieldworkProjects.map((project, index) => {
              const destination = project.link || "/projects";
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="group relative bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 hover:border-slate-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full cursor-pointer"
                >
                  {/* Full-Card Absolute Overlay Link */}
                  <Link
                    to={destination}
                    onMouseEnter={() => prefetchRoute(destination)}
                    onTouchStart={() => prefetchRoute(destination)}
                    onFocus={() => prefetchRoute(destination)}
                    className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                    aria-label={`Read article: ${project.title}`}
                  />

                  {/* Edge-to-Edge Top Image Inside Card */}
                  <div className="block relative aspect-[16/10] w-full overflow-hidden bg-secondary border-b border-slate-100 dark:border-border/40 shrink-0">
                    <img
                      src={project.image}
                      alt={`Andiswa Masuku - ${project.title}`}
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
                        setSelectedImage({ src: project.image, alt: project.title });
                      }}
                      className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md text-white border border-white/15 shadow-xs transition-all hover:scale-105"
                      title="View full image"
                      aria-label={`View full image for ${project.title}`}
                    >
                      <Maximize2 size={13} />
                    </button>

                    {/* Bottom-Left Location Badge */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-white border border-white/15 shadow-xs">
                        <MapPin size={10} className="text-emerald-400 shrink-0" />
                        <span>{project.locationBadge}</span>
                      </span>
                    </div>

                    {/* Bottom-Right Interactive Map Action Pill */}
                    <div className="absolute bottom-3 right-3 z-20">
                      <Link
                        to={`/projects/projects-map?project=${project.id}`}
                        onMouseEnter={() => prefetchRoute(`/projects/projects-map?project=${project.id}`)}
                        onTouchStart={() => prefetchRoute(`/projects/projects-map?project=${project.id}`)}
                        onFocus={() => prefetchRoute(`/projects/projects-map?project=${project.id}`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 hover:bg-emerald-700 backdrop-blur-md text-white border border-white/15 shadow-xs transition-colors"
                        title={`View ${project.title} on interactive map`}
                      >
                        <Compass size={11} className="text-emerald-400 shrink-0" />
                        <span>Map</span>
                      </Link>
                    </div>
                  </div>

                  {/* Contained Interior Card Body */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <p className="text-xs text-slate-500 line-clamp-1 mb-1">
                        {project.subtitle}
                      </p>

                      <h3 className="font-display text-[21px] sm:text-[22px] font-semibold text-slate-900 dark:text-foreground group-hover:text-emerald-700 transition-colors leading-tight line-clamp-1">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-[13px] text-slate-600 dark:text-muted-foreground leading-relaxed line-clamp-2 mt-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-border/50 flex flex-wrap items-center justify-between gap-2">
                      {/* Unboxed Editorial Skill Line */}
                      <span className="text-xs text-slate-500 truncate">
                        {project.skills.slice(0, 2).join(" · ")}
                      </span>

                      {/* Sub-Articles Shelf (only when multiple papers exist) or Explore Indicator */}
                      {project.articles && project.articles.length > 1 ? (
                        <div className="flex items-center gap-1.5 flex-wrap relative z-20">
                          {project.articles.map((article, idx) => (
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
                </motion.div>
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

export default Projects;
