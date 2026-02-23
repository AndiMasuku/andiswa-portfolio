import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Droplets, Users, Anchor, Navigation as NavIcon, Leaf, CloudSun, Microscope, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, SITE_URL, toAbsoluteUrl } from "@/lib/seo";
import Navigation from "@/components/Navigation";

// Import images
import thesisImage from "@/assets/thesis-research.webp";
import ladumaTracking from "@/assets/laduma-tracking.webp";
import marineConservation from "@/assets/marine-conservation.webp";
import dnaForensics from "@/assets/dna-forensics.webp";
import africanZoology from "@/assets/african-zoology.webp";
import labDemonstrator from "@/assets/lab-demonstrator.webp";
import riverResearch from "@/assets/river-research.webp";
import climateChange from "@/assets/climate-change-research.webp";
import sustainability from "@/assets/project-sustainability.webp";
import limpopoConservation from "@/assets/limpopo-conservation-study.webp";
import comparativeBiochemistry from "@/assets/comparative-biochemistry.webp";

const fieldworkProjects = [
  {
    id: "limpopo",
    title: "Limpopo Conservation Study",
    subtitle: "People & Conservation",
    image: limpopoConservation,
    description: "Mapped natural resource usage by local communities and documented waste disposal practices to inform conservation land management strategies.",
    skills: ["Community Research", "GIS Mapping", "Conservation"],
    icon: <MapPin size={20} className="text-accent" />,
  },
  {
    id: "johannesburg-stream",
    title: "Johannesburg Stream Ecology",
    subtitle: "Ecosystem Assessment",
    image: riverResearch,
    description: "Collected water samples and aquatic organisms to assess ecosystem health via pH levels and water quality parameters.",
    skills: ["Water Quality", "Data Collection", "Ecology"],
    icon: <Droplets size={20} className="text-accent" />,
  },
  {
    id: "laduma-tracking",
    title: "Movement Ecology of Laduma",
    subtitle: "GPS Telemetry & GIS",
    image: ladumaTracking,
    description: "Mapped the movement patterns of Laduma, a Cape caracal, using GPS collar telemetry data to analyze spatial ecology and habitat use in South African fynbos.",
    skills: ["GIS Analysis", "Telemetry", "Movement Ecology"],
    icon: <NavIcon size={20} className="text-accent" />,
    link: "/projects/projects-map",
  },
];

