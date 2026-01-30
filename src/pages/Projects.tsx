import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Droplets, Users, Anchor, Navigation } from "lucide-react";
import { Link } from "react-router-dom";

// Import images
import ladumaTracking from "@/assets/laduma-tracking.png";
import marineConservation from "@/assets/marine-conservation.png";
import dnaForensics from "@/assets/dna-forensics.png";
import africanZoology from "@/assets/african-zoology.png";
import labDemonstrator from "@/assets/lab-demonstrator.png";
import communityMap from "/images/community-map.jpeg";
import riverResearch from "/images/river-research.png";

const fieldworkProjects = [
  {
    id: "limpopo",
    title: "Limpopo Conservation Study",
    subtitle: "People & Conservation",
    image: communityMap,
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
    icon: <Navigation size={20} className="text-accent" />,
  },
];

const researchAreas = [
  {
    id: "marine",
    title: "Marine Conservation",
    subtitle: "Fishing & Poaching Impacts",
    image: marineConservation,
    description: "Analysed the effects of reduced fishing and poaching on marine ecosystem recovery and biodiversity in protected areas.",
    skills: ["Marine Ecology", "Conservation", "Data Analysis"],
    icon: <Anchor size={20} className="text-accent" />,
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
    description: "Study of terrestrial African vertebrate zoology, including diversity, behavior, and ecological roles.",
    skills: ["Animal Behavior", "Taxonomy", "Ecology"],
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
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 nav-glass py-4"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
            <span className="text-sm font-medium">Home</span>
          </Link>
          <span className="font-display text-2xl font-semibold gradient-text">Projects</span>
          <div className="w-16" />
        </div>
      </motion.header>

      <main className="pt-32 pb-24 px-6 md:px-12">
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
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-accent"></span>
              Fieldwork Projects
              <span className="text-sm font-normal text-muted-foreground ml-2">Wits University</span>
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {fieldworkProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-professional overflow-hidden group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      {project.icon}
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">{project.subtitle}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-primary mb-3">{project.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.skills.map((skill) => (
                        <span key={skill} className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
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
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-accent"></span>
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
                  className="card-professional overflow-hidden group"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={area.image}
                      alt={area.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs text-accent uppercase tracking-wider">{area.subtitle}</span>
                    <h3 className="font-display text-lg font-semibold text-primary mb-3 mt-1">{area.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{area.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {area.skills.map((skill) => (
                        <span key={skill} className="text-xs px-2 py-1 bg-secondary rounded-full text-muted-foreground">
                          {skill}
                        </span>
                      ))}
                    </div>
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
    </div>
  );
};

export default Projects;