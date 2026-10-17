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
        data?: unknown;
    };
}

// Import hero images
import marineConservation from "@/assets/marine-conservation.webp";
import comparativeBiochemistry from "@/assets/comparative-biochemistry.webp";
import limpopoConservationStudy from "@/assets/limpopo-conservation-study.webp";
import riverResearch from "@/assets/river-research.webp";
import dnaForensics from "@/assets/dna-forensics.webp";
import africanZoologyImg from "@/assets/african-zoology.webp";
import labDemonstratorImg from "@/assets/lab-demonstrator.webp";
import climateChangeResearchImg from "@/assets/climate-change-research.webp";
import projectSustainabilityImg from "@/assets/project-sustainability.webp";
import grasslandTransectsImg from "@/assets/grassland-transects.webp";
import coastalResourceAuditingImg from "@/assets/coastal-resource-auditing.webp";
import ladumaTracking from "@/assets/laduma-tracking.webp";

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
    },
    {
        id: "limpopo-conservation",
        slug: "limpopo-conservation",
        title: "People & Protected Areas: Resource Mapping in Limpopo",
        subtitle: "Spatial Analysis of Community Natural Resource Extraction & Land Use Buffers",
        readTime: "4 min",
        category: "Conservation Biology",
        categoryColor: "emerald",
        heroImage: limpopoConservationStudy,
        tldr: [
            "Participatory GIS mapped 140km² of communal resource harvesting zones adjacent to provincial nature reserves",
            "Woody biomass extraction and grazing pressures concentrate within a 4.5km perimeter of reserve boundary fences",
            "Co-management frameworks combining sustainable quota harvesting with buffer agroforestry reduce fence breaches by 68%"
        ],
        sections: [
            {
                heading: "The Challenge of Fortress Conservation",
                content: "In South Africa's Limpopo Province, historical protected area boundaries often established hard divides between state reserves and rural communal lands. This study evaluated how peripheral villages interact with reserve resources, tracking fuel wood harvesting, indigenous medicine collection, and cattle grazing using GPS-tagged participatory spatial mapping."
            },
            {
                heading: "Spatial Patterns of Extraction",
                content: "Data revealed that natural resource harvesting follows distinct elevational and riparian contours rather than uniform radii. Riparian buffer zones experienced 3.4x higher extraction pressure than open savannas, primarily for traditional medicinal plants and building materials. Identifying these extraction corridors allows conservation managers to target enrichment planting and community nurseries where they are most urgently needed."
            },
            {
                heading: "Sustainable Stewardship Frameworks",
                content: "Rather than punitive anti-access policing, the research demonstrated that community-led resource monitoring committees yielded superior ecological and social outcomes. By formalizing seasonal harvesting quotas and establishing community-managed firewood collection plots, habitat degradation within the reserve core was halted while maintaining community livelihoods."
            }
        ],
        relatedProjects: ["limpopo"]
    },
    {
        id: "johannesburg-stream-ecology",
        slug: "johannesburg-stream-ecology",
        title: "Urban Limnology & Macroinvertebrate Water Quality Indicators",
        subtitle: "Assessing Riparian Ecosystem Health Across Urbanisation Gradients in Gauteng",
        readTime: "4 min",
        category: "Freshwater Ecology",
        categoryColor: "blue",
        heroImage: riverResearch,
        tldr: [
            "Benthic macroinvertebrate diversity drops by 74% below industrial stormwater discharge points in the Jukskei drainage",
            "Dissolved oxygen levels (<3.2 mg/L) and elevated electrical conductivity (>850 µS/cm) drive the loss of Ephemeroptera and Trichoptera",
            "Constructed reedbed wetland patches restore water quality indices by up to 42% over a 1.2km downstream reach"
        ],
        sections: [
            {
                heading: "The Pulse of Urban Streams",
                content: "Urban freshwater streams in Gauteng face cumulative pressures from impermeable surface runoff, wastewater treatment overflows, and channelisation. This field investigation sampled 18 stream reaches across the Witwatersrand basin to evaluate biological water quality using the South African Scoring System (SASS5) protocol and physical water chemistry."
            },
            {
                heading: "Bio-Indicators vs Chemical Snapshots",
                content: "While chemical spot samples often miss intermittent pollution spikes, benthic macroinvertebrate assemblages provide an integrated record of environmental stress. Sensitive taxa such as Baetidae (mayflies) and Leptoceridae (caddisflies) were completely eliminated below industrial stormwater outlets, replaced exclusively by pollution-tolerant Chironomidae (bloodworms) and Oligochaeta (tubificid worms)."
            },
            {
                heading: "Restoration Pathways",
                content: "The findings underscore the immense ecological value of daylit stream corridors and natural riparian buffers. Reaches with intact Typha capensis and Phragmites australis reedbeds significantly attenuated heavy metal concentrations and buffered pH fluctuations, demonstrating that low-cost urban rewilding can revitalise municipal waterways."
            }
        ],
        relatedProjects: ["johannesburg-stream"]
    },
    {
        id: "forensics-genetics",
        slug: "forensics-genetics",
        title: "DNA Typing & Capillary Electrophoresis in Wildlife Forensics",
        subtitle: "Short Tandem Repeat (STR) Profiling and Cytochrome b Barcoding for Conservation Law",
        readTime: "5 min",
        category: "Forensic Genetics",
        categoryColor: "pink",
        heroImage: dnaForensics,
        tldr: [
            "Mitochondrial cytochrome b (cyt-b) sequencing reliably identifies illicitly trafficked wildlife derivatives to species level",
            "Capillary electrophoresis resolves multi-locus STR profiles from degraded biological samples with 99.4% discriminatory power",
            "Validated molecular protocols provide evidentiary standards required for anti-poaching judicial convictions under TOPS regulations"
        ],
        sections: [
            {
                heading: "The Molecular Battle Against Wildlife Crime",
                content: "Combating illegal wildlife trafficking requires definitive, courtroom-admissible evidence. In South Africa, poached biological material is frequently processed, deshelled, or powdered to evade customs inspection. This research evaluated forensic molecular protocols at the Wits Oppenheimer Life Sciences laboratories to identify seized biological exhibits."
            },
            {
                heading: "Methodological Pipeline",
                content: "The analytical workflow paired universal vertebrate primer sets for the mitochondrial cytochrome b gene with species-specific Short Tandem Repeat (STR) multiplexes. High-resolution capillary electrophoresis enabled allele calling from minute, heat-degraded DNA samples (<0.5 ng/µL), distinguishing endangered indigenous species from domestic substitutes with definitive statistical significance (p < 0.0001)."
            },
            {
                heading: "Bridging the Bench to the Courtroom",
                content: "Beyond PCR optimisation, the research established rigorous chain-of-custody contamination protocols compliant with ISO 17025 standards. By bridging genomic laboratory science with South African statutory requirements under the National Environmental Management: Biodiversity Act (NEMBA), forensic geneticists provide law enforcement with unassailable prosecution tools."
            }
        ],
        relatedProjects: ["forensics"]
    },
    {
        id: "african-zoology",
        slug: "african-zoology",
        title: "Functional Morphometrics & Vertebrate Thermal Niches",
        subtitle: "Ecological Adaptations of Terrestrial Vertebrates to Southern African Climate Extremes",
        readTime: "4 min",
        category: "Vertebrate Zoology",
        categoryColor: "amber",
        heroImage: africanZoologyImg,
        tldr: [
            "Morphological trait scaling predicts behavioural thermoregulation efficacy across 34 terrestrial vertebrate taxa",
            "Endothermic species in arid savanna biomes face critical metabolic overheads as daytime temperatures exceed 38°C",
            "Microhabitat shelter availability (subterranean burrows, dense canopy) mediates climate resilience more strongly than body mass alone"
        ],
        sections: [
            {
                heading: "Living on the Thermal Frontier",
                content: "Southern Africa's arid and semi-arid savannas exhibit some of the most pronounced diurnal temperature fluctuations on Earth. This comparative zoological study investigated how terrestrial African vertebrates balance water conservation, foraging efficiency, and core body temperature regulation under escalating warming trends."
            },
            {
                heading: "Morphological Scaling & Behavioural Buffers",
                content: "Using morphometric data and behavioural focal sampling, the study demonstrated that species relying solely on physiological heat dissipation (e.g., panting or sweating) suffer significant evaporative water loss. Conversely, species utilising morphological heat radiators (e.g., vascularised ear pinnae) and behavioural micro-refugia (rock crevices, aardvark burrows) maintain thermal equilibrium with 45% less metabolic expenditure."
            },
            {
                heading: "Conservation Management Implications",
                content: "As heatwaves intensify across the Kalahari and Kruger ecosystems, preserving structural habitat complexity is essential. Protected area managers must maintain diverse vegetation canopies and protect ecosystem engineers like aardvarks that create crucial subterranean thermal refuges for dozens of dependent vertebrate species."
            }
        ],
        relatedProjects: ["zoology"]
    },
    {
        id: "lab-demonstrator",
        slug: "lab-demonstrator",
        title: "Pedagogical Frameworks in Undergraduate Bioscience Teaching",
        subtitle: "Active Learning, Mentorship, and Practical Laboratory Skills Acquisition at Wits",
        readTime: "3 min",
        category: "Bioscience Education",
        categoryColor: "amber",
        heroImage: labDemonstratorImg,
        tldr: [
            "Inquiry-based laboratory practicals improved student conceptual mastery by 28% compared to traditional cookbook protocols",
            "Hands-on mentorship in pipetting, microscopy, and data visualisation closes equity gaps in foundational STEM training",
            "Standardised peer-evaluation rubrics accelerate grading turnarounds while boosting student self-efficacy in biological experimental design"
        ],
        sections: [
            {
                heading: "Transforming the University Teaching Lab",
                content: "Undergraduate laboratory practicals in cellular biology, genetics, and physiology represent the crucible where theoretical textbook concepts transform into empirical scientific practice. Serving as a Senior Lab Demonstrator at the University of the Witwatersrand, this work developed and evaluated student-centred teaching methodologies for first- and second-year bioscience cohorts."
            },
            {
                heading: "From Passive Observation to Active Inquiry",
                content: "Transitioning from rigid step-by-step instructions to hypothesis-driven experimental design motivated students to troubleshoot anomalous results, analyse statistical error bars, and engage critically with biological data. Demonstrator-led guided inquiry sessions fostered peer collaboration and dramatically reduced laboratory execution anxiety."
            },
            {
                heading: "Mentorship & Scientific Identity",
                content: "Mentorship in bioscience education extends beyond marking lab reports. By demystifying bioinformatics software, statistical coding in R, and precision microscopy techniques, demonstrator guidance empowers students from diverse educational backgrounds to envision themselves as practising biological researchers."
            }
        ],
        relatedProjects: ["demonstrator"]
    },
    {
        id: "climate-change-gci",
        slug: "climate-change-gci",
        title: "Long-Term Biome Transition Models at the Global Change Institute",
        subtitle: "Coupled Climate-Vegetation Dynamics & Aridity Shifts Across Southern Africa",
        readTime: "4 min",
        category: "Climate Science",
        categoryColor: "cyan",
        heroImage: climateChangeResearchImg,
        tldr: [
            "CMIP6 ensemble projections indicate a 2.5°C to 4.2°C temperature rise across interior Southern Africa by 2070",
            "Savanna woody encroachment accelerates in eastern sectors while western biomes experience severe aridification",
            "Integrated socio-ecological vulnerability models highlight critical climate intervention zones along the Drakensberg escarpment"
        ],
        sections: [
            {
                heading: "Southern Africa's Climate Trajectory",
                content: "Southern Africa is warming at roughly twice the global average rate. At the Wits Global Change Institute (GCI), researchers model how escalating temperatures, altered precipitation regimes, and rising atmospheric CO₂ concentrations interact to reshape southern African biomes over multi-decadal time horizons."
            },
            {
                heading: "Biome Shifts & Carbon Dynamics",
                content: "The modelling reveals contrasting regional trajectories: elevated CO₂ fertilisation combined with altered fire regimes fuels woody plant encroachment in mesic savannas, reducing pastoral grazing capacity. In contrast, the succulent Karoo and western grassland ecotones face devastating desertification as winter rainfall systems shift poleward."
            },
            {
                heading: "Policy-Ready Climate Projections",
                content: "The ultimate value of climate modelling lies in informing national adaptation policy. GCI's spatial outputs directly feed into South Africa's National Climate Change Adaptation Strategy, prioritising catchment management in high-yield water source areas and guiding strategic conservation corridor design."
            }
        ],
        relatedProjects: ["climate"]
    },
    {
        id: "sustainable-development",
        slug: "sustainable-development",
        title: "Balancing Biodiversity Corridors with Economic Expansion",
        subtitle: "Spatial Multi-Criteria Evaluation for Green Infrastructure in Developing Regions",
        readTime: "4 min",
        category: "Sustainability Policy",
        categoryColor: "cyan",
        heroImage: projectSustainabilityImg,
        tldr: [
            "Spatial multi-criteria evaluation (SMCE) identifies optimal conservation corridors that minimise industrial conflict by 54%",
            "Ecosystem service valuation demonstrates that intact wetlands provide R12.4M/year in natural municipal flood attenuation",
            "Integrating ecological network topology into urban spatial development frameworks prevents habitat fragmentation"
        ],
        sections: [
            {
                heading: "The Development-Conservation Dilemma",
                content: "Rapid industrial and infrastructure expansion often collides with critical biodiversity priority areas. Conducted through the Wits School of Geography, Archaeology and Environmental Studies, this research utilised GIS-based Spatial Multi-Criteria Evaluation (SMCE) to map high-value ecological corridors that coexist harmoniously with planned economic growth nodes."
            },
            {
                heading: "Quantifying Natural Capital",
                content: "By applying ecosystem service accounting to municipal catchments, the research quantified the monetary value of intact ecological infrastructure. Natural wetlands, riparian buffers, and indigenous forest patches delivered substantial stormwater filtration and carbon sequestration services that far outweighed the engineering costs of artificial municipal infrastructure."
            },
            {
                heading: "Actionable Spatial Planning Tools",
                content: "The resulting spatial decision-support tools enable municipal town planners and provincial authorities to evaluate development applications objectively, ensuring that critical wildlife movement corridors and ecological buffer zones remain inviolate while directing commercial investments to low-impact parcels."
            }
        ],
        relatedProjects: ["sustainability"]
    },
    {
        id: "grassland-transects",
        slug: "grassland-transects",
        title: "Highveld Grassland Phenology & Fire-Regime Monitoring",
        subtitle: "Long-Term Transect Assessments of Floristic Diversity and Pyrodiversity in Gauteng",
        readTime: "4 min",
        category: "Grassland Ecology",
        categoryColor: "emerald",
        heroImage: grasslandTransectsImg,
        tldr: [
            "Highveld grassland plots subject to biennial winter burns maintain 3.2x higher geophyte and forb richness than unburnt plots",
            "Alien invasive grasses (e.g., Pennisetum clandestinum) expand rapidly when historical fire intervals exceed 4 years",
            "Permanent botanical transects provide early warning indicators of climate-driven phenological shifts in flowering onset"
        ],
        sections: [
            {
                heading: "The Misunderstood Grassland Biome",
                content: "Grasslands are among the oldest, most biodiverse, yet most threatened biomes in South Africa. Covering the Highveld plateau, these ancient ecosystems host immense belowground phytomass and hundreds of specialised endemic forb species that rely on regular fire and grazing disturbances to persist."
            },
            {
                heading: "Transect Sampling Methodology",
                content: "Using standardised 100m belt transects and nested 1m² quadrats across Gauteng conservation reserves, researchers tracked species composition, basal vegetation cover, and flowering phenology across varying fire return intervals. Plots subjected to controlled biennial fires exhibited vibrant geophyte diversity, whereas fire-excluded plots suffered severe moribund thatch accumulation and woody encroachment."
            },
            {
                heading: "Grassland Management Guidelines",
                content: "The research demonstrates that complete fire suppression is ecologically catastrophic for Highveld grasslands. Reserve managers must implement mosaic patch burning regimes that simulate natural lightning ignitions, preserving structural heterogeneity and sustaining critical habitat for threatened grassland specialists."
            }
        ],
        relatedProjects: ["climate-fieldwork"]
    },
    {
        id: "coastal-resource-auditing",
        slug: "coastal-resource-auditing",
        title: "Intertidal Biosphere Protection & Subsistence Harvesting Policy",
        subtitle: "Field Auditing of Mussel and Limpet Stocks Along the KwaZulu-Natal Coastline",
        readTime: "4 min",
        category: "Marine Governance",
        categoryColor: "blue",
        heroImage: coastalResourceAuditingImg,
        tldr: [
            "Intertidal rocky shore transects revealed severe localised depletion of Perna perna (brown mussel) stocks near urban access points",
            "Rotational harvesting zones established with artisanal subsistence fisher communities allowed biomass recovery within 18 months",
            "Community-based coastal monitors achieved 92% compliance with size limits compared to 34% under conventional enforcement"
        ],
        sections: [
            {
                heading: "The Pressure on Rocky Shores",
                content: "KwaZulu-Natal's rocky intertidal zone provides an essential protein source for vulnerable coastal communities while supporting unique marine biodiversity. This field auditing research evaluated the sustainability of subsistence harvesting of brown mussels (Perna perna) and limpets across multiple coastal reserves and open-access shores."
            },
            {
                heading: "Stock Assessment Protocols",
                content: "Researchers deployed perpendicular intertidal transects spanning low to high water spring tidal zones, recording population size frequencies, percentage shell cover, and recruitment pulses. Open-access shores displayed severe recruitment bottlenecks with average shell lengths under 45mm, whereas co-managed reserves maintained healthy reproductive populations exceeding 70mm."
            },
            {
                heading: "Community Co-Management Success",
                content: "The findings demonstrated that participatory coastal governance succeeds where top-down exclusion fails. By training local subsistence harvesters as coastal monitors and implementing rotating closed seasons across designated reef sections, mussel beds recovered reproductive resilience while guaranteeing food security."
            }
        ],
        relatedProjects: ["sustainability-fieldwork"]
    },
    {
        id: "caracal-telemetry",
        slug: "caracal-movement-ecology",
        title: "GPS Telemetry & Movement Ecology of the Cape Caracal (Caracal caracal)",
        subtitle: "Spatial Utilisation, Home Range Dynamics, and Urban-Edge Avoidance in Table Mountain National Park",
        readTime: "4 min",
        category: "Wildlife Telemetry",
        categoryColor: "emerald",
        heroImage: ladumaTracking,
        tldr: [
            "Over 1,749 high-resolution GPS collar locations analysed for 'Laduma', an adult caracal navigating Cape Town's urban-fynbos matrix",
            "Kernel density estimation revealed a core home range of ~12 km² centred along the Table Mountain chain and Tokai forest",
            "Severe avoidance of high-traffic transit corridors and dense suburban developments, with movement concentrated during nocturnal windows"
        ],
        sections: [
            {
                heading: "The Urban Predator Dilemma",
                content: "Apex and mesopredators in urban-adjacent ecosystems face extreme spatial constraints. In the Cape Peninsula, Table Mountain National Park is almost completely surrounded by the dense metropolitan sprawl of Cape Town. This study examines how 'Laduma', an adult male caracal (Caracal caracal), navigates this fragmented landscape, establishing territories, foraging, and avoiding anthropogenic mortality risks across fynbos, pine plantations, and urban edges."
            },
            {
                heading: "High-Resolution GPS Telemetry",
                content: "Using an automated GPS/VHF tracking collar deployed in collaboration with the Urban Caracal Project, 1,749 spatial fixes were recorded at calibrated hourly intervals. Trajectory vectors and speed profiles were computed using R's adehabitatHR and move packages, allowing rigorous spatial clustering into three core behavioural zones: southern Constantia slopes, western Hout Bay valleys, and the Tokai forestry plantation interface."
            },
            {
                heading: "Home Range & Barrier Permeability",
                content: "Minimum Convex Polygon (MCP 95%) and fixed kernel density analyses determined a total utilised home range of approximately 12.4 km². Movement tracks revealed profound behavioural adaptations: the animal crossed arterial roads almost exclusively between 01:00 and 04:30 AM, heavily utilising dense riparian ravines and greenbelts as movement conduits to bypass residential neighbourhoods."
            },
            {
                heading: "Ecological Implications & Management",
                content: "The findings demonstrate that small carnivores can persist on urban fringes only if functional ecological corridors are maintained. Key management recommendations include preserving natural vegetation buffers along golf courses and wine estates, installing wildlife underpasses at critical road-crossing hotspots, and curbing rodenticide use which poses a severe secondary poisoning threat across the peninsula."
            }
        ],
        relatedProjects: ["laduma-tracking"]
    }
];

export const getArticleBySlug = (slug: string): Article | undefined => {
    return articles.find(article => article.slug === slug);
};
