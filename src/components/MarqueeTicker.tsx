

const MarqueeTicker = ({ items = [] }: { items?: string[] }) => {
  const displayItems = items.length > 0 ? items : [
    "Ecology",
    "Data Analysis",
    "Laboratory Science",
    "Conservation",
    "Scientific Communication",
    "Food Security",
    "Nutrition Research",
    "R Programming",
  ];

  const content = displayItems.join(" — ") + " — ";

  return (
    <div className="py-6 border-y border-border overflow-hidden bg-white/50 backdrop-blur-sm">
      <div className="flex animate-marquee whitespace-nowrap">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <span key={i} className="text-sm md:text-base font-medium text-foreground/80 tracking-wider mx-6 uppercase font-display">
            {content}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeTicker;
