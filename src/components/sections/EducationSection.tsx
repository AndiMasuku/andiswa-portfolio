import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { GraduationCap, Award, Maximize2, ChevronRight } from "lucide-react";
import ukznLabImage from "@/assets/ukzn-lab.webp";
import witsFieldworkImage from "@/assets/wits-fieldwork.webp";
import { prefetchRoute } from "@/lib/prefetch";
import ImageLightbox from "@/components/ImageLightbox";

interface EducationItem {
    id: string;
    degree: string;
    meta: string;
    badge: string;
    subBadge?: string;
    image: string;
    isCurrent?: boolean;
    link?: string;
}

const educationData: EducationItem[] = [
    {
        id: "msc-ukzn",
        degree: "MSc, Biological Sciences (Ecology)",
        meta: "UKZN Westville • Ecological Modelling",
        badge: "2026 – 2027",
        image: ukznLabImage,
        isCurrent: true,
        link: "/projects/msc",
    },
    {
        id: "honours-ukzn",
        degree: "BSc Honours in Biological Sciences",
        meta: "UKZN Westville • Insect Protein Research",
        badge: "2025",
        image: ukznLabImage,
        link: "/projects/thesis",
    },
    {
        id: "bsc-wits",
        degree: "BSc in Biological Sciences",
        meta: "Wits University • Certificate of Merit",
        badge: "2017 – 2020",
        subBadge: "Merit Award",
        image: witsFieldworkImage,
    },
];

const EducationSection = () => {
    const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

    return (
        <section id="education" className="py-10 md:py-12 bg-background border-b border-border/40">
            <div className="max-w-[1360px] mx-auto px-6 md:px-10">
                {/* Editorial Section Header */}
                <div className="flex items-baseline justify-between mb-6">
                    <div className="flex items-baseline gap-3">
                        <h2 className="font-display text-2xl sm:text-3xl md:text-[34px] text-primary font-semibold tracking-tight">
                            Education
                        </h2>
                        <span className="hidden sm:inline-block text-xs text-muted-foreground">
                            UKZN & Wits
                        </span>
                    </div>
                </div>

                {/* Contained Editorial Cards: Responsive Rail on Mobile, 3-Columns on Desktop */}
                <div className="relative">
                    <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x md:snap-none scrollbar-hide pb-3">
                        {educationData.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.4, delay: index * 0.08 }}
                                className={`w-[270px] sm:w-[295px] md:w-auto shrink-0 md:shrink snap-start group relative bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 rounded-2xl overflow-hidden shadow-xs transition-all duration-300 flex flex-col justify-between ${
                                    item.link
                                        ? "cursor-pointer hover:border-slate-300 hover:shadow-md"
                                        : ""
                                }`}
                            >
                                {/* Full-Card Clickable Link if link exists */}
                                {item.link && (
                                    <Link
                                        to={item.link}
                                        onMouseEnter={() => prefetchRoute(item.link!)}
                                        onTouchStart={() => prefetchRoute(item.link!)}
                                        onFocus={() => prefetchRoute(item.link!)}
                                        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                                        aria-label={`View details for ${item.degree}`}
                                    />
                                )}

                                {/* Edge-to-Edge Top Image Inside Card */}
                                <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary border-b border-slate-100 dark:border-border/40 shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.degree}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />

                                    {/* Top-Right Full Image Popout Icon Button (z-20) */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            setSelectedImage({ src: item.image, alt: item.degree });
                                        }}
                                        className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md text-white border border-white/15 shadow-xs transition-all hover:scale-105"
                                        title="View full image"
                                        aria-label={`View full image for ${item.degree}`}
                                    >
                                        <Maximize2 size={12} />
                                    </button>

                                    {/* Date & Award Pills */}
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                                            item.isCurrent
                                                ? "bg-emerald-600 text-white shadow-xs"
                                                : "bg-black/75 backdrop-blur-md text-white border border-white/15 shadow-xs"
                                        }`}>
                                            {item.isCurrent ? (
                                                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                            ) : (
                                                <GraduationCap size={12} />
                                            )}
                                            {item.badge}
                                        </span>

                                        {item.subBadge && (
                                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-50/95 backdrop-blur-sm text-emerald-800 border border-emerald-200/80 shadow-xs">
                                                <Award size={11} className="text-emerald-600" />
                                                {item.subBadge}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Contained Interior Card Body */}
                                <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                                    <div>
                                        <p className="text-xs text-slate-500 truncate mb-1">
                                            {item.meta.replace("•", "·")}
                                        </p>
                                        <h3 className={`font-display text-[20px] sm:text-[21px] font-semibold text-slate-900 dark:text-foreground leading-tight transition-colors line-clamp-1 ${
                                            item.link ? "group-hover:text-emerald-700" : ""
                                        }`}>
                                            {item.degree}
                                        </h3>
                                    </div>

                                    <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-border/50 flex items-center justify-between gap-2">
                                        <span className="text-xs text-slate-500">
                                            {item.isCurrent ? "Current Candidate" : "Completed"}
                                        </span>
                                        {item.link && (
                                            <span className="text-xs font-medium text-emerald-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5 shrink-0">
                                                <span>Explore Thesis</span>
                                                <ChevronRight size={13} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right-edge soft gradient fade to indicate scrollable content on mobile */}
                    <div className="pointer-events-none absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-background to-transparent z-10 md:hidden" />
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

export default EducationSection;