const researchAreas = [
  {
    id: "honours-thesis",
    title: "Honours Thesis",
    subtitle: "Insect Protein Fortification",
    image: thesisImage, // Make sure to import this if not already present, or use a placeholder
    description: "Developed nutrient-rich bread fortified with edible termite (Termitomyces) and mopane worm (Gonimbrasia belina) meals, investigating their viability as sustainable protein sources to combat malnutrition.",
    skills: ["Food Development", "Lab Analysis", "R Programming"],
    icon: <Microscope size={20} className="text-accent" />,
    link: "/projects/thesis"
  },
  {
    id: "marine",
    title: "Marine Conservation",
    subtitle: "Fishing & Poaching Impacts",
    image: marineConservation,
    description: "Analysed the effects of reduced fishing and poaching on marine ecosystem recovery and biodiversity in protected areas.",
    skills: ["Marine Ecology", "Conservation", "Data Analysis"],
    icon: <Anchor size={20} className="text-accent" />,
    articles: [
      { slug: "fishing-poaching-impacts", title: "Can Reducing Fishing Pressure Save Our Seafloors?" },
      { slug: "body-size-master-trait", title: "Why Size Matters: The Master Trait of Ocean Life" },
      { slug: "trophic-levels", title: "Who Eats What? Decoding Estuarine Food Webs" },
    ],
  },
  {
    id: "forensics",
    title: "Forensics & Genetics",
    subtitle: "DNA Typing & Analysis",
    image: dnaForensics,
    description: "DNA typing in forensic investigation and forensic genetics analysis and interpretation techniques.",
    skills: ["DNA Analysis", "Gel Electrophoresis", "Forensics"],
  },
  {
    id: "zoology",
    title: "African Zoology",
    subtitle: "Terrestrial Vertebrates",
    image: africanZoology,
    description: "Study of terrestrial African vertebrate zoology, including diversity, behaviour, and ecological roles.",
    skills: ["Animal Behaviour", "Taxonomy", "Ecology"],
  },
  {
    id: "demonstrator",
    title: "Lab Demonstrator",
    subtitle: "Teaching & Assessment",
    image: labDemonstrator,
    description: "Guided first-year biology students through lab practicals, invigilated tests, and marked practical assessments.",
    skills: ["Teaching", "Assessment", "Mentorship"],
    icon: <Users size={20} className="text-accent" />,
  },
  {
    id: "physiology",
    title: "Physiology & Adaptation",
    subtitle: "Comparative Biochemistry",
    image: comparativeBiochemistry,
    description: "Comparative study of physiological adaptations in high-altitude populations across Tibetan, Andean, and Ethiopian highlanders.",
    skills: ["Biochemistry", "Genetics", "Physiology"],
    icon: <CloudSun size={20} className="text-accent" />,
    articles: [
      { slug: "altitude-adaptation", title: "Three Ways to Breathe Thin Air" },
    ],
  },
  {
    id: "climate",
    title: "Climate Change Impact",
    subtitle: "Environmental Resilience",
    image: climateChange,
    description: "Investigating the long-term impacts of climate change on local ecosystems and developing strategies for environmental resilience.",
    skills: ["Climate Science", "Data Modelling", "Impact Assessment"],
    icon: <CloudSun size={20} className="text-accent" />,
  },
  {
    id: "sustainability",
    title: "Sustainable Development",
    subtitle: "Future-Proofing",
    image: sustainability,
    description: "Researched sustainable development practices to balance economic growth with environmental preservation.",
    skills: ["Sustainability", "Policy Analysis", "Green Tech"],
    icon: <Leaf size={20} className="text-accent" />,
  },
];

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const title = "Research Projects | Andiswa Masuku - Biological Sciences Researcher";
  const description =
    "Explore Andiswa Masuku's research portfolio, from fieldwork expeditions to laboratory studies in marine conservation, ecology, and GIS.";
  const canonicalUrl = `${SITE_URL}/projects`;
  const ogImage = toAbsoluteUrl(DEFAULT_OG_IMAGE);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Andiswa Masuku research projects" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <Navigation />

      <main className="pt-40 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 text-center"
          >
            <span className="label-spec text-accent block mb-4">Academic Journey</span>
            <h1 className="font-display text-4xl md:text-6xl font-semibold gradient-text mb-4">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A tour through my academic work at <span className="text-accent font-medium">Wits</span> and{" "}
              <span className="text-accent font-medium">UKZN</span> - from fieldwork expeditions to laboratory research.
            </p>
          </motion.div>




          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-20"
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6 flex items-baseline gap-3">
              Fieldwork Projects
              <span className="text-sm font-medium text-accent/80 ml-auto">Wits University</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {fieldworkProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-professional overflow-hidden group h-full flex flex-col"
                >
                  <div
                    className="aspect-video overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(project.image)}
                  >
                    <img
                      src={project.image}
                      alt={`Andiswa Masuku Research - ${project.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {project.icon}
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{project.subtitle}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-primary mb-3">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-6 leading-relaxed flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span key={skill} className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <Link
                        to={project.link}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent font-medium hover:underline group/link"
                      >
                        View Tracking Map
                        <span className="group-hover/link:translate-x-0.5 transition-transform">→</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6">
              Research Areas & Experience
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {researchAreas.map((area, index) => (
                <motion.div
                  key={area.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-professional overflow-hidden group h-full flex flex-col"
                >
                  <div
                    className="aspect-video overflow-hidden cursor-pointer"
                    onClick={() => setSelectedImage(area.image)}
                  >
                    <img
                      src={area.image}
                      alt={`Andiswa Masuku | Scientific Area - ${area.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-xs text-accent uppercase tracking-wider">{area.subtitle}</span>
                    <h3 className="font-display text-lg font-semibold text-primary mb-3 mt-1">{area.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed flex-1">{area.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {area.skills.map((skill) => (
                        <span key={skill} className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
                    {area.articles && area.articles.length > 0 && (
                      <div className="border-t border-border pt-4 mt-auto">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider block mb-2">Research Articles</span>
                        <div className="space-y-1.5">
                          {area.articles.map((article) => (
                            <Link
                              key={article.slug}
                              to={`/projects/articles/${article.slug}`}
                              className="flex items-center gap-2 text-sm text-accent hover:underline group/link"
                            >
                              <span className="truncate">{article.title}</span>
                              <span className="text-accent/50 group-hover/link:translate-x-0.5 transition-transform">→</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-sm text-muted-foreground">
          <span>© 2026 Andiswa Masuku</span>
          <Link to="/" className="hover:text-accent transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-[110]"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <X size={24} />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full screen preview"
                decoding="async"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
