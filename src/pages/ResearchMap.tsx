import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ExternalLink, ChevronRight, Layers, X, Maximize2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SITE_URL, toAbsoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import Navigation from "@/components/Navigation";
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

    return (
        <div className="h-screen w-screen bg-background flex flex-col overflow-hidden">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={canonicalUrl} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={canonicalUrl} />
                <meta property="og:image" content={ogImage} />
            </Helmet>

            {/* Site-wide navigation */}
            <Navigation />

            {/* ---- Main: Map + Project Panel ---- */}
            <div className="flex-1 flex relative overflow-hidden pt-[72px]">
                {/* Map Viewport */}
                <div ref={mapRef} className="flex-1 z-0" />

                {/* Panel toggle button (always visible) */}
                <button
                    onClick={() => setIsNavOpen(!isNavOpen)}
                    className="absolute top-4 right-4 z-[450] p-2 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200/50 shadow-sm text-slate-500 hover:text-emerald-600 hover:border-emerald-200 transition-all"
                    title={isNavOpen ? "Close panel" : "Open projects"}
                >
                    {isNavOpen ? <X size={18} /> : <Layers size={18} />}
                </button>

                {/* ---- Project Navigator Panel ---- */}
                <AnimatePresence>
                    {isNavOpen && (
                        <motion.aside
                            initial={{ x: 340, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 340, opacity: 0 }}
                            transition={{ type: "spring", damping: 30, stiffness: 350 }}
                            className="absolute right-0 top-0 bottom-0 w-[320px] bg-white/95 backdrop-blur-xl border-l border-slate-200/50 z-[400] flex flex-col shadow-2xl shadow-black/5"
                        >
                            {/* Panel header */}
                            <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 shrink-0">
                                <span className="text-base">🗺️</span>
                                <span className="font-display text-sm font-semibold text-slate-800">
                                    Projects Map
                                </span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-medium border border-emerald-100 ml-auto">
                                    {researchProjects.length} Sites
                                </span>
                            </div>

                            {/* Active project detail */}
                            {activeProject && active && (
                                <motion.div
                                    key={active.id}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="p-4 border-b border-slate-100 shrink-0"
                                    style={{
                                        background: `linear-gradient(135deg, ${CATEGORY_META[active.category].color}06, transparent)`,
                                    }}
                                >
                                    <div className="flex items-start gap-3 mb-2">
                                        <span
                                            className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                                            style={{
                                                backgroundColor: `${CATEGORY_META[active.category].color}12`,
                                                border: `1.5px solid ${CATEGORY_META[active.category].color}25`,
                                            }}
                                        >
                                            {CATEGORY_META[active.category].icon}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <h2 className="font-display text-base font-semibold text-slate-900 leading-tight">
                                                {active.title}
                                            </h2>
                                            <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1">
                                                <MapPin size={10} />
                                                {active.location}
                                            </p>
                                        </div>
                                    </div>

                                    <p className="text-xs text-slate-500 leading-relaxed mb-3">
                                        {active.description}
                                    </p>

                                    <div className="flex flex-wrap gap-1 mb-3">
                                        {active.skills.map((s) => (
                                            <span
                                                key={s}
                                                className="text-[10px] px-2 py-0.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500"
                                            >
                                                {s}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Laduma cluster stats */}
                                    {active.id === "laduma-tracking" && (
                                        <div className="flex gap-1.5 mb-3">
                                            <div className="flex-1 text-center p-1.5 rounded-lg bg-white border border-slate-100">
                                                <div className="font-bold text-xs text-slate-800">
                                                    {ladumaSummary.validPoints.toLocaleString()}
                                                </div>
                                                <div className="text-[9px] text-slate-400">Points</div>
                                            </div>
                                            {(Object.keys(CLUSTER_META) as ClusterKey[]).map((k) => (
                                                <div
                                                    key={k}
                                                    className="flex-1 text-center p-1.5 rounded-lg bg-white border border-slate-100"
                                                >
                                                    <div className="flex items-center justify-center gap-1">
                                                        <span
                                                            className="w-1.5 h-1.5 rounded-full"
                                                            style={{ backgroundColor: CLUSTER_META[k].color }}
                                                        />
                                                        <span className="font-bold text-xs text-slate-800">
                                                            {ladumaSummary.clusterCounts[k]}
                                                        </span>
                                                    </div>
                                                    <div className="text-[9px] text-slate-400 truncate">
                                                        {CLUSTER_META[k].label}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {active.detailLink && (
                                        <Link
                                            to={active.detailLink}
                                            className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 hover:text-emerald-700"
                                        >
                                            View project details <ExternalLink size={10} />
                                        </Link>
                                    )}
                                </motion.div>
                            )}

                            {/* Show All button */}
                            <button
                                onClick={showAllProjects}
                                className={`mx-3 mt-3 mb-1 flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${!activeProject
                                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                    : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-200"
                                    }`}
                            >
                                <Maximize2 size={13} />
                                Show All Sites
                            </button>

                            {/* Project list */}
                            <div className="flex-1 overflow-y-auto px-2 pt-2 pb-4">
                                {researchProjects.map((project) => {
                                    const catMeta = CATEGORY_META[project.category];
                                    const isActive = project.id === activeProject;
                                    return (
                                        <button
                                            key={project.id}
                                            onClick={() => flyToProject(project)}
                                            className={`w-full text-left px-3 py-2.5 mb-0.5 rounded-xl flex items-center gap-2.5 transition-all duration-150 group ${isActive
                                                ? "bg-emerald-50/80 ring-1 ring-emerald-200"
                                                : "hover:bg-slate-50"
                                                }`}
                                        >
                                            <span
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm shrink-0"
                                                style={{
                                                    backgroundColor: `${catMeta.color}${isActive ? "15" : "08"}`,
                                                    border: `1px solid ${catMeta.color}${isActive ? "30" : "12"}`,
                                                }}
                                            >
                                                {catMeta.icon}
                                            </span>

                                            <div className="flex-1 min-w-0">
                                                <div
                                                    className={`text-xs font-semibold truncate ${isActive ? "text-emerald-700" : "text-slate-700"
                                                        }`}
                                                >
                                                    {project.title}
                                                </div>
                                                <div className="text-[10px] text-slate-400 truncate flex items-center gap-1">
                                                    <MapPin size={8} className="shrink-0" />
                                                    {project.location}
                                                </div>
                                            </div>

                                            {project.hasTrackData && (
                                                <span className="text-[8px] px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 font-bold border border-emerald-100 shrink-0">
                                                    GPS
                                                </span>
                                            )}

                                            <ChevronRight
                                                size={12}
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
            </div>

            {/* Global styles */}
            <style>{`
        .custom-project-marker {
          background: none !important;
          border: none !important;
        }
        .leaflet-control-zoom {
          border-radius: 12px !important;
          border: 1px solid rgba(148,163,184,0.2) !important;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06) !important;
        }
        .leaflet-control-zoom a {
          width: 34px !important;
          height: 34px !important;
          line-height: 34px !important;
          font-size: 16px !important;
          color: #475569 !important;
        }
        .leaflet-control-zoom a:hover {
          background: #f1f5f9 !important;
        }
      `}</style>
        </div>
    );
};

export default ResearchMap;
