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

export interface ResearchProject {
    id: string;
    title: string;
    subtitle: string;
    category: ProjectCategory;
    location: string;
    coordinates: [number, number]; // [lat, lng]
    zoomLevel: number;
    description: string;
    skills: string[];
    institution: "Wits" | "UKZN";
    hasTrackData: boolean;
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
        id: "laduma-tracking",
        title: "Movement Ecology of Laduma",
        subtitle: "GPS Telemetry & GIS",
        category: "wildlife",
        location: "Cape Town Fynbos, Western Cape",
        coordinates: [-33.95, 18.44],
        zoomLevel: 12,
        description:
            "Mapped the movement patterns of Laduma, a Cape caracal, using GPS collar telemetry data to analyze spatial ecology and habitat use in South African fynbos.",
        skills: ["GIS Analysis", "Telemetry", "Movement Ecology"],
        institution: "Wits",
        hasTrackData: true,
        detailLink: "/projects",
    },
    {
        id: "honours-thesis",
        title: "Honours Thesis",
        subtitle: "Insect Protein Fortification",
        category: "ecology",
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
        location: "Limpopo Province",
        coordinates: [-23.40, 29.50],
        zoomLevel: 8,
        description:
            "Mapped natural resource usage by local communities and documented waste disposal practices to inform conservation land management strategies.",
        skills: ["Community Research", "GIS Mapping", "Conservation"],
        institution: "Wits",
        hasTrackData: false,
    },
    {
        id: "johannesburg-stream",
        title: "Johannesburg Stream Ecology",
        subtitle: "Ecosystem Assessment",
        category: "ecology",
        location: "Johannesburg, Gauteng",
        coordinates: [-26.20, 28.04],
        zoomLevel: 12,
        description:
            "Collected water samples and aquatic organisms to assess ecosystem health via pH levels and water quality parameters.",
        skills: ["Water Quality", "Data Collection", "Ecology"],
        institution: "Wits",
        hasTrackData: false,
    },
    {
        id: "physiology",
        title: "Physiology & Adaptation",
        subtitle: "Comparative Biochemistry",
        category: "physiology",
        location: "Wits University, Johannesburg",
        coordinates: [-26.188, 28.025],
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
        location: "Wits University, Johannesburg",
        coordinates: [-26.188, 28.025],
        zoomLevel: 15,
        description:
            "DNA typing in forensic investigation and forensic genetics analysis and interpretation techniques.",
        skills: ["DNA Analysis", "Gel Electrophoresis", "Forensics"],
        institution: "Wits",
        hasTrackData: false,
    },
    {
        id: "zoology",
        title: "African Zoology",
        subtitle: "Terrestrial Vertebrates",
        category: "ecology",
        location: "Wits University, Johannesburg",
        coordinates: [-26.188, 28.025],
        zoomLevel: 15,
        description:
            "Study of terrestrial African vertebrate zoology, including diversity, behaviour, and ecological roles.",
        skills: ["Animal Behaviour", "Taxonomy", "Ecology"],
        institution: "Wits",
        hasTrackData: false,
    },
    {
        id: "demonstrator",
        title: "Lab Demonstrator",
        subtitle: "Teaching & Assessment",
        category: "education",
        location: "Wits University, Johannesburg",
        coordinates: [-26.188, 28.025],
        zoomLevel: 15,
        description:
            "Guided first-year biology students through lab practicals, invigilated tests, and marked practical assessments.",
        skills: ["Teaching", "Assessment", "Mentorship"],
        institution: "Wits",
        hasTrackData: false,
    },
    {
        id: "climate",
        title: "Climate Change Impact",
        subtitle: "Environmental Resilience",
        category: "sustainability",
        location: "Wits University, Johannesburg",
        coordinates: [-26.188, 28.025],
        zoomLevel: 15,
        description:
            "Investigating the long-term impacts of climate change on local ecosystems and developing strategies for environmental resilience.",
        skills: ["Climate Science", "Data Modelling", "Impact Assessment"],
        institution: "Wits",
        hasTrackData: false,
    },
    {
        id: "sustainability",
        title: "Sustainable Development",
        subtitle: "Future-Proofing",
        category: "sustainability",
        location: "Wits University, Johannesburg",
        coordinates: [-26.188, 28.025],
        zoomLevel: 15,
        description:
            "Researched sustainable development practices to balance economic growth with environmental preservation.",
        skills: ["Sustainability", "Policy Analysis", "Green Tech"],
        institution: "Wits",
        hasTrackData: false,
    },
];
