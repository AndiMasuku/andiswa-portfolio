import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ResearchSection from "@/components/sections/ResearchSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import EducationSection from "@/components/sections/EducationSection";
import WorkSection from "@/components/sections/WorkSection";
import FooterSection from "@/components/FooterSection";
import CustomCursor from "@/components/CustomCursor";
import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, SITE_URL, toAbsoluteUrl } from "@/lib/seo";

const Index = () => {
  const title = "Andiswa Masuku | Biological Sciences & Predictive Ecology Portfolio";
  const description =
    "Andiswa Masuku is a biological sciences researcher and MSc student specialising in species distribution modelling, climate resilience, spatial analysis (GIS), and sustainable food security.";
  const canonicalUrl = `${SITE_URL}/`;
  const ogImage = toAbsoluteUrl(DEFAULT_OG_IMAGE);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Andiswa Masuku – Biological Sciences Researcher" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        {/* Skills directly below Hero as requested */}
        <SkillsSection />
        {/* Split Research & Projects into two dedicated sections */}
        <ResearchSection />
        <ProjectsSection />
        <EducationSection />
        <WorkSection />
        <FooterSection />
      </main>
    </div>
  );
};

export default Index;
