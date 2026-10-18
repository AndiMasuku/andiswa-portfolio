import mountainSpidersImage from "@/assets/mountain-spiders-climate.webp";
import thesisImage from "@/assets/thesis-research.webp";
import marineConservation from "@/assets/marine-conservation.webp";
import dnaForensics from "@/assets/dna-forensics.webp";
import africanZoology from "@/assets/african-zoology.webp";
import comparativeBiochemistry from "@/assets/comparative-biochemistry.webp";
import climateChange from "@/assets/climate-change-research.webp";
import sustainability from "@/assets/project-sustainability.webp";
import limpopoConservation from "@/assets/limpopo-conservation-study.webp";
import riverResearch from "@/assets/river-research.webp";
import ladumaTracking from "@/assets/laduma-tracking.webp";
import grasslandTransects from "@/assets/grassland-transects.webp";
import coastalResourceAuditing from "@/assets/coastal-resource-auditing.webp";

export interface ResearchArticle {
    slug: string;
    title: string;
}

export interface ResearchItem {
    id: string;
    title: string;
    subtitle: string;
    categoryBadge: string;
    image: string;
    description: string;
    fullStory?: string;
    skills: string[];
    link?: string;
    articles?: ResearchArticle[];
    isLatest?: boolean;
    institution?: string;
}

export interface FieldworkProjectItem {
    id: string;
    title: string;
    subtitle: string;
    locationBadge: string;
    image: string;
    description: string;
    skills: string[];
    link?: string;
    articleSlug?: string;
    articles?: ResearchArticle[];
    institution: string;
}

export const mscProjectData: ResearchItem = {
    id: "mountain-spiders",
    title: "Mountain Spider Climate Shifts",
    subtitle: "Maloti-Drakensberg • Predictive Ecology MSc",
    categoryBadge: "MSc Research",
    image: mountainSpidersImage,
    description:
        "Investigating how rising temperatures push South Africa's mountain spider species upslope across the Maloti-Drakensberg, Cederberg, and Soutpansberg transects using nearly 20 years of pitfall-trap data.",
    fullStory: `Andiswa Masuku is conducting MSc research in Biological Sciences at the University of KwaZulu-Natal (Westville Campus). She holds a BSc from the University of the Witwatersrand and a BSc Honours from UKZN.

Her project tackles a critical question for South Africa's mountain biodiversity. As temperatures rise, mountain species are being pushed upslope in search of cooler conditions. For those already near the summit, there is nowhere left to go. Scientists call this the "escalator to extinction." Andiswa's project will determine which of South Africa's mountain spiders face this fate.

She will use nearly 20 years of standardised pitfall-trap data collected across the Maloti-Drakensberg, Cederberg, and Soutpansberg transects to build species distribution models that map where spiders live now and forecast where they are likely to shift under future climate scenarios. The study will also test which functional traits, such as body size, habitat specialisation, and dispersal ability, separate resilient species from vulnerable ones.

If successful, Andiswa's work will mark the first time this long-term dataset is used to predict future range shifts for South African mountain spiders. The expected outputs include maps of projected range changes and rankings of the most at-risk species and elevational zones. These will help shape conservation priorities and protected-area planning across the Drakensberg, Cederberg, and Soutpansberg. Findings will be shared through peer-reviewed publication, university seminars, and conference presentations.`,
    skills: ["Species Distribution Modelling", "Climate Forecasting", "Functional Traits", "R Programming", "GIS"],
    link: "/projects/msc",
    isLatest: true,
    institution: "UKZN Westville",
};

