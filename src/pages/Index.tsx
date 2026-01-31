import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ThesisSection from "@/components/sections/ThesisSection";
import EducationSection from "@/components/sections/EducationSection";
import SkillsSection from "@/components/sections/SkillsSection";
import WorkSection from "@/components/sections/WorkSection";
import FooterSection from "@/components/FooterSection";
import CustomCursor from "@/components/CustomCursor";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground cursor-none md:cursor-none">
      <Helmet>
        <title>Andiswa Masuku | Biological Sciences & Data Analytics Portfolio</title>
        <meta name="description" content="Portfolio of Andiswa Masuku, a multidisciplinary scientist specializing in biological sciences, data analytics, and sustainable food solutions." />
      </Helmet>
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
