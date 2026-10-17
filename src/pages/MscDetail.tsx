import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  Mountain,
  Thermometer,
  Layers,
  Database,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Activity,
  ArrowRight,
  CheckCircle2,
  Compass,
  Cpu,
  Eye,
  FileCode2,
  Maximize2,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import ImageLightbox from "@/components/ImageLightbox";
import { DEFAULT_OG_IMAGE, SITE_URL, toAbsoluteUrl } from "@/lib/seo";
import { prefetchRoute } from "@/lib/prefetch";

import mountainSpidersImage from "@/assets/mountain-spiders-climate.webp";
import ukznLab from "@/assets/ukzn-lab.webp";
import climateChange from "@/assets/climate-change-research.webp";

interface ElevationalZone {
  elevation: string;
  title: string;
  thermalStatus: string;
  temperatureVelocity: string;
  extinctionRisk: "Extreme" | "High" | "Moderate" | "Low";
  description: string;
  spiderFamilies: string[];
}

const elevationalZones: ElevationalZone[] = [
  {
    elevation: "2,800m – 3,482m",
    title: "Alpine Summit Belt",
    thermalStatus: "+2.8°C Projected Warming",
    temperatureVelocity: "Severe Isotherm Compression",
    extinctionRisk: "Extreme",
    description:
      "Summit specialists with narrow thermal tolerance. As warming isotherms push upwards, these cold-adapted endemic arachnids have zero elevational retreat buffer remaining – the definitive 'Escalator to Extinction'.",
    spiderFamilies: ["Linyphiidae (Sheet-weavers)", "Lycosidae (High-altitude Wolf Spiders)"],
  },
  {
    elevation: "2,000m – 2,800m",
    title: "Sub-Alpine Escarpment",
    thermalStatus: "+2.4°C Projected Warming",
    temperatureVelocity: "High Displacement Rate",
    extinctionRisk: "High",
    description:
      "Steep vertical cliff-faces and rocky basalt terraces. Endemic species face upslope contraction, while lower-elevation generalists begin encroaching on established niche spaces.",
    spiderFamilies: ["Gnaphosidae (Ground Spiders)", "Salticidae (Jumping Spiders)"],
  },
  {
    elevation: "1,400m – 2,000m",
    title: "Montane Grasslands",
    thermalStatus: "+1.9°C Projected Warming",
    temperatureVelocity: "Moderate Range Shift",
    extinctionRisk: "Moderate",
    description:
      "Dense Themeda triandra grasslands. Higher species richness with wider climatic breadths; serves as the migration corridor for shifting lower-altitude taxa.",
    spiderFamilies: ["Thomisidae (Crab Spiders)", "Araneidae (Orb-weavers)"],
  },
  {
    elevation: "1,000m – 1,400m",
    title: "Foothills & Valley Floor",
    thermalStatus: "+1.5°C Projected Warming",
    temperatureVelocity: "Basin Baseline",
    extinctionRisk: "Low",
    description:
      "Lowland thermal baseline. Warm-adapted generalists expand their upper distribution limits, increasing competitive displacement pressure on montane specialists.",
    spiderFamilies: ["Theridiidae (Cobweb Spiders)", "Oxyopidae (Lynx Spiders)"],
  },
];

const analyticalPillars = [
  {
    icon: Database,
    title: "20-Year Longitudinal Dataset",
    step: "01",
    tag: "Spatial Longitudinal",
    description:
      "Nearly two decades of standardised, repeated pitfall-trap sampling across elevation transects in the Maloti-Drakensberg, Cederberg, and Soutpansberg ranges.",
  },
  {
    icon: FileCode2,
    title: "Ecological Niche Modelling",
    step: "02",
    tag: "MaxEnt in R",
    description:
      "Multi-algorithm ensemble modelling (MaxEnt, GLMs, Random Forest) cross-referencing presence-only occurrence records with 19 bioclimatic variables from WorldClim & CHELSA.",
  },
  {
    icon: Thermometer,
    step: "03",
    tag: "IPCC SSP Projections",
    title: "Climate Shift Scenarios",
    description:
      "Predicting future geographic shifts under Shared Socioeconomic Pathways (SSP2-4.5 and SSP5-8.5) for horizon years 2050 and 2070 to map contraction corridors.",
  },
  {
    icon: Cpu,
    step: "04",
    tag: "Functional Trait Analysis",
    title: "Trait-Mediated Vulnerability",
    description:
      "Evaluating how functional traits (body length, dispersal capability / ballooning behaviour, web architecture, and habitat specialisation) predict resilience vs. extinction.",
  },
];

