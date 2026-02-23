// Article data for academic papers
// Each article is ~800 words for a 4-minute read

export interface Article {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    readTime: string;
    category: string;
    categoryColor: string;
    heroImage: string;
    tldr: string[];
    sections: ArticleSection[];
    relatedProjects: string[];
}

interface ArticleSection {
    heading: string;
    content: string;
    visual?: {
        type: "chart" | "diagram" | "image";
        src?: string;
        caption: string;
        data?: any;
    };
}

// Import hero images
import marineConservation from "@/assets/marine-conservation.webp";
import comparativeBiochemistry from "@/assets/comparative-biochemistry.webp";

// Import media files for article sections
import fishingPoachingImpacts from "@/assets/fishing-poaching-impacts.mp4";
import bodySizeMasterTrait from "@/assets/body-size-master-trait.webp";
import altitudeAdaptation from "@/assets/altitude-adaptation.webp";
import trophicLevels from "@/assets/trophic-levels.webp";

export const articles: Article[] = [
    {
        id: "fishing-poaching",
        slug: "fishing-poaching-impacts",
        title: "Can Reducing Fishing Pressure Save Our Seafloors?",
        subtitle: "Modelling the Impact of Commercial Fishery Reductions on Thukela Bank Ecosystems",
        readTime: "4 min",
        category: "Marine Conservation",
        categoryColor: "emerald",
        heroImage: marineConservation,
        tldr: [
            "Commercial line fishing contributes only 4.5% of total catch pressure in the Thukela Bank ecosystem",
            "Reducing this single fishery had minimal impact on macrobenthic (seafloor) community biomass",
            "Effective marine protection requires addressing all fishing activities holistically, not just one sector"
        ],
        sections: [
            {
                heading: "The Question",
                content: "When we create Marine Protected Areas, we often focus on stopping specific fishing activities. But does reducing one type of fishing actually help bottom-dwelling marine life recover? This study used the Thukela Bank ecosystem model to test what happens when we gradually eliminate commercial line fishing, from full activity to 50% reduction to complete cessation simulating MPA establishment."
            },
            {
                heading: "The Approach",
                content: "Using Ecopath with Ecosim modelling, we simulated 50 years (1990-2040) of ecosystem dynamics. Fishing effort was reduced in phases: historical levels until 2008, 50% reduction (2009-2014), 25% reduction (2014-2019), then zero from 2019 to simulate the Thukela Marine Protected Area. We tracked biomass changes in key macrobenthic groups: cephalopods, prawns, crustaceans, and benthic organisms.",
                visual: {
                    type: "chart",
                    src: fishingPoachingImpacts,
                    caption: "Fishing effort reduction timeline showing graduated decline from 2009 to complete cessation in 2019"
                }
            },
            {
                heading: "The Surprising Result",
                content: "Despite eliminating commercial line fishing entirely, macrobenthic biomass barely changed. The reason? This fishery catches only 0.031 t/km²/year, just 4.5% of total fishing pressure. More critically, the species targeted (large pelagics, small pelagics) have weak food web connections to bottom-dwelling organisms. The commercial line fishery simply does not interact strongly enough with macrobenthic communities to drive their recovery."
            },
            {
                heading: "Conservation Implications",
                content: "The findings deliver a sobering but important message: single-fishery management will not save seafloor ecosystems. Managers must adopt ecosystem-based approaches that consider cumulative impacts from all fishing activities. This study also highlights the critical need for better poaching data. Unquantified illegal fishing may represent a hidden pressure that models cannot capture. Effective protection of the Thukela MPA requires understanding and managing the full spectrum of human impacts, not just the most visible ones."
            }
        ],
        relatedProjects: ["marine"]
    },
    {
        id: "body-size",
        slug: "body-size-master-trait",
        title: "Why Size Matters: The Master Trait of Ocean Life",
        subtitle: "How Body Size Shapes Everything from Metabolism to Extinction Risk",
        readTime: "4 min",
        category: "Marine Ecology",
        categoryColor: "blue",
        heroImage: marineConservation,
        tldr: [
            "Body size predicts metabolic rate, diet, distribution, and extinction vulnerability in marine species",
            "Warming oceans are selecting for smaller body sizes, following the 'Ghost of Oxygen Limitation Past' hypothesis",
            "Human fishing preferentially removes large individuals, destabilizing food web structure and ecosystem resilience"
        ],
        sections: [
            {
                heading: "The Universal Currency",
                content: "In marine ecosystems, body size is not just a measurement. It is a master trait that determines almost everything about an organism's life. Larger animals occupy higher trophic levels, require more oxygen, and face stricter thermal constraints. The ocean's inverted biomass pyramid means larger organisms dominate total biomass despite being numerically rare, while tiny organisms drive the majority of productivity."
            },
            {
                heading: "The Temperature-Size Rule",
                content: "Poikilothermic marine species (most ocean life) obey a fundamental rule: optimal body size decreases as temperature increases. This occurs because warmer water holds less dissolved oxygen (Henry's Law), and larger bodies require disproportionately more oxygen. Bergmann's Rule emerges from this constraint. We see smaller fiddler crabs in warm Brazilian waters and larger specimens in cool Argentine waters. As oceans warm, we predict widespread body size reductions.",
                visual: {
                    type: "diagram",
                    src: bodySizeMasterTrait,
                    caption: "Relationship between body size, temperature, and oxygen availability across marine latitudes"
                }
            },
            {
                heading: "Evolutionary Implications",
                content: "The 'Ghost of Oxygen Limitation Past' hypothesis suggests that past selection pressures have already shaped genotypes that reduce body size in warming conditions, even before oxygen becomes directly limiting. This explains why warming oceans show increasing proportions of small-bodied species. Larger organisms are more vulnerable to extinction: they require more time to recover from population losses, have higher energy demands, and lower reproductive output."
            },
            {
                heading: "Human Disruption",
                content: "We are actively shrinking the ocean's giants. Size-selective fishing removes the largest individuals first, truncating population size structures and reducing genetic diversity. Combined with climate-driven size reductions, this creates a dangerous feedback loop. Conservation strategies must prioritise maintaining size diversity. Protecting large-bodied species is not just about individual species survival. It is about preserving the structural integrity of marine food webs that have evolved over millions of years."
            }
        ],
        relatedProjects: ["marine"]
    },
    {
        id: "altitude-adaptation",
        slug: "altitude-adaptation",
        title: "Three Ways to Breathe Thin Air",
        subtitle: "How Tibetan, Andean, and Ethiopian Highlanders Evolved Different Solutions to the Same Problem",
        readTime: "4 min",
        category: "Physiology",
        categoryColor: "purple",
        heroImage: comparativeBiochemistry,
        tldr: [
            "Tibetans inherited EPAS1 gene variants from Denisovans that dampen the erythropoietic response to hypoxia",
            "Andeans compensate through elevated haemoglobin and enlarged lung capacity, a costly strategy that causes mountain sickness in old age",
            "Ethiopians maintain near-normal oxygen saturation through metabolic efficiency adaptations that remain poorly understood"
        ],
        sections: [
            {
                heading: "The Oxygen Challenge",
                content: "Above 2,500 meters, oxygen partial pressure drops significantly, threatening cellular energy production. Yet three populations have thrived for millennia at extreme altitudes: Tibetans (up to 5,450m for 40,000+ years), Andeans (4,000m for 11,000 years), and Ethiopian highlanders (3,500m for 5,000+ years). Remarkably, each evolved completely different solutions to the same physiological challenge."
            },
            {
                heading: "The Tibetan Solution: Ancient Genetic Gifts",
                content: "Tibetans carry EPAS1 gene variants inherited from Denisovan ancestors roughly 48,000 years ago. These variants reduce HIF-2α transcription, blunting the EPO response that normally triggers red blood cell production. Combined with EGLN1 variants that enhance HIF degradation, Tibetans avoid the dangerous blood thickening seen in other populations at altitude. Instead, they maintain elevated nitric oxide levels for enhanced vasodilation and oxygen uptake.",
                visual: {
                    type: "diagram",
                    src: altitudeAdaptation,
                    caption: "The HIF oxygen-sensing pathway showing Tibetan-specific modifications to EPAS1 and EGLN1"
                }
            },
            {
                heading: "The Andean Compromise",
                content: "Andean highlanders took a different path: they maintain chronically elevated haemoglobin (17-19 g/dL) and developed enlarged thoracic cavities for greater lung capacity. This compensatory strategy works but comes at a cost. Many Andean elders develop chronic mountain sickness as their bodies can no longer maintain the energetically expensive compensatory systems. Their adaptation represents a survival compromise rather than true optimisation."
            },
            {
                heading: "The Ethiopian Mystery",
                content: "Ethiopian highlanders present the most puzzling adaptation. Despite living at 3,530m, they maintain near-sea-level haemoglobin concentrations and arterial oxygen saturation. Recent genetic studies point to CBARA1/MICU1, genes involved in mitochondrial calcium regulation, suggesting adaptations that enhance cellular metabolic efficiency rather than oxygen delivery. This population remains understudied due to limited genomic databases for African populations, representing a critical gap in our understanding of human adaptability."
            }
        ],
        relatedProjects: ["climate"]
    },
    {
        id: "trophic-levels",
        slug: "trophic-levels",
        title: "Who Eats What? Decoding Estuarine Food Webs",
        subtitle: "How Effective Trophic Levels Reveal Hidden Feeding Strategies",
        readTime: "3 min",
        category: "Ecosystem Science",
        categoryColor: "teal",
        heroImage: marineConservation,
        tldr: [
            "Fish consistently occupy higher effective trophic levels (3.44) than macroinvertebrates (2.64) across four estuaries",
            "Macroinvertebrates function as opportunistic feeders connecting multiple trophic levels",
            "Traditional integer trophic levels mask significant variation in feeding strategies within the same consumer category"
        ],
        sections: [
            {
                heading: "Beyond Simple Food Chains",
                content: "Traditional food web models assign organisms to discrete trophic levels: producers (TL1), primary consumers (TL2), secondary consumers (TL3). But real feeding relationships are messier. Effective Trophic Level (ETL) analysis captures this complexity by calculating weighted averages based on actual diet composition. This study compared ETL patterns across four estuarine systems: Chesapeake Bay, Mondego Estuary, Narragansett Bay, and St. Marks."
            },
            {
                heading: "The Analysis",
                content: "Using ecological network analysis in R, we calculated ETL values for fish and macroinvertebrate species across all four estuaries. Two-way ANOVA revealed highly significant differences (p < 0.001) between taxonomic categories, with fish averaging ETL 3.44 compared to macroinvertebrates at 2.64. Site differences were also significant, but no interaction between site and category existed.",
                visual: {
                    type: "chart",
                    src: trophicLevels,
                    caption: "Mean effective trophic levels for fish vs macroinvertebrates across four estuarine ecosystems"
                }
            },
            {
                heading: "Feeding Strategy Insights",
                content: "The ETL gap reveals fundamentally different ecological roles. Macroinvertebrates function as omnivorous generalists. Their lower ETL reflects feeding across multiple trophic levels, from detritus to smaller invertebrates. Fish, despite also being 'secondary consumers,' show more specialised feeding at higher trophic positions. This distinction matters: macroinvertebrates serve as flexible trophic connectors stabilising food webs, while fish drive more directed energy pathways."
            },
            {
                heading: "Ecosystem Implications",
                content: "Understanding ETL patterns helps predict how disturbances cascade through estuarine food webs. The Mondego Estuary showed significantly different patterns from other sites (Tukey's test p < 0.001), suggesting ecosystem-specific dynamics that require tailored management. Traditional trophic level classifications miss these nuances. ETL analysis provides the resolution needed for ecosystem-based management."
            }
        ],
        relatedProjects: ["marine"]
    }
];

export const getArticleBySlug = (slug: string): Article | undefined => {
    return articles.find(article => article.slug === slug);
};
