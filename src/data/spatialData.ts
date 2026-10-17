/**
 * Spatial Data Registry
 * Central registry for all research projects with spatial coordinates.
 *
 * Coordinate sources:
 * - Laduma: Exact GPS collar data from Laduma rxy.csv
 * - Honours Thesis: UKZN Westville Campus (-29.818, 30.943)
 * - Marine Conservation: Thukela Bank, KZN coast (-29.21, 31.62)
 * - Limpopo Conservation: Limpopo Province centroid (-23.40, 29.50)
 * - Johannesburg Stream: Johannesburg (-26.20, 28.04)
 * - Wits-based projects: Wits University campus (-26.188, 28.025)
 */

import { ladumaPoints, summary as ladumaSummary, CLUSTER_META } from "./ladumaData";

// Re-export Laduma-specific data
export { ladumaPoints, ladumaSummary, CLUSTER_META };
export type { LadumaPoint, ClusterKey } from "./ladumaData";

export type ProjectCategory = "wildlife" | "marine" | "ecology" | "physiology" | "forensics" | "education" | "sustainability";

export type MountainClusterKey = "drakensberg" | "cederberg" | "soutpansberg";

export interface SpiderSamplingStation {
    id: string;
    name: string;
    mountain: MountainClusterKey;
    elevation: number; // in meters a.s.l.
    latitude: number;
    longitude: number;
    speciesCount: number;
    transectType: string;
}

export const MOUNTAIN_CLUSTER_META: Record<MountainClusterKey, {
    label: string;
    shortLabel: string;
    color: string;
    elevationRange: string;
    peakElevation: number;
    coordinates: [number, number];
    zoom: number;
    stationCount: number;
}> = {
    drakensberg: {
        label: "Maloti-Drakensberg",
        shortLabel: "Drakensberg",
        color: "#10b981",
        elevationRange: "1,900m – 3,482m",
        peakElevation: 3482,
        coordinates: [-29.35, 29.28],
        zoom: 9,
        stationCount: 18,
    },
    cederberg: {
        label: "Cederberg",
        shortLabel: "Cederberg",
        color: "#f59e0b",
        elevationRange: "900m – 2,026m",
        peakElevation: 2026,
        coordinates: [-32.40, 19.25],
        zoom: 9,
        stationCount: 12,
    },
    soutpansberg: {
        label: "Soutpansberg",
        shortLabel: "Soutpansberg",
        color: "#8b5cf6",
        elevationRange: "800m – 1,748m",
        peakElevation: 1748,
        coordinates: [-23.03, 29.43],
        zoom: 9,
        stationCount: 8,
    },
};