const MscDetail = () => {
  const [selectedZone, setSelectedZone] = useState<number>(0);
  const activeZone = elevationalZones[selectedZone];
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const title = "MSc Research: Mountain Spider Climate Shifts | Andiswa Masuku";
  const description =
    "Investigating climate-driven range shifts and the escalator to extinction for South African mountain spiders using 20 years of pitfall-trap data at UKZN.";
  const canonicalUrl = `${SITE_URL}/projects/msc`;
  const ogImage = toAbsoluteUrl(DEFAULT_OG_IMAGE);

  const scholarlyArticleSchema = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    "headline": "Predictive Species Distribution Modelling of High-Altitude Spiders Under Climate Change Scenarios",
    "description": description,
    "author": {
      "@type": "Person",
      "name": "Andiswa Masuku",
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": "University of KwaZulu-Natal",
    },
    "url": canonicalUrl,
    "image": ogImage,
    "about": [
      "Species Distribution Modelling",
      "Predictive Ecology",
      "Montane Invertebrates",
      "Climate Change",
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Research",
        "item": `${SITE_URL}/research`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "MSc Research Project",
        "item": canonicalUrl,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/20 selection:text-accent">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">
          {JSON.stringify(scholarlyArticleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <Navigation />

      {/* ----------------- Hero Section: Peak Apple / Stripe Typography ----------------- */}
      <section className="relative pt-36 md:pt-44 pb-16 md:pb-24 overflow-hidden">
        {/* Subtle background ambient gradients */}
        <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/8 blur-[130px] rounded-full -z-10" />
        <div className="pointer-events-none absolute top-40 right-10 w-[350px] h-[350px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          {/* Breadcrumbs & Status Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-2 mb-6"
          >
            <Link
              to="/research"
              onMouseEnter={() => prefetchRoute("/research")}
              onTouchStart={() => prefetchRoute("/research")}
              onFocus={() => prefetchRoute("/research")}
              className="text-xs uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors font-medium"
            >
              Research
            </Link>
            <span className="text-muted-foreground/40 text-xs">•</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              MSc Research • Predictive Ecology
            </span>
            <span className="text-muted-foreground/40 text-xs hidden sm:inline">•</span>
            <span className="text-xs text-muted-foreground hidden sm:inline font-mono">
              UKZN Westville Campus (2026 – 2027)
            </span>
          </motion.div>

          {/* Headline and Lead Text */}
          <div className="grid lg:grid-cols-12 gap-10 items-end mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-8"
            >
              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] leading-[1.08] text-primary mb-6">
                Predicting Climate Impacts on{" "}
                <span className="gradient-text">Mountain Spiders</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground font-normal leading-relaxed max-w-3xl">
                Forecasting climate-driven upslope range shifts across nearly{" "}
                <strong className="text-primary font-semibold">20 years of pitfall-trap datasets</strong> in South Africa's
                Maloti-Drakensberg, Cederberg, and Soutpansberg transects to identify species on the brink of the{" "}
                <span className="text-accent font-medium">"escalator to extinction."</span>
              </p>
            </motion.div>

            {/* Quick Action Dock */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-4 flex flex-col gap-3 justify-end"
            >
              <Link
                to="/projects/projects-map?project=mountain-spiders"
                onMouseEnter={() => prefetchRoute("/projects/projects-map?project=mountain-spiders")}
                onTouchStart={() => prefetchRoute("/projects/projects-map?project=mountain-spiders")}
                onFocus={() => prefetchRoute("/projects/projects-map?project=mountain-spiders")}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all shadow-md group"
              >
                <MapPin size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>Explore Drakensberg Transects on Map</span>
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <div className="flex items-center justify-between px-4 py-2.5 rounded-2xl bg-secondary/60 border border-border/50 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Compass size={14} className="text-accent" />
                  <span>Coordinates: 29.35° S, 29.28° E</span>
                </span>
                <span className="font-mono text-[11px] text-accent font-medium">Elev. 3,482m Peak</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Media Card: Apple-grade glass card with eager image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="relative rounded-3xl overflow-hidden bg-secondary border border-border/60 shadow-2xl cursor-pointer group"
            onClick={() => setSelectedImage(mountainSpidersImage)}
          >
            <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
              <img
                src={mountainSpidersImage}
                alt="High-altitude mountain spider habitat in the Maloti-Drakensberg escarpment"
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 text-white">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-300 block mb-1">
                  Fieldwork & Ecological Niche Modelling
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-semibold leading-tight drop-shadow-md">
                  Maloti-Drakensberg Escarpment & High-Altitude Biome
                </h3>
                <p className="text-xs sm:text-sm text-white/80 max-w-xl mt-1 hidden sm:block">
                  Standardised pitfall-trap transects establish baseline biodiversity envelopes across altitudinal gradients.
                </p>
              </div>

              <div className="flex items-center gap-2 self-end">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md border border-white/25 text-white shadow-sm flex items-center gap-1.5">
                  <Eye size={13} />
                  <span>View Full Photo</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ----------------- Key Research Metrics (Stripe Metric Cards) ----------------- */}
      <section className="py-8 border-y border-border/40 bg-secondary/25">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="p-4 sm:p-5 rounded-2xl bg-background/80 border border-border/50 shadow-xs">
              <div className="flex items-center gap-2 text-accent mb-2">
                <Database size={18} />
                <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Long-Term Data</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-primary tracking-tight">20 Years</div>
              <p className="text-xs text-muted-foreground mt-1">Standardised elevational pitfall-trap time series</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-background/80 border border-border/50 shadow-xs">
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                <Mountain size={18} />
                <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Altitudinal Range</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-primary tracking-tight">1,000m – 3,480m</div>
              <p className="text-xs text-muted-foreground mt-1">Elevational transects spanning three biomes</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-background/80 border border-border/50 shadow-xs">
              <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400 mb-2">
                <Layers size={18} />
                <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Transect Sites</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-primary tracking-tight">3 Mountain Ranges</div>
              <p className="text-xs text-muted-foreground mt-1">Drakensberg, Cederberg & Soutpansberg</p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-background/80 border border-border/50 shadow-xs">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 mb-2">
                <Activity size={18} />
                <span className="text-xs uppercase tracking-wider font-semibold text-muted-foreground">Modelling Framework</span>
              </div>
              <div className="text-2xl sm:text-3xl font-display font-bold text-primary tracking-tight">MaxEnt + Traits</div>
              <p className="text-xs text-muted-foreground mt-1">Ensemble SDM + Functional Trait Scoring in R</p>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- Interactive Section: Escalator to Extinction ----------------- */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="max-w-3xl mb-12">
            <span className="label-spec text-accent uppercase tracking-widest block mb-2 font-semibold">
              Ecological Mechanism
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary mb-4">
              The "Escalator to Extinction" Framework
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              As global temperatures rise, isotherms shift upward. Organisms adapted to cooler summits are forced to
              migrate into higher elevations to stay within their thermal niche. When summit-dwelling species reach the
              highest peak, their habitat area drops to zero.
            </p>
          </div>

          {/* Interactive Apple-style Elevational Zones Selector */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Zone Buttons */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                Select Elevational Transect Zone:
              </span>
              {elevationalZones.map((zone, idx) => {
                const isSelected = selectedZone === idx;
                return (
                  <button
                    key={zone.elevation}
                    onClick={() => setSelectedZone(idx)}
                    className={`w-full text-left p-4 sm:p-5 rounded-2xl transition-all duration-200 border ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-primary shadow-lg scale-[1.01]"
                        : "bg-card/70 hover:bg-card border-border/60 text-foreground"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-mono font-bold tracking-wider uppercase ${
                          isSelected ? "text-emerald-300" : "text-accent"
                        }`}
                      >
                        {zone.elevation}
                      </span>
                      <span
                        className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                          zone.extinctionRisk === "Extreme"
                            ? isSelected
                              ? "bg-red-500/30 text-white border border-red-400"
                              : "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20"
                            : zone.extinctionRisk === "High"
                            ? isSelected
                              ? "bg-amber-500/30 text-white border border-amber-400"
                              : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            : isSelected
                            ? "bg-white/20 text-white"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {zone.extinctionRisk} Risk
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-semibold">{zone.title}</h4>
                    <p
                      className={`text-xs mt-1 truncate ${
                        isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}
                    >
                      {zone.thermalStatus} • {zone.temperatureVelocity}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Zone Deep Dive Inspector */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeZone.elevation}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-border/50 mb-6">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold block mb-0.5">
                        Selected Elevation Zone
                      </span>
                      <h3 className="font-display text-2xl sm:text-3xl font-bold text-primary">
                        {activeZone.title} ({activeZone.elevation})
                      </h3>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] text-muted-foreground uppercase tracking-wider block">
                        Vulnerability Index
                      </span>
                      <span
                        className={`text-sm font-bold uppercase tracking-wider inline-flex items-center gap-1.5 ${
                          activeZone.extinctionRisk === "Extreme"
                            ? "text-red-500"
                            : activeZone.extinctionRisk === "High"
                            ? "text-amber-500"
                            : "text-emerald-500"
                        }`}
                      >
                        <ShieldCheck size={16} />
                        {activeZone.extinctionRisk} Vulnerability
                      </span>
                    </div>
                  </div>

                  <p className="text-base text-foreground/90 leading-relaxed mb-6 font-normal">
                    {activeZone.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-secondary/50 border border-border/40">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-1">
                        Climatic Disruption
                      </span>
                      <span className="text-base font-semibold text-primary block">
                        {activeZone.thermalStatus}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1 block">
                        {activeZone.temperatureVelocity}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-secondary/50 border border-border/40">
                      <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold block mb-1">
                        Representative Arachnid Taxa
                      </span>
                      <ul className="space-y-1">
                        {activeZone.spiderFamilies.map((fam) => (
                          <li key={fam} className="text-xs font-medium text-primary flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                            <span>{fam}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <MapPin size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span className="text-xs text-emerald-900 dark:text-emerald-200 font-medium">
                        Mapped on South African Research Spatial Registry
                      </span>
                    </div>
                    <Link
                      to="/projects/projects-map?project=mountain-spiders"
                      onMouseEnter={() => prefetchRoute("/projects/projects-map?project=mountain-spiders")}
                      onTouchStart={() => prefetchRoute("/projects/projects-map?project=mountain-spiders")}
                      onFocus={() => prefetchRoute("/projects/projects-map?project=mountain-spiders")}
                      className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:underline inline-flex items-center gap-1"
                    >
                      <span>View Map</span>
                      <ExternalLink size={12} />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- Analytical Pipeline: Stripe Workflow Grid ----------------- */}
      <section className="py-16 md:py-24 bg-secondary/30 border-y border-border/40">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="label-spec text-accent uppercase tracking-widest block mb-2 font-semibold">
              Methodology & Computation
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary mb-4">
              The Analytical Pipeline
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              A rigorous four-phase workflow bridging long-term empirical field ecology with state-of-the-art species
              distribution modelling in R and GIS.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticalPillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.step}
                  className="p-6 rounded-3xl bg-background border border-border/60 shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="w-10 h-10 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                        <Icon size={20} />
                      </span>
                      <span className="font-mono text-xs font-bold text-muted-foreground/60">
                        {pillar.step}
                      </span>
                    </div>

                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent block mb-1">
                      {pillar.tag}
                    </span>
                    <h3 className="font-display text-xl font-semibold text-primary mb-2.5">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-border/40 flex items-center gap-1.5 text-xs text-accent font-medium">
                    <CheckCircle2 size={13} />
                    <span>Peer-reviewed standard</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- Scientific Significance & Policy Impact ----------------- */}
      <section className="py-16 md:py-24">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="label-spec text-accent uppercase tracking-widest block font-semibold">
                Conservation & Policy Outcomes
              </span>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary leading-tight">
                From Predictive Models to Protected Area Expansion
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed">
                This project marks the first time 20-year longitudinal transect data is synthesised through ensemble
                species distribution models to project future arachnid range shifts in Southern Africa.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={15} />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-primary">
                      Protected Area Gap Analysis
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Determining whether projected climate-refugia lie inside the uKhahlamba Drakensberg Park World
                      Heritage Site or in vulnerable unprotected communal lands.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={15} />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-primary">
                      IUCN & SANBI Red List Assessments
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Establishing formal conservation threat rankings and vulnerability scores for endemic mountaintop
                      spider species based on quantitative range contraction rates.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={15} />
                  </div>
                  <div>
                    <h4 className="font-display text-base font-semibold text-primary">
                      Cross-Biome Synthesis
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Comparing elevational shift dynamics across distinct geological formations: Drakensberg (basalt),
                      Cederberg (sandstone), and Soutpansberg (quartzite).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Media Grid */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-5">
              <div
                className="rounded-2xl overflow-hidden bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                onClick={() => setSelectedImage(ukznLab)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={ukznLab}
                    alt="University of KwaZulu-Natal School of Life Sciences Laboratory"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 z-20">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-xs transition-all">
                      <Maximize2 size={13} />
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-[10px] uppercase font-bold text-accent block">Institution</span>
                  <span className="text-xs sm:text-sm font-semibold text-primary block mt-0.5">UKZN Westville Campus</span>
                </div>
              </div>

              <div
                className="rounded-2xl overflow-hidden bg-white dark:bg-card border border-slate-200/80 dark:border-border/70 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                onClick={() => setSelectedImage(climateChange)}
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                  <img
                    src={climateChange}
                    alt="Climate change modelling and ecological assessment"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 z-20">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/55 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 shadow-xs transition-all">
                      <Maximize2 size={13} />
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400 block">
                    Modelling
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-primary block mt-0.5">Predictive Niche Forecasting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- Navigation CTA Dock ----------------- */}
      <section className="pt-12 pb-24 md:pb-12 border-t border-border/50 bg-secondary/20">
        <div className="max-w-[1360px] mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-semibold text-primary">
              Explore More Scientific Work
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Discover Andiswa's Honours thesis on insect protein fortification or interactive GIS telemetry maps.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/projects/thesis"
              onMouseEnter={() => prefetchRoute("/projects/thesis")}
              onTouchStart={() => prefetchRoute("/projects/thesis")}
              onFocus={() => prefetchRoute("/projects/thesis")}
              className="px-5 py-2.5 rounded-full bg-secondary hover:bg-secondary/80 text-primary text-xs font-semibold transition-colors border border-border"
            >
              Honours Thesis (Insect Protein) →
            </Link>
            <Link
              to="/projects/projects-map"
              onMouseEnter={() => prefetchRoute("/projects/projects-map")}
              onTouchStart={() => prefetchRoute("/projects/projects-map")}
              onFocus={() => prefetchRoute("/projects/projects-map")}
              className="px-5 py-2.5 rounded-full bg-accent text-white text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              Interactive Spatial Map →
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox for full photo preview */}
      <ImageLightbox
        src={selectedImage}
        alt="Enlarged research photography"
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
};

export default MscDetail;
