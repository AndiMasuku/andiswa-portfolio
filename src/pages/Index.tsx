import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ThesisSection from "@/components/sections/ThesisSection";
import EducationSection from "@/components/sections/EducationSection";
import SkillsSection from "@/components/sections/SkillsSection";
import WorkSection from "@/components/sections/WorkSection";
import FooterSection from "@/components/FooterSection";
import CustomCursor from "@/components/CustomCursor";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground cursor-none md:cursor-none">
      <CustomCursor />
      <Navigation />
      <main>
        {/* Above the fold: Who + What they research */}
        <HeroSection />

        {/* Key selling point: The thesis */}
        <ThesisSection />

        {/* Credentials: Education + Skills combined flow */}
        <EducationSection />
        <SkillsSection />

        {/* Supporting info: Work shows character */}
        <WorkSection />

        {/* CTA: Contact */}
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
