import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import insectProteinImage from "@/assets/project-insect-protein.jpg";
import foodSafetyImage from "@/assets/project-food-safety.jpg";
import sustainabilityImage from "@/assets/project-sustainability.jpg";
interface Project {
  id: string;
  title: string;
  description: string;
  year: string;
  location: string;
  methods: string[];
  video?: string;
  image?: string;
  category: string;
}
const researchVideos = [{
  id: "mopane-worm",
  title: "Mopane Worm Harvesting",
  video: "/videos/mopane-worm-harvesting.mp4",
  description: "Traditional harvesting of mopane worms (Gonimbrasia belina)—one of the indigenous edible insects central to my Honours research. Understanding these harvesting practices informed my thesis on incorporating culturally significant protein sources into bread fortification. Mopane worms are a staple in Southern African diets, providing sustainable protein aligned with regional food traditions."
}, {
  id: "insect-protein",
  title: "Insect Protein Research",
  video: "/videos/project-1.mp4",
  description: "Insect-based products entering mainstream markets—the real-world application of research like mine. My thesis work on bread fortification with termites and mopane worms contributes to this growing field, developing affordable food solutions backed by scientific analysis of texture, color, and nutritional properties."
}, {
  id: "food-safety",
  title: "Food Safety Studies",
  video: "/videos/project-2.mp4",
  description: "Food safety and consumer acceptance are critical to mainstreaming insect-based nutrition. My laboratory work included Texture Profile Analysis, Colourimetry, and Crumb Structure Analysis—all essential for ensuring fortified bread meets quality standards and educating consumers about the benefits of entomophagy."
}];
const fieldworkMedia = [{
  id: "fieldwork-1",
  title: "Field Research Documentation",
  video: "/videos/fieldwork-1.mp4",
  description: "Limpopo field study at Wits, conducting People and Conservation research. Walking transects through communities bordering game reserves, I documented natural resource usage patterns and waste disposal practices to inform land management strategies for conservation areas."
}, {
  id: "fieldwork-2",
  title: "Community Engagement",
  video: "/videos/fieldwork-2.mp4",
  description: "Conservation fieldwork requires understanding both ecosystems and the communities that depend on them. Johannesburg stream ecosystem assessments involved collecting water samples and testing pH levels to evaluate aquatic ecosystem health in urban-adjacent waterways."
}, {
  id: "community-map",
  title: "Community Resource Mapping",
  image: "/images/community-map.jpeg",
  description: "Resource mapping was a key methodology in my Limpopo conservation research. By documenting where communities collect firewood, water, and food resources, I helped create baseline data for sustainable land management—bridging scientific research with community knowledge."
}];
const terrestrialMedia = [{
  id: "terrestrial-1",
  title: "Field Data Collection",
  video: "/videos/marine-research-1.mp4",
  description: "Hands-on specimen collection is foundational to ecological research. During my BSc at Wits, I developed proficiency in wildlife capture and surveying techniques for rodents, birds, and fish—honing skills in species identification and careful handling for population monitoring studies."
}, {
  id: "terrestrial-2",
  title: "Wildlife Monitoring",
  video: "/videos/marine-research-2.mp4",
  description: "Botanical observation complements my zoological training. Understanding plant-animal interactions is essential in Ecology & Conservation—developing biodiversity assessment skills including species identification and documentation of ecological relationships in South African biomes."
}, {
  id: "river-research",
  title: "Ecosystem Assessment",
  image: "/images/river-research.jpeg",
  description: "Aquatic ecosystem assessment during my Johannesburg stream study—wading into waterways to collect samples and organisms, testing water quality parameters to evaluate ecosystem health. This hands-on approach developed my practical skills in field-based environmental monitoring."
}];
const projects: Project[] = [{
  id: "insect-protein",
  title: "Insect Protein Fortification",
  description: "Investigating the nutritional potential and consumer acceptance of insect-based protein fortification in traditional South African foods. This research explores sustainable protein sources to address food security challenges.",
  year: "2024",
  location: "University of KwaZulu-Natal",
  methods: ["Sensory Analysis", "Nutritional Profiling", "Consumer Studies"],
  image: insectProteinImage,
  category: "Food Science"
}, {
  id: "food-safety",
  title: "Food Safety & Quality Control",
  description: "Comprehensive analysis of food safety protocols in local food processing facilities, focusing on hazard identification and quality assurance implementation.",
  year: "2023",
  location: "Durban, South Africa",
  methods: ["HACCP Analysis", "Microbiological Testing", "Quality Auditing"],
  image: foodSafetyImage,
  category: "Food Safety"
}, {
  id: "sustainability",
  title: "Sustainable Food Systems",
  description: "Research into sustainable food production methods and their impact on local communities and environmental conservation efforts.",
  year: "2022",
  location: "South Africa",
  methods: ["Environmental Impact Assessment", "Community Research", "Data Analysis"],
  image: sustainabilityImage,
  category: "Sustainability"
}];
const Projects = () => {
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} className="fixed top-0 left-0 right-0 z-50 nav-glass py-4">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
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
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6
        }} className="mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-semibold text-primary mb-4">
              Research & Projects
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A collection of research initiatives and projects focused on food science, 
              nutrition, and sustainable food systems.
            </p>
          </motion.div>

          {/* Research Videos Section */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6">
              Research Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {researchVideos.map((item, index) => <motion.div key={item.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.3 + index * 0.1
            }} className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300">
                  <div className="aspect-video bg-secondary/50 overflow-hidden">
                    <video src={item.video} className="w-full h-full object-cover" muted loop playsInline onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }} />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-medium text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>

          {/* Fieldwork Media Section */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6">
              Fieldwork & Community Research
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fieldworkMedia.map((item, index) => <motion.div key={item.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.4 + index * 0.1
            }} className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300">
                  <div className="aspect-video bg-secondary/50 overflow-hidden">
                    {item.video ? <video src={item.video} className="w-full h-full object-cover" muted loop playsInline onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }} /> : <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-medium text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>

          {/* Terrestrial Field Experience Section */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.6,
          delay: 0.4
        }} className="mb-16">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6">
              Terrestrial Field Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {terrestrialMedia.map((item, index) => <motion.div key={item.id} initial={{
              opacity: 0,
              y: 20
            }} animate={{
              opacity: 1,
              y: 0
            }} transition={{
              duration: 0.5,
              delay: 0.5 + index * 0.1
            }} className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300">
                  <div className="aspect-video bg-secondary/50 overflow-hidden">
                    {item.video ? <video src={item.video} className="w-full h-full object-cover" muted loop playsInline onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }} /> : <img src={item.image} alt={item.title} className="w-full h-full group-hover:scale-105 transition-transform duration-500 object-contain" />}
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-medium text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>)}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary mb-6">
            Research Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => <motion.article key={project.id} initial={{
            opacity: 0,
            y: 30
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: index * 0.1
          }} className="group bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300">
                {/* Project Media */}
                <div className="aspect-[16/10] bg-secondary/50 overflow-hidden">
                  {project.video ? <video src={project.video} className="w-full h-full object-cover" muted loop playsInline onMouseEnter={e => e.currentTarget.play()} onMouseLeave={e => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }} /> : <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}
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
                    {project.methods.map(method => <span key={method} className="px-2.5 py-1 text-xs bg-secondary text-secondary-foreground rounded-md">
                        {method}
                      </span>)}
                  </div>
                </div>
              </motion.article>)}
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
    </div>;
};
export default Projects;