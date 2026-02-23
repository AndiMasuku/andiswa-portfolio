import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ExternalLink, ChevronRight, Layers, X, Maximize2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SITE_URL, toAbsoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
    researchProjects,
    ladumaPoints,
    ladumaSummary,
    CLUSTER_META,
    CATEGORY_META,
    type ResearchProject,
    type ClusterKey,
} from "@/data/spatialData";

/* ------------------------------------------------------------------ */
/*  Custom labeled marker icon                                        */
/* ------------------------------------------------------------------ */
function createLabeledIcon(project: ResearchProject, isActive: boolean) {
    const cat = CATEGORY_META[project.category];
    const size = isActive ? 44 : 36;
    const ring = isActive
        ? `box-shadow:0 0 0 4px ${cat.color}30, 0 2px 8px rgba(0,0,0,0.15)`
        : `box-shadow:0 1px 4px rgba(0,0,0,0.12)`;
    return L.divIcon({
        className: "custom-project-marker",
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2],
        popupAnchor: [0, -size / 2 - 4],
        html: `
      <div style="position:relative;display:flex;flex-direction:column;align-items:center;">
        <div style="
          width:${size}px;height:${size}px;border-radius:50%;
          background:white;border:3px solid ${cat.color};
          display:flex;align-items:center;justify-content:center;
          font-size:${isActive ? 20 : 16}px;${ring};
          transition:all 0.3s ease;cursor:pointer;
        ">${cat.icon}</div>
        <div style="
          margin-top:4px;padding:2px 8px;border-radius:6px;
          background:white;border:1px solid ${cat.color}40;
          font-family:Inter,system-ui,sans-serif;
          font-size:11px;font-weight:600;color:#1e293b;
          white-space:nowrap;box-shadow:0 1px 3px rgba(0,0,0,0.08);
          max-width:140px;overflow:hidden;text-overflow:ellipsis;
        ">${project.title.length > 20 ? project.title.slice(0, 18) + "…" : project.title}</div>
      </div>
    `,
    });
}