export const spiderStations: SpiderSamplingStation[] = [
    // Maloti-Drakensberg Transects
    { id: "dk-1", name: "Sentinel Summit Plateau", mountain: "drakensberg", elevation: 3165, latitude: -28.74, longitude: 28.89, speciesCount: 42, transectType: "Alpine Tundra" },
    { id: "dk-2", name: "Cathedral Peak High Ridge", mountain: "drakensberg", elevation: 3004, latitude: -28.93, longitude: 29.21, speciesCount: 56, transectType: "Sub-Alpine Basalt" },
    { id: "dk-3", name: "Sani Pass Alpine Escarpment", mountain: "drakensberg", elevation: 2874, latitude: -29.58, longitude: 29.29, speciesCount: 68, transectType: "Montane Grassland" },
    { id: "dk-4", name: "Didima Gorge Middle Contour", mountain: "drakensberg", elevation: 2150, latitude: -28.97, longitude: 29.25, speciesCount: 84, transectType: "Protea Savanna" },
    { id: "dk-5", name: "Giant's Castle Mid-Slopes", mountain: "drakensberg", elevation: 2420, latitude: -29.34, longitude: 29.48, speciesCount: 71, transectType: "Sub-Alpine Ericoid" },
    { id: "dk-6", name: "Monks Cowl Base Transect", mountain: "drakensberg", elevation: 1920, latitude: -29.05, longitude: 29.38, speciesCount: 92, transectType: "Riverine Valley" },

    // Cederberg Transects
    { id: "cd-1", name: "Sneeuberg Summit Peak", mountain: "cederberg", elevation: 2026, latitude: -32.50, longitude: 19.15, speciesCount: 38, transectType: "High Altitude Fynbos" },
    { id: "cd-2", name: "Tafelberg Rock Plateau", mountain: "cederberg", elevation: 1969, latitude: -32.41, longitude: 19.26, speciesCount: 44, transectType: "Restio-Proteoid" },
    { id: "cd-3", name: "Wolfberg Cracks Ridge", mountain: "cederberg", elevation: 1620, latitude: -32.48, longitude: 19.28, speciesCount: 58, transectType: "Sandstone Heath" },
    { id: "cd-4", name: "Algeria Valley Mid-Station", mountain: "cederberg", elevation: 1100, latitude: -32.37, longitude: 19.06, speciesCount: 76, transectType: "Mesic Mountain Fynbos" },

    // Soutpansberg Transects
    { id: "sp-1", name: "Lajuma Mist-Belt Summit", mountain: "soutpansberg", elevation: 1748, latitude: -23.03, longitude: 29.44, speciesCount: 62, transectType: "Sub-tropical Mist Forest" },
    { id: "sp-2", name: "Mount Letaba Escarpment", mountain: "soutpansberg", elevation: 1530, latitude: -23.01, longitude: 29.41, speciesCount: 79, transectType: "Afromontane Forest Ecotone" },
    { id: "sp-3", name: "Soutpansberg North Slopes", mountain: "soutpansberg", elevation: 1180, latitude: -22.95, longitude: 29.48, speciesCount: 91, transectType: "Savanna-Forest Mosaic" },
    { id: "sp-4", name: "Hanglip Forest Transect", mountain: "soutpansberg", elevation: 1360, latitude: -23.05, longitude: 29.89, speciesCount: 85, transectType: "Indigenous High Canopy" },
];

export interface ResearchProject {
    id: string;
    title: string;
    subtitle: string;
    category: ProjectCategory;
    icon: string;
    location: string;
    coordinates: [number, number]; // [lat, lng]
    zoomLevel: number;
    description: string;
    skills: string[];
    institution: "Wits" | "UKZN";
    hasTrackData: boolean;
    hasMountainClusters?: boolean;
    /** Link to detail page if exists */
    detailLink?: string;
}

const CATEGORY_META: Record<ProjectCategory, { icon: string; color: string; label: string }> = {
    wildlife: { icon: "🐾", color: "#10b981", label: "Wildlife Tracking" },
    marine: { icon: "🌊", color: "#3b82f6", label: "Marine Science" },
    ecology: { icon: "🌿", color: "#22c55e", label: "Ecology" },
    physiology: { icon: "🧬", color: "#8b5cf6", label: "Physiology" },
    forensics: { icon: "🔬", color: "#ec4899", label: "Forensics" },
    education: { icon: "📚", color: "#f59e0b", label: "Education" },
    sustainability: { icon: "♻️", color: "#06b6d4", label: "Sustainability" },
};

export { CATEGORY_META };

