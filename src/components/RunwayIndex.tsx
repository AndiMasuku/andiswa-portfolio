import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface TimelineItem {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  highlight: string;
  type: "research" | "education" | "work";
  description?: string;
}

const timelineData: TimelineItem[] = [
  {
    id: "01",
    title: "UKZN Honours Research",
    subtitle: "BSc Honours in Biological Sciences",
    year: "2025",
    highlight: "Thesis: Insect Protein Fortification",
    type: "research",
    description: "Investigating how bread fortified with indigenous edible insects (Termitomyces) can address Protein-Energy Malnutrition. Using texture analysis, colourimetry, and R programming for statistical validation.",
  },
  {
    id: "02",
    title: "Wits University",
    subtitle: "BSc in Biological Sciences",
    year: "2017 - 2020",
    highlight: "Merit Award: Animal Behaviour",
    type: "education",
    description: "Majors in Ecology & Conservation, Organismal Biology. Field studies in Limpopo (community conservation) and Johannesburg (stream ecosystem health). Top performer in Ethology.",
  },
  {
    id: "03",
    title: "Procter & Gamble",
    subtitle: "Analytics Intern",
    year: "2022",
    highlight: "Data analysis for Sub-Saharan Africa",
    type: "work",
    description: "Analysed market trends and consumer insights to support regional strategy. Used Excel for data visualisation and presented findings to regional leadership.",
  },
  {
    id: "04",
    title: "Afrishore BPO",
    subtitle: "Client Services & Operations Specialist",
    year: "2023 - 2025",
    highlight: "Employee of the Year 2023",
    type: "work",
    description: "Managed high-volume client operations while completing studies. Recognized for exceptional performance and team mentorship.",
  },
];

const RunwayIndex = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedItem, setSelectedItem] = useState<TimelineItem | null>(null);

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "research": return "RESEARCH";
      case "education": return "EDUCATION";
      case "work": return "EXPERIENCE";
      default: return "";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "research": return "text-emerald-600";
      case "education": return "text-blue-600";
      case "work": return "text-amber-600";
      default: return "";
    }
  };

  return (
    <section id="work" className="py-24 px-6 md:px-12 relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mb-16"
      >
        <span className="label-spec">TIMELINE</span>
        <h2 className="font-display text-4xl md:text-6xl text-primary mt-4">
          Journey So Far
        </h2>
      </motion.div>

      <div className="relative">
        {timelineData.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className={`border-t border-border py-6 md:py-8 cursor-pointer transition-all duration-200 ease-out group ${hoveredIndex === index ? "bg-primary" : ""
              }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => setSelectedItem(item)}
          >
            <div className="grid grid-cols-12 items-center gap-4">
              <div
                className={`col-span-2 md:col-span-1 label-spec transition-colors duration-200 ${getTypeColor(item.type)} ${hoveredIndex === index ? "text-primary-foreground" : ""
                  }`}
              >
                {getTypeLabel(item.type)}
              </div>
              <div className="col-span-7 md:col-span-4">
                <h3
                  className={`title-index transition-all duration-200 ${hoveredIndex === index
                    ? "text-primary-foreground translate-x-2"
                    : "text-primary"
                    }`}
                >
                  {item.title}
                </h3>
                <span className="md:hidden block text-xs mt-1 text-muted-foreground group-hover:text-primary-foreground/80">
                  {item.subtitle}
                </span>
              </div>
              <div className="col-span-3 hidden md:block">
                <p
                  className={`label-spec transition-colors duration-200 ${hoveredIndex === index ? "text-primary-foreground/70" : ""
                    }`}
                >
                  {item.subtitle}
                </p>
              </div>
              <div className="col-span-12 md:col-span-2 hidden md:block">
                <p
                  className={`text-sm transition-colors duration-200 ${hoveredIndex === index
                    ? "text-primary-foreground/70"
                    : "text-muted-foreground"
                    }`}
                >
                  {item.highlight}
                </p>
              </div>
              <div className="col-span-3 md:col-span-2 text-right">
                <span
                  className={`label-spec transition-colors duration-200 ${hoveredIndex === index ? "text-primary-foreground" : ""
                    }`}
                >
                  {item.year}
                </span>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="border-t border-border" />
      </div>

      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-2xl p-8 md:p-12 bg-background border-border">
          {selectedItem && (
            <>
              <DialogHeader>
                <span className={`label-spec mb-2 ${getTypeColor(selectedItem.type)}`}>
                  {getTypeLabel(selectedItem.type)} - {selectedItem.year}
                </span>
                <DialogTitle className="font-display text-3xl md:text-4xl text-primary mb-2">
                  {selectedItem.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-primary/80 font-medium mb-4">
                  {selectedItem.subtitle}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div>
                  <h4 className="label-spec mb-2 text-muted-foreground">HIGHLIGHT</h4>
                  <p className="text-foreground font-medium">{selectedItem.highlight}</p>
                </div>
                <div>
                  <h4 className="label-spec mb-2 text-muted-foreground">DETAILS</h4>
                  <p className="text-muted-foreground leading-relaxed text-justify">
                    {selectedItem.description}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RunwayIndex;
