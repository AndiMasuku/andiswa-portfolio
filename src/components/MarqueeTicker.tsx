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

  const content = displayItems.join(" • ") + " • ";

  return (
    <div className="py-6 border-y border-border overflow-hidden bg-secondary/30">
      <div className="flex whitespace-nowrap animate-marquee" style={{ width: 'max-content' }}>
        {/* Duplicate content for seamless loop */}
        <span className="text-sm md:text-base font-medium text-foreground/80 tracking-wider uppercase font-display">
          {content}
        </span>
        <span className="text-sm md:text-base font-medium text-foreground/80 tracking-wider uppercase font-display">
          {content}
        </span>
      </div>
    </div>
  );
};

export default MarqueeTicker;
