import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Navigation, Compass } from "lucide-react";
import thesisImage from "@/assets/thesis-research.webp";
import marineConservation from "@/assets/marine-conservation.webp";
import MarqueeTicker from "../MarqueeTicker";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ladumaPoints, summary, CLUSTER_META, type ClusterKey } from "@/data/ladumaData";

const ThesisSection = () => {
    const mapPreviewRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);

    useEffect(() => {
        if (!mapPreviewRef.current || mapInstanceRef.current) return;

        const map = L.map(mapPreviewRef.current, {
            center: [summary.centroid.lat, summary.centroid.lon],
            zoom: 12,
            zoomControl: false,
            attributionControl: false,
            dragging: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            touchZoom: false,
            boxZoom: false,
            keyboard: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
        }).addTo(map);

        // Vegetation overlay
        L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            { maxZoom: 19, opacity: 0.3 }
        ).addTo(map);

        // Add dots
        for (const pt of ladumaPoints) {
            const meta = CLUSTER_META[pt.cluster];
            L.circleMarker([pt.latitude, pt.longitude], {
                radius: 2,
                fillColor: meta.color,
                color: meta.color,
                weight: 0,
                fillOpacity: 0.6,
            }).addTo(map);
        }

        // Fit to data bounds
        if (ladumaPoints.length > 0) {
            const bounds = L.latLngBounds(
                ladumaPoints.map((p) => [p.latitude, p.longitude] as [number, number])
            );
            map.fitBounds(bounds, { padding: [20, 20] });
        }

        mapInstanceRef.current = map;

        return () => {
            map.remove();
            mapInstanceRef.current = null;
        };
    }, []);

    return (
        <section id="research" className="py-16 md:py-24 px-6 md:px-12 bg-secondary/30 relative overflow-hidden">
            <div className="max-w-[1400px] mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-12"
                >
                    <span className="label-spec text-accent uppercase tracking-widest mb-4 block">Academic Work</span>
                    <h2 className="font-display text-4xl md:text-5xl text-primary font-semibold">Projects & Research</h2>
                </motion.div>

                {/* Bento Grid - Featured Map Top, Two Cards Bottom */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">

                    {/* TOP: Featured Wildlife Tracking Map - Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden rounded-2xl lg:col-span-2 min-h-[340px] bg-white border border-border shadow-sm hover:shadow-xl transition-all"
                    >
                        <Link to="/projects/projects-map" className="absolute inset-0 z-30" aria-label="Open interactive Projects Map" />

                        {/* Map preview background */}
                        <div
                            ref={mapPreviewRef}
                            className="absolute inset-0 z-0"
                            style={{ pointerEvents: "none" }}
                        />

                        {/* Gradient overlay for readability */}
                        <div className="absolute inset-0 z-10 bg-gradient-to-r from-white/95 via-white/70 to-transparent" />
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-white/80 via-transparent to-white/40 lg:hidden" />

                        {/* Content */}
                        <div className="relative z-20 p-8 md:p-10 flex flex-col justify-center h-full max-w-xl">
                            {/* Label */}
                            <div className="flex items-center gap-3 mb-3">
                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-emerald-500/15 text-emerald-700 border border-emerald-500/25">
                                    <MapPin size={12} />
                                    Wildlife GPS Tracking
                                </span>
                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-medium bg-teal-500/10 text-teal-700 border border-teal-500/20">
                                    <Compass size={10} />
                                    Live Map
                                </span>
                            </div>

                            <h3 className="font-display text-3xl md:text-4xl text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors">
                                Caracal Movement Study
                            </h3>

                            <p className="text-slate-600 text-base mb-5 leading-relaxed">
                                Explore <span className="text-emerald-600 font-semibold">{summary.validPoints.toLocaleString()} GPS tracking points</span> from
                                "Laduma" — a caracal navigating Cape Town's urban fynbos ecosystem.
                            </p>

                            {/* Stats */}
                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Navigation size={16} className="text-emerald-600" />
                                    <span className="text-sm font-medium">~12 km² Home Range</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-500">
                                    <span className="text-sm italic">Caracal caracal</span>
                                </div>
                                {(Object.keys(CLUSTER_META) as ClusterKey[]).map((k) => (
                                    <div key={k} className="flex items-center gap-1.5">
                                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: CLUSTER_META[k].color }} />
                                        <span className="text-xs text-slate-500">{summary.clusterCounts[k]}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-md group-hover:bg-emerald-700 group-hover:shadow-lg transition-all duration-300 w-fit">
                                <span>Explore Interactive Map</span>
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                    </motion.div>

                    {/* BOTTOM LEFT: Honours Research */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm flex flex-col hover:shadow-lg transition-all"
                    >
                        <Link to="/projects/thesis" className="absolute inset-0 z-50" aria-label="View research tour" />
                        <div className="h-48 relative w-full overflow-hidden shrink-0">
                            <img
                                src={thesisImage}
                                alt="Andiswa Masuku - Honours Research Thesis"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <h3 className="absolute bottom-4 left-6 font-display text-2xl text-white drop-shadow-md group-hover:text-emerald-300 transition-colors">
                                Honours Research
                            </h3>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                                Termite and mopane worm protein research for sustainable nutrition in Southern Africa.
                            </p>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {["Nutrition", "R Stats", "Lab Analysis"].map((method) => (
                                    <span key={method} className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                                        {method}
                                    </span>
                                ))}
                            </div>
                            <div className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-accent text-white font-semibold text-sm shadow-md hover:shadow-lg hover:bg-accent/90 group-hover:translate-y-[-2px] transition-all">
                                <span>View Research Tour</span>
                                <ArrowRight size={18} />
                            </div>
                        </div>
                    </motion.div>

                    {/* BOTTOM RIGHT: Academic Projects */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative overflow-hidden rounded-2xl bg-white border border-border shadow-sm flex flex-col hover:shadow-lg transition-all"
                    >
                        <Link to="/projects" className="absolute inset-0 z-50" aria-label="View all academic projects" />
                        <div className="h-48 relative w-full overflow-hidden shrink-0">
                            <img
                                src={marineConservation}
                                alt="Andiswa Masuku - Academic Projects Portfolio"
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                            <h3 className="absolute bottom-4 left-6 font-display text-2xl text-white drop-shadow-md group-hover:text-emerald-300 transition-colors">
                                Academic Projects
                            </h3>
                        </div>

                        <div className="p-6 flex flex-col flex-1">
                            <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                                Fieldwork from Limpopo conservation to Johannesburg stream ecology.
                            </p>
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {["Fieldwork", "GIS", "Conservation"].map((field) => (
                                    <span key={field} className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                                        {field}
                                    </span>
                                ))}
                            </div>
                            <div className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl border-2 border-accent text-accent font-semibold text-sm hover:bg-accent hover:text-white transition-all duration-300">
                                <span>Browse Projects</span>
                                <ArrowRight size={18} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <MarqueeTicker items={[
                        "Marine Bio Research",
                        "Impact of Fences on Wildlife",
                        "Hypoxia in High Altitude Populations",
                        "Sustainable Ecosystems"
                    ]} />
                </motion.div>
            </div>
        </section>
    );
};

export default ThesisSection;
