import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import ThesisSection from "@/components/sections/ThesisSection";
import EducationSection from "@/components/sections/EducationSection";
import SkillsSection from "@/components/sections/SkillsSection";
import WorkSection from "@/components/sections/WorkSection";
import FooterSection from "@/components/FooterSection";
import CustomCursor from "@/components/CustomCursor";
import WebSiteSchema from "@/components/WebSiteSchema";
import { Helmet } from "react-helmet-async";
import { DEFAULT_OG_IMAGE, SITE_URL, toAbsoluteUrl } from "@/lib/seo";

const Index = () => {
  const title = "Andiswa Masuku | Biological Sciences & Data Analytics Portfolio";
  const description =
    "Andiswa Masuku is a biological sciences researcher specializing in data analytics, spatial analysis (GIS), marine ecology, and sustainable food security.";
  const canonicalUrl = `${SITE_URL}/`;
  const ogImage = toAbsoluteUrl(DEFAULT_OG_IMAGE);

  return (
    <div className="min-h-screen bg-background text-foreground cursor-none md:cursor-none">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Andiswa Masuku — Biological Sciences Researcher" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      <WebSiteSchema />
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
