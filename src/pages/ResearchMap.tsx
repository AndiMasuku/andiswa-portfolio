import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  ChevronRight,
  ChevronLeft,
  Layers,
  X,
  Maximize2,
  Briefcase,
  Crosshair,
  ArrowRight,
  Home,
  BookOpen,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SITE_URL, toAbsoluteUrl, DEFAULT_OG_IMAGE } from "@/lib/seo";
import { prefetchRoute } from "@/lib/prefetch";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  researchProjects,
  ladumaPoints,
  ladumaSummary,
  CLUSTER_META,
  CATEGORY_META,
  MOUNTAIN_CLUSTER_META,
  spiderStations,
  type ResearchProject,
  type ClusterKey,
  type MountainClusterKey,
} from "@/data/spatialData";

/* ------------------------------------------------------------------ */
/*  Custom labeled marker icon                                        */
/* ------------------------------------------------------------------ */
function createLabeledIcon(project: ResearchProject, isActive: boolean) {
  const cat = CATEGORY_META[project.category];
  const size = isActive ? 44 : 36;
  const iconSymbol = project.icon || cat.icon;
  const ring = isActive
    ? `box-shadow:0 0 0 4px ${cat.color}35, 0 4px 14px rgba(0,0,0,0.22)`
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
          transition:all 0.25s ease;cursor:pointer;
        ">${iconSymbol}</div>
        <div style="
          margin-top:4px;padding:2px 8px;border-radius:6px;
          background:${isActive ? "#0f172a" : "white"};
          border:1px solid ${isActive ? "#0f172a" : cat.color + "40"};
          font-family:Inter,system-ui,sans-serif;
          font-size:11px;font-weight:600;
          color:${isActive ? "#ffffff" : "#1e293b"};
          white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.12);
          max-width:140px;overflow:hidden;text-overflow:ellipsis;
          transition:all 0.2s ease;
        ">${project.title.length > 20 ? project.title.slice(0, 18) + "…" : project.title}</div>
      </div>
    `,
  });
}

type FilterCategory = "all" | "wildlife" | "ecology" | "lab" | "sustainability";

/* ------------------------------------------------------------------ */
/*  Projects Map Page                                                 */
/* ------------------------------------------------------------------ */
const ResearchMap = () => {
  const [searchParams] = useSearchParams();
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const ladumaLayerRef = useRef<L.LayerGroup | null>(null);
  const spiderLayerRef = useRef<L.LayerGroup | null>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});
  const mobileCarouselRef = useRef<HTMLDivElement>(null);
  const isAutoScrollingRef = useRef<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const requestedProject = searchParams.get("project") || "";
  const [activeProject, setActiveProject] = useState<string>(requestedProject);
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<FilterCategory>("all");
  const [selectedCluster, setSelectedCluster] = useState<ClusterKey | "all">("all");
  const [selectedMountainCluster, setSelectedMountainCluster] = useState<MountainClusterKey | "all">("all");

  const title = "Projects Map | Andiswa Masuku - Predictive Ecology & GIS Telemetry";
  const description =
    "Interactive spatial archive of Andiswa Masuku's biological research and GPS collar movement ecology across South Africa.";
  const canonicalUrl = `${SITE_URL}/projects/projects-map`;
  const ogImage = toAbsoluteUrl(DEFAULT_OG_IMAGE);

  const active = researchProjects.find((p) => p.id === activeProject);
  const currentIndex = activeProject ? researchProjects.findIndex((p) => p.id === activeProject) : -1;

  /* Filtered projects for sidebar list */
  const filteredProjects = useMemo(() => {
    if (activeCategoryFilter === "all") return researchProjects;
    if (activeCategoryFilter === "wildlife") {
      return researchProjects.filter((p) => p.category === "wildlife");
    }
    if (activeCategoryFilter === "ecology") {
      return researchProjects.filter((p) => p.category === "ecology" || p.category === "marine");
    }
    if (activeCategoryFilter === "lab") {
      return researchProjects.filter(
        (p) => p.category === "physiology" || p.category === "forensics" || p.category === "education"
      );
    }
    if (activeCategoryFilter === "sustainability") {
      return researchProjects.filter((p) => p.category === "sustainability");
    }
    return researchProjects;
  }, [activeCategoryFilter]);

  /* ---- Render Laduma points with cluster filtering ---- */
  const renderLadumaPoints = useCallback((clusterFilter: ClusterKey | "all") => {
    if (!ladumaLayerRef.current) return;
    ladumaLayerRef.current.clearLayers();

    const pointsToRender =
      clusterFilter === "all"
        ? ladumaPoints
        : ladumaPoints.filter((pt) => pt.cluster === clusterFilter);

    for (const pt of pointsToRender) {
      const meta = CLUSTER_META[pt.cluster];
      L.circleMarker([pt.latitude, pt.longitude], {
        radius: 2.8,
        fillColor: meta.color,
        color: meta.color,
        weight: 0,
        fillOpacity: 0.65,
      }).addTo(ladumaLayerRef.current);
    }
  }, []);

  /* ---- Filter handler ---- */
  const handleClusterFilter = (cluster: ClusterKey | "all") => {
    setSelectedCluster(cluster);
    renderLadumaPoints(cluster);
  };

  /* ---- Render Spider sampling stations with mountain cluster filtering ---- */
  const renderSpiderStations = useCallback((mountainFilter: MountainClusterKey | "all") => {
    if (!spiderLayerRef.current) return;
    spiderLayerRef.current.clearLayers();

    const stationsToRender =
      mountainFilter === "all"
        ? spiderStations
        : spiderStations.filter((st) => st.mountain === mountainFilter);

    for (const st of stationsToRender) {
      const meta = MOUNTAIN_CLUSTER_META[st.mountain];
      const icon = L.divIcon({
        className: "custom-station-marker",
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        html: `
          <div style="
            width:26px;height:26px;border-radius:50%;
            background:white;border:2.5px solid ${meta.color};
            display:flex;align-items:center;justify-content:center;
            font-size:12px;box-shadow:0 2px 8px rgba(0,0,0,0.22);
            cursor:pointer;
          ">⛰️</div>
        `,
      });

      const marker = L.marker([st.latitude, st.longitude], { icon });
      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif;font-size:12px;padding:6px;min-width:160px;">
          <span style="color:${meta.color};font-weight:700;text-transform:uppercase;font-size:10px;display:block;">${meta.label}</span>
          <h4 style="font-weight:700;font-size:13px;margin:2px 0;color:#0f172a;">${st.name}</h4>
          <p style="margin:2px 0;color:#475569;font-size:11px;">Elevation: <b>${st.elevation}m a.s.l.</b></p>
          <p style="margin:2px 0;color:#475569;font-size:11px;">Transect: ${st.transectType} (${st.speciesCount} spp.)</p>
        </div>
      `);
      marker.addTo(spiderLayerRef.current);
    }
  }, []);

  /* ---- Mountain Cluster Filter Handler ---- */
  const handleMountainClusterFilter = (mountain: MountainClusterKey | "all") => {
    setSelectedMountainCluster(mountain);
    renderSpiderStations(mountain);

    if (!leafletMap.current) return;
    const isMobile = window.innerWidth < 768;
    if (mountain === "all") {
      const bounds = L.latLngBounds(spiderStations.map((st) => [st.latitude, st.longitude]));
      leafletMap.current.fitBounds(bounds, {
        paddingTopLeft: [50, 50],
        paddingBottomRight: isMobile || !isNavOpen ? [50, 50] : [450, 50],
        duration: 0.8,
      });
    } else {
      const meta = MOUNTAIN_CLUSTER_META[mountain];
      let targetCoords: [number, number] = meta.coordinates;
      if (isMobile) {
        targetCoords = [meta.coordinates[0] - 0.02, meta.coordinates[1]];
      } else if (isNavOpen) {
        const pt = leafletMap.current.project(meta.coordinates, meta.zoom);
        const offsetPt = pt.add([180, 0]);
        const offsetLatLng = leafletMap.current.unproject(offsetPt, meta.zoom);
        targetCoords = [offsetLatLng.lat, offsetLatLng.lng];
      }
      leafletMap.current.flyTo(targetCoords, meta.zoom, { duration: 0.8 });
    }
  };

  /* ---- Focus specifically on Laduma GPS track bounds ---- */
  const zoomToLadumaBounds = useCallback(() => {
    if (!leafletMap.current) return;
    const ladumaBounds = L.latLngBounds(
      ladumaPoints.map((p) => [p.latitude, p.longitude] as [number, number])
    );
    const isMobile = window.innerWidth < 768;
    leafletMap.current.fitBounds(ladumaBounds, {
      paddingTopLeft: isMobile ? [40, 40] : [60, 60],
      paddingBottomRight: isMobile || !isNavOpen ? [40, 40] : [450, 60],
      duration: 0.6,
    });
  }, [isNavOpen]);

  /* ---- Fit all projects in view ---- */
  const showAllProjects = useCallback(() => {
    if (!leafletMap.current) return;
    setActiveProject("");
    const bounds = L.latLngBounds(researchProjects.map((p) => p.coordinates));
    const isMobile = window.innerWidth < 768;
    leafletMap.current.flyToBounds(bounds, {
      paddingTopLeft: isMobile ? [40, 40] : [60, 60],
      paddingBottomRight: isMobile || !isNavOpen ? [40, 40] : [450, 60],
      duration: 0.8,
    });

    if (ladumaLayerRef.current) {
      leafletMap.current.addLayer(ladumaLayerRef.current);
    }
    if (spiderLayerRef.current) {
      leafletMap.current.removeLayer(spiderLayerRef.current);
    }
    for (const p of researchProjects) {
      const marker = markersRef.current[p.id];
      if (marker) marker.setIcon(createLabeledIcon(p, false));
    }
  }, [isNavOpen]);

  /* ---- Fly to project with zero friction and desktop framing offset ---- */
  const flyToProject = useCallback(
    (project: ResearchProject) => {
      if (!leafletMap.current) return;
      setActiveProject(project.id);

      const isMobile = window.innerWidth < 768;
      let targetCoords: [number, number] = project.coordinates;
      if (isMobile) {
        // On mobile, offset latitude south slightly so marker stays in view above the compact bottom card
        targetCoords = [project.coordinates[0] - 0.012, project.coordinates[1]];
      } else if (isNavOpen) {
        // On desktop with sidebar open, offset center rightward in pixel space so marker centers in visible map area
        const zoom = project.zoomLevel;
        const pt = leafletMap.current.project(project.coordinates, zoom);
        const offsetPt = pt.add([180, 0]);
        const offsetLatLng = leafletMap.current.unproject(offsetPt, zoom);
        targetCoords = [offsetLatLng.lat, offsetLatLng.lng];
      }

      leafletMap.current.flyTo(targetCoords, project.zoomLevel, {
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
          renderLadumaPoints(selectedCluster);
        } else {
          leafletMap.current.removeLayer(ladumaLayerRef.current);
        }
      }

      if (spiderLayerRef.current) {
        if (project.id === "mountain-spiders") {
          leafletMap.current.addLayer(spiderLayerRef.current);
          renderSpiderStations(selectedMountainCluster);
        } else {
          leafletMap.current.removeLayer(spiderLayerRef.current);
        }
      }
    },
    [isNavOpen, renderLadumaPoints, renderSpiderStations, selectedCluster, selectedMountainCluster]
  );

  const flyToProjectRef = useRef(flyToProject);
  flyToProjectRef.current = flyToProject;

  /* ---- Step to Previous / Next Project seamlessly ---- */
  const goToPrevProject = useCallback(() => {
    const list = filteredProjects.length > 0 ? filteredProjects : researchProjects;
    const idx = list.findIndex((p) => p.id === activeProject);
    const prevIdx = idx <= 0 ? list.length - 1 : idx - 1;
    flyToProject(list[prevIdx]);
  }, [activeProject, filteredProjects, flyToProject]);

  const goToNextProject = useCallback(() => {
    const list = filteredProjects.length > 0 ? filteredProjects : researchProjects;
    const idx = list.findIndex((p) => p.id === activeProject);
    const nextIdx = idx >= list.length - 1 ? 0 : idx + 1;
    flyToProject(list[nextIdx]);
  }, [activeProject, filteredProjects, flyToProject]);

  /* ---- Keyboard Shortcuts for Desktop Power Browsing ---- */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrevProject();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNextProject();
      } else if (e.key === "Escape") {
        e.preventDefault();
        showAllProjects();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextProject, goToPrevProject, showAllProjects]);

  /* ---- Auto-center active card in mobile carousel when activeProject changes ---- */
  useEffect(() => {
    if (!activeProject || !mobileCarouselRef.current) return;
    const cardEl = document.getElementById(`mcard-${activeProject}`);
    if (cardEl) {
      isAutoScrollingRef.current = true;
      cardEl.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
      const timer = setTimeout(() => {
        isAutoScrollingRef.current = false;
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [activeProject]);

  /* ---- Handle manual left/right horizontal swipe/scroll in mobile carousel ---- */
  const handleCarouselScroll = useCallback(() => {
    if (isAutoScrollingRef.current) return;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      if (!mobileCarouselRef.current || isAutoScrollingRef.current) return;
      const container = mobileCarouselRef.current;
      const containerCenter = container.scrollLeft + container.clientWidth / 2;

      let closest: ResearchProject | null = null;
      let minDistance = Infinity;

      for (const p of researchProjects) {
        const el = document.getElementById(`mcard-${p.id}`);
        if (el) {
          const elCenter = el.offsetLeft + el.offsetWidth / 2;
          const dist = Math.abs(containerCenter - elCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closest = p;
          }
        }
      }

      if (closest && closest.id !== activeProject && minDistance < container.clientWidth * 0.45) {
        flyToProject(closest);
      }
    }, 120);
  }, [activeProject, flyToProject]);

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
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OSM</a>',
      maxZoom: 19,
    }).addTo(map);

    // Vegetation overlay
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "&copy; Esri", maxZoom: 19, opacity: 0.25 }
    ).addTo(map);

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // Render all project site markers
    for (const project of researchProjects) {
      const isInitial = project.id === requestedProject;
      const icon = createLabeledIcon(project, isInitial);
      const marker = L.marker(project.coordinates, { icon }).addTo(map);
      marker.on("click", () => flyToProjectRef.current(project));
      markersRef.current[project.id] = marker;
    }

    // Laduma GPS track layer
    const ladumaLayer = L.layerGroup();
    ladumaLayer.addTo(map);
    ladumaLayerRef.current = ladumaLayer;

    // Spider sampling stations layer
    const spiderLayer = L.layerGroup();
    spiderLayer.addTo(map);
    spiderLayerRef.current = spiderLayer;

    leafletMap.current = map;

    if (!requestedProject) {
      // By default, fit all 14 projects in view so the user sees everything across South Africa
      map.fitBounds(allBounds, { padding: [60, 60] });
    }

    return () => {
      map.remove();
      leafletMap.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- Handle ?project= query parameter navigation ---- */
  useEffect(() => {
    if (!requestedProject || !leafletMap.current) return;
    const targetProject = researchProjects.find((p) => p.id === requestedProject);
    if (targetProject) {
      flyToProjectRef.current(targetProject);
    }
  }, [requestedProject]);

  /* ---- Keep sidebar open on desktop by default, closed on mobile ---- */
  useEffect(() => {
    if (window.innerWidth < 768) setIsNavOpen(false);
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-900 overflow-hidden">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="South African Research & Fieldwork Interactive Map – Andiswa Masuku" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      {/* ---- Full-screen Leaflet Map ---- */}
      <div ref={mapRef} className="absolute inset-0 z-0" />

      {/* ---- Top Left Navigation Dock (Desktop Only: Zero Friction, Apple-Grade) ---- */}
      <div className="hidden md:flex absolute top-4 left-4 z-[500] items-center gap-2">
        <div className="flex items-center gap-1 p-1 bg-white/95 dark:bg-card/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-xl rounded-2xl">
          <Link
            to="/"
            onMouseEnter={() => prefetchRoute("/")}
            onTouchStart={() => prefetchRoute("/")}
            onFocus={() => prefetchRoute("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <Home size={13} />
            <span>Home</span>
          </Link>
          <Link
            to="/research"
            onMouseEnter={() => prefetchRoute("/research")}
            onTouchStart={() => prefetchRoute("/research")}
            onFocus={() => prefetchRoute("/research")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <BookOpen size={13} />
            <span>Research</span>
          </Link>
          <Link
            to="/projects"
            onMouseEnter={() => prefetchRoute("/projects")}
            onTouchStart={() => prefetchRoute("/projects")}
            onFocus={() => prefetchRoute("/projects")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <Briefcase size={13} />
            <span>Projects</span>
          </Link>
          <button
            onClick={showAllProjects}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              !activeProject
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-700 dark:text-slate-300 hover:text-emerald-700 hover:bg-slate-100 dark:hover:bg-white/10"
            }`}
          >
            <Maximize2 size={13} />
            <span>All Sites ({researchProjects.length})</span>
          </button>
        </div>

        {/* Keyboard Shortcuts Hint Pill */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 bg-slate-900/85 dark:bg-black/70 backdrop-blur-md text-white/80 rounded-2xl text-[11px] font-mono border border-white/10 shadow-lg">
          <span className="text-white/50">Hotkeys:</span>
          <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px]">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px]">→</kbd>
          <span className="text-white/50">tour</span>
          <span className="text-white/20">•</span>
          <kbd className="px-1.5 py-0.5 bg-white/15 rounded text-[10px]">Esc</kbd>
          <span className="text-white/50">all</span>
        </div>
      </div>

      {/* ---- Desktop Panel Open Button (Top-Right, only when sidebar is collapsed) ---- */}
      {!isNavOpen && (
        <button
          onClick={() => setIsNavOpen(true)}
          className="hidden md:flex items-center gap-2 absolute top-4 right-4 z-[500] px-3.5 py-2.5 rounded-2xl bg-white/95 dark:bg-card/95 backdrop-blur-md border border-slate-200/80 dark:border-white/10 shadow-lg text-slate-700 hover:text-emerald-600 hover:shadow-xl transition-all text-xs font-semibold"
          title="Show projects list"
        >
          <Layers size={16} />
          <span>Sites ({researchProjects.length})</span>
        </button>
      )}

      {/* ---- Desktop Sidebar: Zero Friction List with Instant Switching & Active Inspector ---- */}
      <AnimatePresence>
        {isNavOpen && (
          <motion.aside
            initial={{ x: 420, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 420, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="hidden md:flex absolute right-0 top-0 bottom-0 w-[380px] lg:w-[430px] bg-white/95 dark:bg-card/95 backdrop-blur-2xl border-l border-slate-200/60 dark:border-white/10 z-[450] flex-col shadow-2xl shadow-black/15 overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-slate-100 dark:border-white/10 flex items-center justify-between gap-2 shrink-0">
              <div className="min-w-0">
                <h1 className="font-display text-base font-bold text-slate-900 dark:text-white leading-tight truncate">
                  South African Research Map
                </h1>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                  {researchProjects.length} field sites & academic investigations
                </p>
              </div>

              {/* Prev / Next Quick Switcher + Sidebar Close Button (Aligned Side-by-Side, No Overlap) */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center gap-0.5 bg-slate-100 dark:bg-white/10 p-1 rounded-xl">
                  <button
                    onClick={goToPrevProject}
                    className="p-1 rounded-lg hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Previous site"
                  >
                    <ChevronLeft size={15} />
                  </button>
                  <span className="text-[11px] font-mono font-semibold px-1.5 text-slate-500">
                    {currentIndex >= 0 ? `${currentIndex + 1}/${researchProjects.length}` : "Tour"}
                  </span>
                  <button
                    onClick={goToNextProject}
                    className="p-1 rounded-lg hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Next site"
                  >
                    <ChevronRight size={15} />
                  </button>
                </div>

                <button
                  onClick={() => setIsNavOpen(false)}
                  className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-white/10 dark:hover:bg-white/20 text-slate-500 hover:text-slate-800 dark:text-slate-300 transition-colors"
                  title="Hide projects list"
                  aria-label="Hide projects list"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Category Filter Pills (Zero Friction Filtering) */}
            <div className="px-4 py-2.5 border-b border-slate-100 dark:border-white/10 flex items-center gap-1.5 overflow-x-auto scrollbar-hide shrink-0">
              {(
                [
                  { id: "all", label: "All (14)" },
                  { id: "wildlife", label: "Wildlife" },
                  { id: "ecology", label: "Ecology" },
                  { id: "lab", label: "Lab / Wits" },
                  { id: "sustainability", label: "Sustainability" },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setActiveCategoryFilter(f.id)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategoryFilter === f.id
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                      : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Active Project Rich Inspector (Apple/Stripe Tier) */}
            {active && (
              <div className="p-4 bg-slate-50 dark:bg-white/[0.04] border-b border-slate-200/80 dark:border-white/10 shrink-0 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-xs"
                      style={{
                        backgroundColor: `${CATEGORY_META[active.category].color}18`,
                        border: `1.5px solid ${CATEGORY_META[active.category].color}40`,
                      }}
                    >
                      {active.icon || CATEGORY_META[active.category].icon}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 leading-none mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 truncate">
                          {CATEGORY_META[active.category].label}
                        </span>
                        <span className="text-[9px] text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-[10px] font-mono text-slate-500 truncate">
                          {active.institution}
                        </span>
                      </div>
                      <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white truncate">
                        {active.title}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveProject("")}
                    className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/10 transition-colors"
                    title="Deselect"
                  >
                    <X size={15} />
                  </button>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {active.description}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1">
                  {active.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-2 py-0.5 bg-white dark:bg-white/10 border border-slate-200/60 dark:border-white/10 rounded-md text-slate-700 dark:text-slate-300 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Mountain Clusters Selector on Desktop (when Mountain Spiders is active!) */}
                {active.id === "mountain-spiders" && (
                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1.5">
                      Mountain Transects:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => handleMountainClusterFilter("all")}
                        className={`px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                          selectedMountainCluster === "all"
                            ? "bg-emerald-600 text-white"
                            : "bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10"
                        }`}
                      >
                        All (3 Ranges)
                      </button>
                      {(Object.keys(MOUNTAIN_CLUSTER_META) as MountainClusterKey[]).map((k) => (
                        <button
                          key={k}
                          onClick={() => handleMountainClusterFilter(k)}
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[10px] font-semibold transition-all ${
                            selectedMountainCluster === k
                              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                              : "bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: MOUNTAIN_CLUSTER_META[k].color }} />
                          <span>{MOUNTAIN_CLUSTER_META[k].shortLabel}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Laduma Telemetry Selector on Desktop */}
                {active.id === "laduma-tracking" && (
                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/10">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                        GPS Clusters ({ladumaSummary.validPoints.toLocaleString()} Pts):
                      </span>
                      <button
                        onClick={zoomToLadumaBounds}
                        className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5"
                      >
                        <Crosshair size={10} />
                        <span>Focus Bounds</span>
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => handleClusterFilter("all")}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                          selectedCluster === "all"
                            ? "bg-emerald-600 text-white"
                            : "bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10"
                        }`}
                      >
                        All ({ladumaSummary.validPoints.toLocaleString()})
                      </button>
                      {(Object.keys(CLUSTER_META) as ClusterKey[]).map((k) => (
                        <button
                          key={k}
                          onClick={() => handleClusterFilter(k)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold ${
                            selectedCluster === k
                              ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                              : "bg-white dark:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/10"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: CLUSTER_META[k].color }} />
                          <span>{CLUSTER_META[k].label.split(" ")[0]} ({ladumaSummary.clusterCounts[k]})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Standard Primary Action Button */}
                {active.detailLink && (
                  <div className="pt-1">
                    <Link
                      to={active.detailLink}
                      onMouseEnter={() => prefetchRoute(active.detailLink!)}
                      onTouchStart={() => prefetchRoute(active.detailLink!)}
                      onFocus={() => prefetchRoute(active.detailLink!)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-xs"
                    >
                      <span>Explore Study</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Scrollable Project List: Always visible for zero friction! */}
            <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
              {filteredProjects.map((project) => {
                const catMeta = CATEGORY_META[project.category];
                const isActive = project.id === activeProject;
                return (
                  <button
                    key={project.id}
                    onClick={() => flyToProject(project)}
                    className={`w-full text-left px-3.5 py-3 rounded-2xl flex items-center gap-3 transition-all duration-150 group ${
                      isActive
                        ? "bg-emerald-600 text-white shadow-md ring-2 ring-emerald-500/30"
                        : "hover:bg-slate-100 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200"
                    }`}
                  >
                    <span
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 transition-colors ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {catMeta.icon}
                    </span>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider ${
                            isActive ? "text-emerald-200" : "text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {catMeta.label}
                        </span>
                        <span className="text-xs opacity-40">•</span>
                        <span
                          className={`text-[10px] font-mono ${
                            isActive ? "text-white/80" : "text-slate-400"
                          }`}
                        >
                          {project.institution}
                        </span>
                      </div>

                      <h4
                        className={`text-xs sm:text-sm font-semibold truncate ${
                          isActive ? "text-white" : "text-slate-900 dark:text-white"
                        }`}
                      >
                        {project.title}
                      </h4>

                      <p
                        className={`text-[11px] truncate flex items-center gap-1 mt-0.5 ${
                          isActive ? "text-white/80" : "text-slate-400"
                        }`}
                      >
                        <MapPin size={10} className="shrink-0" />
                        <span>{project.location}</span>
                      </p>
                    </div>

                    {project.hasTrackData && (
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        GPS
                      </span>
                    )}

                    <ChevronRight
                      size={15}
                      className={`shrink-0 transition-transform group-hover:translate-x-0.5 ${
                        isActive ? "text-white" : "text-slate-300 dark:text-slate-600"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ---- Mobile Streamlined Project Console & Ergonomic Thumb Rail ---- */}
      <div className="md:hidden fixed bottom-2.5 inset-x-0 z-[500] flex flex-col items-center pointer-events-none gap-1.5">
        {/* Tier 1: Active Spatial Cluster Filter Bar (Laduma GPS Clusters OR Spider Mountain Clusters) */}
        {active && active.id === "laduma-tracking" && (
          <div className="px-3 flex items-center justify-center pointer-events-auto w-full">
            <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-500/40 shadow-xl overflow-x-auto scrollbar-hide max-w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 px-2 shrink-0">
                GPS Clusters:
              </span>
              <button
                onClick={() => handleClusterFilter("all")}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold whitespace-nowrap transition-all ${
                  selectedCluster === "all"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                }`}
              >
                All ({ladumaSummary.validPoints.toLocaleString()})
              </button>
              {(Object.keys(CLUSTER_META) as ClusterKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => handleClusterFilter(k)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-semibold whitespace-nowrap transition-all ${
                    selectedCluster === k
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                      : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: CLUSTER_META[k].color }} />
                  <span>{CLUSTER_META[k].label.split(" ")[0]} ({ladumaSummary.clusterCounts[k]})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {active && active.id === "mountain-spiders" && (
          <div className="px-3 flex items-center justify-center pointer-events-auto w-full">
            <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 rounded-2xl border border-emerald-500/40 shadow-xl overflow-x-auto scrollbar-hide max-w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 px-2 shrink-0">
                Mountain Ranges:
              </span>
              <button
                onClick={() => handleMountainClusterFilter("all")}
                className={`px-2.5 py-1 rounded-xl text-[10px] font-semibold whitespace-nowrap transition-all ${
                  selectedMountainCluster === "all"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                }`}
              >
                All (3 Ranges)
              </button>
              {(Object.keys(MOUNTAIN_CLUSTER_META) as MountainClusterKey[]).map((k) => (
                <button
                  key={k}
                  onClick={() => handleMountainClusterFilter(k)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-semibold whitespace-nowrap transition-all ${
                    selectedMountainCluster === k
                      ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs"
                      : "bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: MOUNTAIN_CLUSTER_META[k].color }} />
                  <span>{MOUNTAIN_CLUSTER_META[k].shortLabel} ({MOUNTAIN_CLUSTER_META[k].elevationRange.split("–")[1]?.trim() || ""})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tier 2: Thumb Controls Bar - Sitting between clusters and scroll cards on the EXACT same row */}
        <div className="px-4 flex items-center justify-between pointer-events-auto w-full max-w-[420px]">
          <div className="flex items-center gap-0.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 px-1 py-0.5 rounded-full shadow-lg text-slate-700 dark:text-slate-200">
            <button
              onClick={goToPrevProject}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 active:scale-90 transition-transform"
              aria-label="Previous site"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="text-[11px] font-mono font-semibold px-2 text-slate-700 dark:text-slate-300">
              {currentIndex >= 0 ? `${currentIndex + 1} of ${researchProjects.length}` : "Swipe to browse"}
            </span>
            <button
              onClick={goToNextProject}
              className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 active:scale-90 transition-transform"
              aria-label="Next site"
            >
              <ChevronRight size={15} />
            </button>
          </div>

          <button
            onClick={showAllProjects}
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/15 text-[11px] font-semibold text-slate-700 dark:text-slate-300 shadow-lg active:scale-90 transition-transform"
            aria-label="Show all sites"
          >
            <span>All Sites</span>
            {active && <X size={12} className="text-slate-400" />}
          </button>
        </div>

        {/* Tier 3: Opaque Solid-Surface Horizontal Snap Rail (Permanent Mobile Scroller) */}
        <div
          ref={mobileCarouselRef}
          onScroll={handleCarouselScroll}
          className="flex gap-2.5 overflow-x-auto snap-x snap-mandatory px-3 py-1 scrollbar-hide pointer-events-auto w-full"
          style={{ scrollPaddingLeft: "12px", scrollPaddingRight: "12px" }}
        >
          {researchProjects.map((p, idx) => {
            const isSelected = p.id === activeProject;
            const meta = CATEGORY_META[p.category];
            const projectIcon = p.icon || meta.icon;

            return (
              <div
                key={p.id}
                id={`mcard-${p.id}`}
                onClick={() => {
                  if (p.id !== activeProject) flyToProject(p);
                }}
                className={`w-[85vw] max-w-[330px] shrink-0 snap-center rounded-2xl p-2.5 transition-all cursor-pointer border-2 ${
                  isSelected
                    ? "bg-white dark:bg-slate-900 border-emerald-500 shadow-2xl ring-2 ring-emerald-500/25"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg opacity-100"
                }`}
              >
                <div className="flex items-center justify-between gap-2.5">
                  {/* Left: Category Icon + Project Details */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg shrink-0 shadow-xs"
                      style={{
                        backgroundColor: `${meta.color}15`,
                        border: `1.5px solid ${meta.color}40`,
                      }}
                    >
                      {projectIcon}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 leading-none">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 truncate">
                          {meta.label}
                        </span>
                        <span className="text-[9px] text-slate-300 dark:text-slate-600">•</span>
                        <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400 truncate">
                          {p.institution}
                        </span>
                      </div>

                      <h3 className="font-display text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5 leading-tight">
                        {p.title}
                      </h3>

                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex items-center gap-1 mt-0.5">
                        <MapPin size={9} className="text-emerald-600 shrink-0" />
                        <span className="truncate">{p.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Prime Thumb Zone CTA Button */}
                  <div className="shrink-0 flex items-center gap-1.5">
                    {p.detailLink ? (
                      <Link
                        to={p.detailLink}
                        onClick={(e) => e.stopPropagation()}
                        onMouseEnter={() => prefetchRoute(p.detailLink!)}
                        onTouchStart={() => prefetchRoute(p.detailLink!)}
                        onFocus={() => prefetchRoute(p.detailLink!)}
                        className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs active:scale-95 transition-all"
                      >
                        <span>Explore Study</span>
                        <ArrowRight size={11} />
                      </Link>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
                        #{idx + 1}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tier 4: Floating Navigation Dock (Right below the scrolling cards) - Jakob's Law sequence */}
        <div className="flex items-center gap-1 p-1.5 bg-white/95 dark:bg-card/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/15 shadow-2xl shadow-black/20 rounded-full pointer-events-auto">
          <Link
            to="/"
            onMouseEnter={() => prefetchRoute("/")}
            onTouchStart={() => prefetchRoute("/")}
            onFocus={() => prefetchRoute("/")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <Home size={15} strokeWidth={1.8} />
            <span className="text-[11px] tracking-tight">Home</span>
          </Link>
          <Link
            to="/research"
            onMouseEnter={() => prefetchRoute("/research")}
            onTouchStart={() => prefetchRoute("/research")}
            onFocus={() => prefetchRoute("/research")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <BookOpen size={15} strokeWidth={1.8} />
            <span className="text-[11px] tracking-tight">Research</span>
          </Link>
          <Link
            to="/projects"
            onMouseEnter={() => prefetchRoute("/projects")}
            onTouchStart={() => prefetchRoute("/projects")}
            onFocus={() => prefetchRoute("/projects")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-700 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          >
            <Briefcase size={15} strokeWidth={1.8} />
            <span className="text-[11px] tracking-tight">Projects</span>
          </Link>
          <button
            onClick={() => {
              if (activeProject) {
                showAllProjects();
              } else if (researchProjects.length > 0) {
                flyToProject(researchProjects[0]);
              }
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md transition-all active:scale-95"
            aria-label="Map view active"
          >
            <MapPin size={15} strokeWidth={2.2} />
            <span className="text-[11px] tracking-tight">Map</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 dark:bg-emerald-600 inline-block shrink-0 ml-0.5" />
          </button>
        </div>
      </div>

      {/* Global map marker styles */}
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