/* ------------------------------------------------------------------ */
/*  Projects Map Page                                                 */
/* ------------------------------------------------------------------ */
const ResearchMap = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const leafletMap = useRef<L.Map | null>(null);
    const ladumaLayerRef = useRef<L.LayerGroup | null>(null);
    const markersRef = useRef<Record<string, L.Marker>>({});
    const [activeProject, setActiveProject] = useState<string>("laduma-tracking");
    const [isNavOpen, setIsNavOpen] = useState(true);

    const title = "Projects Map | Andiswa Masuku";
    const description =
        "Interactive spatial archive of Andiswa Masuku's research projects across South Africa.";
    const canonicalUrl = `${SITE_URL}/projects/projects-map`;
    const ogImage = toAbsoluteUrl(DEFAULT_OG_IMAGE);

    const active = researchProjects.find((p) => p.id === activeProject);

    /* ---- Fit all projects in view ---- */
    const showAllProjects = useCallback(() => {
        if (!leafletMap.current) return;
        setActiveProject("");
        const bounds = L.latLngBounds(researchProjects.map((p) => p.coordinates));
        leafletMap.current.flyToBounds(bounds, { padding: [60, 60], duration: 0.8 });

        if (ladumaLayerRef.current) {
            leafletMap.current.addLayer(ladumaLayerRef.current);
        }
        for (const p of researchProjects) {
            const marker = markersRef.current[p.id];
            if (marker) marker.setIcon(createLabeledIcon(p, false));
        }
    }, []);

    /* ---- Fly to project ---- */
    const flyToProject = useCallback((project: ResearchProject) => {
        if (!leafletMap.current) return;
        setActiveProject(project.id);

        leafletMap.current.flyTo(project.coordinates, project.zoomLevel, {
            duration: 0.6,
            easeLinearity: 0.5,
        });

        for (const p of researchProjects) {
            const marker = markersRef.current[p.id];
            if (marker) marker.setIcon(createLabeledIcon(p, p.id === project.id));
        }

        if (ladumaLayerRef.current) {
            if (project.id === "laduma-tracking") {
                leafletMap.current.addLayer(ladumaLayerRef.current);
            } else {
                leafletMap.current.removeLayer(ladumaLayerRef.current);
            }
        }
    }, []);

    /* ---- Initialize Map ---- */
    useEffect(() => {
        if (!mapRef.current || leafletMap.current) return;

        const allBounds = L.latLngBounds(researchProjects.map((p) => p.coordinates));

        const map = L.map(mapRef.current, {
            center: allBounds.getCenter(),
            zoom: 6,
            zoomControl: false,
            maxBounds: [
                [-36, 15],
                [-20, 35],
            ],
            minZoom: 5,
        });

        // Light base tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
            maxZoom: 19,
        }).addTo(map);

        // Vegetation overlay
        L.tileLayer(
            "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            { attribution: "&copy; Esri", maxZoom: 19, opacity: 0.25 }
        ).addTo(map);

        L.control.zoom({ position: "bottomright" }).addTo(map);

        // Project site markers
        for (const project of researchProjects) {
            const icon = createLabeledIcon(project, project.id === "laduma-tracking");
            const marker = L.marker(project.coordinates, { icon }).addTo(map);
            marker.on("click", () => flyToProject(project));
            markersRef.current[project.id] = marker;
        }

        // Laduma GPS track layer
        const ladumaLayer = L.layerGroup();
        for (const pt of ladumaPoints) {
            const meta = CLUSTER_META[pt.cluster];
            L.circleMarker([pt.latitude, pt.longitude], {
                radius: 2.5,
                fillColor: meta.color,
                color: meta.color,
                weight: 0,
                fillOpacity: 0.5,
            }).addTo(ladumaLayer);
        }
        ladumaLayer.addTo(map);
        ladumaLayerRef.current = ladumaLayer;

        map.fitBounds(allBounds, { padding: [60, 60] });

        leafletMap.current = map;
        return () => {
            map.remove();
            leafletMap.current = null;
        };
    }, [flyToProject]);

    /* ---- Close sidebar on mobile by default ---- */
    useEffect(() => {
        if (window.innerWidth < 768) setIsNavOpen(false);
    }, []);

    return (
        <div className="fixed inset-0 bg-slate-900">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={ogImage} />
            </Helmet>

            {/* ---- Full-screen map ---- */}
            <div ref={mapRef} className="absolute inset-0 z-0" />

            {/* ---- Floating back button (top-left) ---- */}
            <Link
                to="/"
                className="absolute top-4 left-4 z-[500] flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-white/50 shadow-lg shadow-black/10 text-slate-700 hover:text-emerald-700 hover:shadow-xl transition-all duration-200 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                <span className="text-sm font-semibold">Home</span>
            </Link>

            {/* ---- Panel toggle button (top-right, always visible) ---- */}
            <button
                onClick={() => setIsNavOpen(!isNavOpen)}
                className="absolute top-4 right-4 z-[500] p-3 rounded-2xl bg-white/90 backdrop-blur-md border border-white/50 shadow-lg shadow-black/10 text-slate-600 hover:text-emerald-600 hover:shadow-xl transition-all duration-200"
                title={isNavOpen ? "Close panel" : "Open projects"}
            >
                {isNavOpen ? <X size={18} /> : <Layers size={18} />}
            </button>

            {/* ---- Project Navigator Panel ---- */}
            <AnimatePresence>
                {isNavOpen && (
                    <motion.aside
                        initial={{ x: 380, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 380, opacity: 0 }}
                        transition={{ type: "spring", damping: 28, stiffness: 320 }}
                        className="absolute right-0 top-0 bottom-0 w-[340px] md:w-[360px] bg-white/95 backdrop-blur-2xl border-l border-slate-200/60 z-[450] flex flex-col shadow-2xl shadow-black/10"
                    >
                        {/* Panel header */}
                        <div className="px-5 py-4 border-b border-slate-100/80 flex items-center gap-3 shrink-0">
                            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center">
                                <span className="text-lg">🗺️</span>
                            </div>
                            <div>
                                <h1 className="font-display text-base font-bold text-slate-900 leading-tight">
                                    Projects Map
                                </h1>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                    {researchProjects.length} research sites across South Africa
                                </p>
                            </div>
                        </div>

                        {/* Active project detail */}
                        {activeProject && active && (
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                                className="px-5 py-4 border-b border-slate-100/80 shrink-0"
                                style={{
                                    background: `linear-gradient(135deg, ${CATEGORY_META[active.category].color}08, transparent)`,
                                }}
                            >
                                <div className="flex items-start gap-3 mb-3">
                                    <span
                                        className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0"
                                        style={{
                                            backgroundColor: `${CATEGORY_META[active.category].color}12`,
                                            border: `1.5px solid ${CATEGORY_META[active.category].color}25`,
                                        }}
                                    >
                                        {CATEGORY_META[active.category].icon}
                                    </span>
                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-display text-lg font-bold text-slate-900 leading-tight">
                                            {active.title}
                                        </h2>
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                                            <MapPin size={11} />
                                            {active.location}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                                    {active.description}
                                </p>

                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    {active.skills.map((s) => (
                                        <span
                                            key={s}
                                            className="text-[11px] px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-500 font-medium"
                                        >
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                {/* Laduma cluster stats */}
                                {active.id === "laduma-tracking" && (
                                    <div className="flex gap-2 mb-3">
                                        <div className="flex-1 text-center p-2 rounded-xl bg-white border border-slate-100">
                                            <div className="font-bold text-sm text-slate-800">
                                                {ladumaSummary.validPoints.toLocaleString()}
                                            </div>
                                            <div className="text-[10px] text-slate-400 mt-0.5">GPS Points</div>
                                        </div>
                                        {(Object.keys(CLUSTER_META) as ClusterKey[]).map((k) => (
                                            <div
                                                key={k}
                                                className="flex-1 text-center p-2 rounded-xl bg-white border border-slate-100"
                                            >
                                                <div className="flex items-center justify-center gap-1">
                                                    <span
                                                        className="w-2 h-2 rounded-full"
                                                        style={{ backgroundColor: CLUSTER_META[k].color }}
                                                    />
                                                    <span className="font-bold text-sm text-slate-800">
                                                        {ladumaSummary.clusterCounts[k]}
                                                    </span>
                                                </div>
                                                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                                                    {CLUSTER_META[k].label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {active.detailLink && (
                                    <Link
                                        to={active.detailLink}
                                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                                    >
                                        View project details <ExternalLink size={11} />
                                    </Link>
                                )}
                            </motion.div>
                        )}

                        {/* Show All button */}
                        <button
                            onClick={showAllProjects}
                            className={`mx-4 mt-4 mb-2 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${!activeProject
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 ring-2 ring-emerald-100"
                                : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                                }`}
                        >
                            <Maximize2 size={14} />
                            Show All Sites
                        </button>

                        {/* Project list */}
                        <div className="flex-1 overflow-y-auto px-3 pt-2 pb-6">
                            {researchProjects.map((project) => {
                                const catMeta = CATEGORY_META[project.category];
                                const isActive = project.id === activeProject;
                                return (
                                    <button
                                        key={project.id}
                                        onClick={() => flyToProject(project)}
                                        className={`w-full text-left px-3 py-3 mb-1 rounded-xl flex items-center gap-3 transition-all duration-150 group ${isActive
                                            ? "bg-emerald-50/80 ring-1 ring-emerald-200"
                                            : "hover:bg-slate-50"
                                            }`}
                                    >
                                        <span
                                            className="w-9 h-9 rounded-lg flex items-center justify-center text-base shrink-0"
                                            style={{
                                                backgroundColor: `${catMeta.color}${isActive ? "15" : "08"}`,
                                                border: `1px solid ${catMeta.color}${isActive ? "30" : "12"}`,
                                            }}
                                        >
                                            {catMeta.icon}
                                        </span>

                                        <div className="flex-1 min-w-0">
                                            <div
                                                className={`text-sm font-semibold truncate ${isActive ? "text-emerald-700" : "text-slate-700"
                                                    }`}
                                            >
                                                {project.title}
                                            </div>
                                            <div className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                                                <MapPin size={9} className="shrink-0" />
                                                {project.location}
                                            </div>
                                        </div>

                                        {project.hasTrackData && (
                                            <span className="text-[9px] px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 font-bold border border-emerald-100 shrink-0">
                                                GPS
                                            </span>
                                        )}

                                        <ChevronRight
                                            size={14}
                                            className={`shrink-0 transition-all ${isActive
                                                ? "text-emerald-500"
                                                : "text-slate-200 group-hover:text-slate-400"
                                                }`}
                                        />
                                    </button>
                                );
                            })}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Global styles */}
            <style>{`
        .custom-project-marker {
          background: none !important;
          border: none !important;
        }
        .leaflet-control-zoom {
          border-radius: 16px !important;
          border: 1px solid rgba(255,255,255,0.5) !important;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1) !important;
          backdrop-filter: blur(8px);
        }
        .leaflet-control-zoom a {
          width: 38px !important;
          height: 38px !important;
          line-height: 38px !important;
          font-size: 17px !important;
          color: #475569 !important;
          background: rgba(255,255,255,0.9) !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f1f5f9 !important;
        }
      `}</style>
        </div>
    );
};

export default ResearchMap;
