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
        <HeroSection />
        <ThesisSection />
        <EducationSection />
        <SkillsSection />
        <WorkSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
