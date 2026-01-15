import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  location: string;
  methods: string[];
  image: string;
  category: string;
}

const projects: Project[] = [
  {
    id: "insect-protein",
    title: "Insect Protein Fortification",
    description: "Investigating the nutritional potential and consumer acceptance of insect-based protein fortification in traditional South African foods. This research explores sustainable protein sources to address food security challenges.",
    year: "2024",
    location: "University of KwaZulu-Natal",
    methods: ["Sensory Analysis", "Nutritional Profiling", "Consumer Studies"],
    image: "/placeholder.svg",
    category: "Food Science"
  },
  {
    id: "food-safety",
    title: "Food Safety & Quality Control",
    description: "Comprehensive analysis of food safety protocols in local food processing facilities, focusing on hazard identification and quality assurance implementation.",
    year: "2023",
    location: "Durban, South Africa",
    methods: ["HACCP Analysis", "Microbiological Testing", "Quality Auditing"],
    image: "/placeholder.svg",
    category: "Food Safety"
  },
  {
    id: "fermentation",
    title: "Traditional Fermentation Optimization",
    description: "Optimizing traditional fermentation processes for improved nutritional outcomes while preserving cultural authenticity and flavor profiles.",
    year: "2023",
    location: "KwaZulu-Natal",
    methods: ["Fermentation Science", "Sensory Evaluation", "Nutritional Analysis"],
    image: "/placeholder.svg",
    category: "Food Technology"
  },
  {
    id: "sustainability",
    title: "Sustainable Food Systems",
    description: "Research into sustainable food production methods and their impact on local communities and environmental conservation efforts.",
    year: "2022",
    location: "South Africa",
    methods: ["Environmental Impact Assessment", "Community Research", "Data Analysis"],
    image: "/placeholder.svg",
    category: "Sustainability"
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 nav-glass py-4"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <span className="font-display text-2xl font-semibold text-primary">Projects</span>
          <div className="w-16" />
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto">
          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-primary mb-4">
              Research & Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A collection of research initiatives and projects focused on food science, 
              nutrition, and sustainable food systems.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
              >
                {/* Project Image */}
                <div className="aspect-[16/10] bg-secondary/50 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Project Content */}
                <div className="p-6 md:p-8">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                    {project.category}
                  </span>

                  <h2 className="font-display text-xl md:text-2xl font-semibold text-primary mb-3 group-hover:text-primary/80 transition-colors">
                    {project.title}
                  </h2>

                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {project.year}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {project.location}
                    </span>
                  </div>

                  {/* Methods */}
                  <div className="flex flex-wrap gap-2">
                    {project.methods.map((method) => (
                      <span
                        key={method}
                        className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded-md"
                      >
                        {method}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto flex justify-between items-center text-sm text-muted-foreground">
          <span>© 2024 Andiswa Masuku</span>
          <Link to="/" className="hover:text-primary transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Projects;