export const allResearchAreas: ResearchItem[] = [
    mscProjectData,
    {
        id: "honours-thesis",
        title: "Insect Protein Fortification",
        subtitle: "UKZN Westville • Honours Thesis",
        categoryBadge: "Food Science",
        image: thesisImage,
        description:
            "Developed nutrient-rich bread fortified with edible termite (Termitomyces) and mopane worm (Gonimbrasia belina) meals, investigating their viability as sustainable protein sources to combat malnutrition.",
        skills: ["Food Development", "Lab Analysis", "R Programming"],
        link: "/projects/thesis",
        institution: "UKZN Westville",
    },
    {
        id: "marine",
        title: "Marine Seafloor Recovery",
        subtitle: "Thukela Bank • Marine Protected Area",
        categoryBadge: "Marine Biology",
        image: marineConservation,
        description:
            "Analysed the effects of reduced fishing and poaching on marine ecosystem recovery and biodiversity in protected areas.",
        skills: ["Marine Ecology", "Conservation", "Data Analysis"],
        link: "/projects/articles/fishing-poaching-impacts",
        institution: "Wits University",
        articles: [
            { slug: "fishing-poaching-impacts", title: "Can Reducing Fishing Pressure Save Our Seafloors?" },
            { slug: "body-size-master-trait", title: "Why Size Matters: The Master Trait of Ocean Life" },
            { slug: "trophic-levels", title: "Who Eats What? Decoding Estuarine Food Webs" },
        ],
    },
    {
        id: "physiology",
        title: "High-Altitude Hypoxia",
        subtitle: "Comparative Biochemistry • Wits",
        categoryBadge: "Biochemistry",
        image: comparativeBiochemistry,
        description:
            "Comparative study of physiological adaptations in high-altitude populations across Tibetan, Andean, and Ethiopian highlanders.",
        skills: ["Biochemistry", "Genetics", "Physiology"],
        link: "/projects/articles/altitude-adaptation",
        institution: "Wits University",
        articles: [
            { slug: "altitude-adaptation", title: "Three Ways to Breathe Thin Air" },
        ],
    },
    {
        id: "forensics",
        title: "DNA Forensic Genetics",
        subtitle: "Gel Electrophoresis & Typing",
        categoryBadge: "Genetics",
        image: dnaForensics,
        description:
            "DNA typing in forensic investigation and forensic genetics analysis and interpretation techniques.",
        skills: ["DNA Analysis", "Gel Electrophoresis", "Forensics"],
        link: "/projects/articles/forensics-genetics",
        institution: "Wits University",
    },
    {
        id: "zoology",
        title: "African Vertebrate Zoology",
        subtitle: "Terrestrial Diversity & Ecology",
        categoryBadge: "Zoology",
        image: africanZoology,
        description:
            "Study of terrestrial African vertebrate zoology, including diversity, behaviour, and ecological roles.",
        skills: ["Animal Behaviour", "Taxonomy", "Ecology"],
        link: "/projects/articles/african-zoology",
        institution: "Wits University",
    },
    {
        id: "climate",
        title: "Ecosystem Climate Resilience",
        subtitle: "Predictive Impact Assessment",
        categoryBadge: "Climate",
        image: climateChange,
        description:
            "Investigating the long-term impacts of climate change on local ecosystems and developing strategies for environmental resilience.",
        skills: ["Climate Science", "Data Modelling", "Impact Assessment"],
        link: "/projects/articles/climate-change-gci",
        institution: "Wits University",
    },
    {
        id: "sustainability",
        title: "Resource Sustainability",
        subtitle: "Environmental Preservation Policy",
        categoryBadge: "Policy",
        image: sustainability,
        description:
            "Researched sustainable development practices to balance economic growth with environmental preservation.",
        skills: ["Sustainability", "Policy Analysis", "Green Tech"],
        link: "/projects/articles/sustainable-development",
        institution: "Wits University",
    },
];

export const allFieldworkProjects: FieldworkProjectItem[] = [
    {
        id: "laduma-tracking",
        title: "Caracal Movement Ecology",
        subtitle: "Cape Town Fynbos • GPS Telemetry",
        locationBadge: "Cape Town",
        image: ladumaTracking,
        description:
            "Mapped the movement patterns of Laduma, a Cape caracal, using GPS collar telemetry data to analyse spatial ecology and habitat use in South African fynbos.",
        skills: ["GIS Analysis", "Telemetry", "Movement Ecology"],
        link: "/projects/articles/caracal-movement-ecology",
        articleSlug: "caracal-movement-ecology",
        articles: [
            { slug: "caracal-movement-ecology", title: "GPS Telemetry & Movement Ecology of the Cape Caracal" },
        ],
        institution: "Wits University",
    },
    {
        id: "limpopo",
        title: "Limpopo Land Mapping",
        subtitle: "Community Resource Stewardship",
        locationBadge: "Limpopo",
        image: limpopoConservation,
        description:
            "Mapped natural resource usage by local communities and documented waste disposal practices to inform conservation land management strategies.",
        skills: ["Community Research", "GIS Mapping", "Conservation"],
        link: "/projects/articles/limpopo-conservation",
        institution: "Wits University",
    },
    {
        id: "johannesburg-stream",
        title: "Stream Bio-Assessment",
        subtitle: "Urban Aquatic Ecosystems",
        locationBadge: "Johannesburg",
        image: riverResearch,
        description:
            "Collected water samples and aquatic organisms to assess ecosystem health via pH levels and water quality parameters.",
        skills: ["Water Quality", "Data Collection", "Ecology"],
        link: "/projects/articles/johannesburg-stream-ecology",
        institution: "Wits University",
    },
    {
        id: "climate-fieldwork",
        title: "Grassland Transects",
        subtitle: "Highveld Long-Term Monitoring",
        locationBadge: "Highveld",
        image: grasslandTransects,
        description:
            "Field transect documentation and long-term environmental observation assessing ecosystem shifts and climate resilience factors.",
        skills: ["Transect Sampling", "Ecosystem Monitoring", "Field Observation"],
        link: "/projects/articles/grassland-transects",
        institution: "Wits University",
    },
    {
        id: "sustainability-fieldwork",
        title: "Coastal Resource Auditing",
        subtitle: "Conservation Policy Compliance",
        locationBadge: "KZN Coast",
        image: coastalResourceAuditing,
        description:
            "Field assessments evaluating balance between local economic resource usage and environmental preservation guidelines.",
        skills: ["Resource Auditing", "Environmental Policy", "Sustainable Use"],
        link: "/projects/articles/coastal-resource-auditing",
        institution: "Wits / UKZN",
    },
];
