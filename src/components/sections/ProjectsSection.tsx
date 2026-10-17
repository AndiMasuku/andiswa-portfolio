import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, MapPin, Compass, Maximize2, FileText } from "lucide-react";
import { allFieldworkProjects } from "@/data/researchData";
import { prefetchRoute } from "@/lib/prefetch";
import ImageLightbox from "@/components/ImageLightbox";

const ProjectsSection = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

    const checkScroll = () => {
        if (!scrollRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        setCanScrollLeft(scrollLeft > 10);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    };

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;
        const amount = 320;
        scrollRef.current.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll, { passive: true });
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    return (
        <section id="projects" className="py-10 md:py-12 bg-slate-50/50 dark:bg-background border-b border-slate-200/60 dark:border-border/40">
            <div className="max-w-[1360px] mx-auto px-6 md:px-10">
                {/* Editorial Section Header with "See all >" on Far Right */}
                <div className="flex items-baseline justify-between mb-6">
                    <div className="flex items-baseline gap-3">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] text-primary font-semibold tracking-tight">
                            Projects
                        </h2>
                        <span className="hidden sm:inline-block text-xs text-muted-foreground">
                            Applied Ecology & Spatial Analytics
                        </span>
                    </div>

                    <div className="flex items-center gap-3.5">
                        <div className="hidden sm:flex items-center gap-1.5">
                            <button
                                onClick={() => scroll("left")}
                                disabled={!canScrollLeft}
                                aria-label="Scroll left"
                                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all active:scale-95 ${
                                    canScrollLeft
                                        ? "bg-background border-border text-primary hover:border-accent hover:text-accent shadow-xs"
                                        : "bg-background/40 border-border/30 text-muted-foreground/30 cursor-not-allowed"
                                }`}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                disabled={!canScrollRight}
                                aria-label="Scroll right"
                                className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all active:scale-95 ${
                                    canScrollRight
                                        ? "bg-background border-border text-primary hover:border-accent hover:text-accent shadow-xs"
                                        : "bg-background/40 border-border/30 text-muted-foreground/30 cursor-not-allowed"
                                }`}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>

                        <Link
                            to="/projects"
                            onMouseEnter={() => prefetchRoute("/projects")}
                            onTouchStart={() => prefetchRoute("/projects")}
                            onFocus={() => prefetchRoute("/projects")}
                            className="inline-flex items-center gap-0.5 text-xs sm:text-sm font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                        >
                            <span>See all</span>
                            <ChevronRight size={15} />
                        </Link>
                    </div>
                </div>

                {/* Contained Editorial Cards Rail of Fieldwork Projects */}
                <div className="relative">
                    <div
                        ref={scrollRef}
                        onScroll={checkScroll}
                        className="flex gap-4 md:gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-3"
                        style={{ scrollBehavior: "smooth" }}
                    >
                        {allFieldworkProjects.map((project) => {
                            const destination = project.link || "/projects";
                            return (
                                <div
                                    key={project.id}
                                    className="w-[270px] sm:w-[295px] md:w-[315px] shrink-0 snap-start group relative bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 hover:border-slate-300 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between cursor-pointer"
                                >
                                    {/* Full-Card Absolute Overlay Link */}
                                    <Link
                                        to={destination}
                                        onMouseEnter={() => prefetchRoute(destination)}
                                        onTouchStart={() => prefetchRoute(destination)}
                                        onFocus={() => prefetchRoute(destination)}
                                        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                        aria-label={`Read article: ${project.title}`}
                                    />

                                    {/* Edge-to-Edge Top Image Inside Card */}
                                    <div className="block relative aspect-[16/10] w-full overflow-hidden bg-secondary border-b border-slate-100 dark:border-border/40 shrink-0">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            loading="lazy"
                                            decoding="async"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-75 group-hover:opacity-55 transition-opacity" />

                                        {/* Top-Right Full Image Popout Icon Button (z-20) */}
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setSelectedImage({ src: project.image, alt: project.title });
                                            }}
                                            className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md text-white border border-white/15 shadow-xs transition-all hover:scale-105"
                                            title="View full image"
                                            aria-label={`View full image for ${project.title}`}
                                        >
                                            <Maximize2 size={12} />
                                        </button>

                                        {/* Bottom-Left Location Badge */}
                                        <div className="absolute bottom-3 left-3">
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-black/75 backdrop-blur-md text-white border border-white/15 shadow-xs">
                                                <MapPin size={10} className="text-emerald-400 shrink-0" />
                                                <span>{project.locationBadge}</span>
                                            </span>
                                        </div>

                                        {/* Bottom-Right Interactive Map Pill (z-20) */}
                                        <div className="absolute bottom-3 right-3 z-20">
                                            <Link
                                                to={`/projects/projects-map?project=${project.id}`}
                                                onMouseEnter={() => prefetchRoute(`/projects/projects-map?project=${project.id}`)}
                                                onTouchStart={() => prefetchRoute(`/projects/projects-map?project=${project.id}`)}
                                                onFocus={() => prefetchRoute(`/projects/projects-map?project=${project.id}`)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 hover:bg-emerald-700 backdrop-blur-md text-white border border-white/15 shadow-xs transition-colors"
                                                title={`Locate ${project.title} on interactive map`}
                                            >
                                                <Compass size={11} className="text-emerald-400 shrink-0" />
                                                <span>Map</span>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Contained Interior Card Body */}
                                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                                        <div>
                                            <p className="text-xs text-slate-500 truncate mb-1">
                                                {project.subtitle}
                                            </p>
                                            <h3 className="font-display text-[20px] sm:text-[21px] font-semibold text-slate-900 dark:text-foreground leading-tight group-hover:text-emerald-700 transition-colors line-clamp-1">
                                                {project.title}
                                            </h3>
                                        </div>

                                        {/* Aligned Card Footer */}
                                        <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-border/50 flex items-center justify-between gap-2">
                                            {project.articles && project.articles.length > 1 ? (
                                                <div className="flex items-center gap-1.5 flex-wrap relative z-20">
                                                    {project.articles.map((art, idx) => (
                                                        <Link
                                                            key={art.slug}
                                                            to={`/projects/articles/${art.slug}`}
                                                            onMouseEnter={() => prefetchRoute(`/projects/articles/${art.slug}`)}
                                                            onTouchStart={() => prefetchRoute(`/projects/articles/${art.slug}`)}
                                                            onFocus={() => prefetchRoute(`/projects/articles/${art.slug}`)}
                                                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 hover:text-emerald-900 transition-colors"
                                                            title={art.title}
                                                        >
                                                            <FileText size={10} className="shrink-0" />
                                                            <span>Paper {idx + 1}</span>
                                                        </Link>
                                                    ))}
                                                </div>
                                            ) : (
                                                <span className="text-xs text-slate-500 truncate">
                                                    {project.skills[0]}
                                                </span>
                                            )}

                                            <span className="text-xs font-medium text-emerald-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5 shrink-0">
                                                <span>Explore</span>
                                                <ChevronRight size={13} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Right-edge soft gradient fade to indicate scrollable content */}
                    {canScrollRight && (
                        <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent z-10" />
                    )}
                </div>
            </div>

            <ImageLightbox
                src={selectedImage?.src || null}
                alt={selectedImage?.alt}
                onClose={() => setSelectedImage(null)}
            />
        </section>
    );
};

export default ProjectsSection;