export const researchProjects: ResearchProject[] = [
    {
        id: "mountain-spiders",
        title: "Mountain Spiders & Climate Change",
        subtitle: "Species Distribution & Escalator to Extinction",
        category: "wildlife",
        icon: "🕷️",
        location: "Maloti-Drakensberg & Soutpansberg",
        coordinates: [-29.35, 29.28],
        zoomLevel: 9,
        description:
            "Predicting climate-driven upslope range shifts across 20 years of pitfall-trap datasets in South African mountains.",
        skills: ["Species Distribution Modelling", "Climate Forecasting", "R", "GIS"],
        institution: "UKZN",
        hasTrackData: false,
        hasMountainClusters: true,
        detailLink: "/projects/msc",
    },
    {
        id: "laduma-tracking",
        title: "Movement Ecology of Laduma",
        subtitle: "GPS Telemetry & GIS",
        category: "wildlife",
        icon: "🐾",
        location: "Cape Town Fynbos, Western Cape",
        coordinates: [-33.95, 18.44],
        zoomLevel: 12,
        description:
            "Mapped the movement patterns of Laduma, a Cape caracal, using GPS collar telemetry data to analyse spatial ecology and habitat use in South African fynbos.",
        skills: ["GIS Analysis", "Telemetry", "Movement Ecology"],
        institution: "Wits",
        hasTrackData: true,
        detailLink: "/projects/articles/caracal-movement-ecology",
    },
    {
        id: "honours-thesis",
        title: "Honours Thesis",
        subtitle: "Insect Protein Fortification",
        category: "ecology",
        icon: "🍞",
        location: "UKZN Westville Campus, Durban",
        coordinates: [-29.818, 30.943],
        zoomLevel: 15,
        description:
            "Developed nutrient-rich bread fortified with edible termite and mopane worm meals, investigating their viability as sustainable protein sources.",
        skills: ["Food Development", "Lab Analysis", "R Programming"],
        institution: "UKZN",
        hasTrackData: false,
        detailLink: "/projects/thesis",
    },
    {
        id: "marine",
        title: "Marine Conservation",
        subtitle: "Thukela Bank Ecosystem",
        category: "marine",
        icon: "🌊",
        location: "Thukela Bank, KZN Coast",
        coordinates: [-29.21, 31.62],
        zoomLevel: 10,
        description:
            "Analysed the effects of reduced fishing and poaching on marine ecosystem recovery and biodiversity in the Thukela Bank protected area.",
        skills: ["Marine Ecology", "Conservation", "Data Analysis"],
        institution: "Wits",
        hasTrackData: false,
        detailLink: "/projects/articles/fishing-poaching-impacts",
    },
    {
        id: "limpopo",
        title: "Limpopo Conservation Study",
        subtitle: "People & Conservation",
        category: "ecology",
        icon: "🗺️",
        location: "Limpopo Province",
        coordinates: [-23.40, 29.50],
        zoomLevel: 8,
        description:
            "Mapped natural resource usage by local communities and documented waste disposal practices to inform conservation land management strategies.",
        skills: ["Community Research", "GIS Mapping", "Conservation"],
        institution: "Wits",
        hasTrackData: false,
        detailLink: "/projects/articles/limpopo-conservation",
    },
    {
        id: "johannesburg-stream",
        title: "Johannesburg Stream Ecology",
        subtitle: "Ecosystem Assessment",
        category: "ecology",
        icon: "💧",
        location: "Johannesburg, Gauteng",
        coordinates: [-26.20, 28.04],
        zoomLevel: 12,
        description:
            "Collected water samples and aquatic organisms to assess ecosystem health via pH levels and water quality parameters.",
        skills: ["Water Quality", "Data Collection", "Ecology"],
        institution: "Wits",
        hasTrackData: false,
        detailLink: "/projects/articles/johannesburg-stream-ecology",
    },
    {
        id: "physiology",
        title: "Physiology & Adaptation",
        subtitle: "Comparative Biochemistry",
        category: "physiology",
        icon: "🧬",
        location: "Wits Medical Campus, Parktown",
        coordinates: [-26.177, 28.044],
        zoomLevel: 15,
        description:
            "Comparative study of physiological adaptations in high-altitude populations across Tibetan, Andean, and Ethiopian highlanders.",
        skills: ["Biochemistry", "Genetics", "Physiology"],
        institution: "Wits",
        hasTrackData: false,
        detailLink: "/projects/articles/altitude-adaptation",
    },
    {
        id: "forensics",
        title: "Forensics & Genetics",
        subtitle: "DNA Typing & Analysis",
        category: "forensics",
        icon: "🔬",
        location: "Wits Oppenheimer Life Sciences",
        coordinates: [-26.191, 28.028],
        zoomLevel: 15,
        description:
            "DNA typing in forensic investigation and forensic genetics analysis and interpretation techniques.",
        skills: ["DNA Analysis", "Gel Electrophoresis", "Forensics"],
        institution: "Wits",
        hasTrackData: false,
        detailLink: "/projects/articles/forensics-genetics",
    },
    {
        id: "zoology",
        title: "African Zoology",
        subtitle: "Terrestrial Vertebrates",
        category: "ecology",
        icon: "🦒",
        location: "Wits Animal & Plant Sciences",
        coordinates: [-26.185, 28.024],
        zoomLevel: 15,
        description:
            "Study of terrestrial African vertebrate zoology, including diversity, behaviour, and ecological roles.",
        skills: ["Animal Behaviour", "Taxonomy", "Ecology"],
        institution: "Wits",
        hasTrackData: false,
        detailLink: "/projects/articles/african-zoology",
    },
    {
        id: "demonstrator",
        title: "Lab Demonstrator",
        subtitle: "Teaching & Assessment",
        category: "education",
        icon: "🧪",
        location: "Wits Biology Teaching Labs",
        coordinates: [-26.189, 28.022],
        zoomLevel: 15,
        description:
            "Guided first-year biology students through lab practicals, invigilated tests, and marked practical assessments.",
        skills: ["Teaching", "Assessment", "Mentorship"],
        institution: "Wits",
        hasTrackData: false,
        detailLink: "/projects/articles/lab-demonstrator",
    },
    {
        id: "climate",
        title: "Climate Change Impact",
        subtitle: "Environmental Resilience",
        category: "sustainability",
        icon: "🌍",
        location: "Wits Global Change Institute",
        coordinates: [-26.183, 28.030],
        zoomLevel: 15,
        description:
            "Investigating the long-term impacts of climate change on local ecosystems and developing strategies for environmental resilience.",
        skills: ["Climate Science", "Data Modelling", "Impact Assessment"],
        institution: "Wits",
        hasTrackData: false,
        detailLink: "/projects/articles/climate-change-gci",
    },
    {
        id: "sustainability",
        title: "Sustainable Development",
        subtitle: "Future-Proofing",
        category: "sustainability",
        icon: "♻️",
        location: "Wits School of Geography & Environment",
        coordinates: [-26.188, 28.035],
        zoomLevel: 15,
        description:
            "Researched sustainable development practices to balance economic growth with environmental preservation.",
        skills: ["Sustainability", "Policy Analysis", "Green Tech"],
        institution: "Wits",
        hasTrackData: false,
        detailLink: "/projects/articles/sustainable-development",
    },
    {
        id: "climate-fieldwork",
        title: "Grassland Transects",
        subtitle: "Highveld Long-Term Monitoring",
        category: "ecology",
        icon: "🌾",
        location: "Highveld Grasslands, Gauteng",
        coordinates: [-26.35, 28.30],
        zoomLevel: 11,
        description:
            "Field transect documentation and long-term environmental observation assessing ecosystem shifts and climate resilience factors.",
        skills: ["Transect Sampling", "Ecosystem Monitoring", "Field Observation"],
        institution: "Wits",
        hasTrackData: false,
        detailLink: "/projects/articles/grassland-transects",
    },
    {
        id: "sustainability-fieldwork",
        title: "Coastal Resource Auditing",
        subtitle: "Conservation Policy Compliance",
        category: "sustainability",
        icon: "📋",
        location: "KwaZulu-Natal Coastline",
        coordinates: [-29.60, 31.05],
        zoomLevel: 11,
        description:
            "Field assessments evaluating balance between local economic resource usage and environmental preservation guidelines.",
        skills: ["Resource Auditing", "Environmental Policy", "Sustainable Use"],
        institution: "UKZN",
        hasTrackData: false,
        detailLink: "/projects/articles/coastal-resource-auditing",
    },
];
