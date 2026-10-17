import { Linkedin } from "lucide-react";
import andiswaPortrait from "@/assets/andiswa-hero.webp";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90svh] lg:min-h-screen flex flex-col lg:block overflow-hidden bg-background">
      <div className="lg:hidden absolute inset-0 z-0">
        <img
          src={andiswaPortrait}
          alt="Andiswa Masuku - Biological Sciences Researcher"
          width={506}
          height={752}
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-full relative z-10 flex flex-col justify-end lg:justify-center min-h-[90svh] lg:min-h-screen pb-12 lg:pb-0 pt-20 lg:pt-0">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">

          <div className="lg:w-[55%] order-2 lg:order-1 space-y-6 mt-auto lg:mt-0">
            <div>
              <h1 className="headline-primary gradient-text text-balance">
                Andiswa Masuku
              </h1>
              <p className="font-display text-xl md:text-2xl text-accent font-semibold mt-2">
                MSc Biological Sciences
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {[
                "Climate & Biodiversity",
                "Spatial Telemetry (GIS)",
                "Sustainable Food Systems",
              ].map((domain) => (
                <span
                  key={domain}
                  className="skill-tag cursor-default"
                >
                  {domain}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="https://www.linkedin.com/in/andiswa-masuku"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Andiswa Masuku on LinkedIn"
                className="btn-outline group min-w-[150px]"
              >
                <Linkedin size={16} strokeWidth={2} className="mr-2" />
                LinkedIn
              </a>
            </div>
          </div>

          <div className="hidden lg:block lg:w-[40%] order-1 lg:order-2">
            <div
              className="relative rounded-2xl overflow-hidden bg-secondary/40"
              style={{ boxShadow: "var(--shadow-xl)" }}
            >
              <img
                src={andiswaPortrait}
                alt="Andiswa Masuku - Professional Biological Sciences Researcher Portrait"
                width={506}
                height={752}
                loading="eager"
                decoding="sync"
                fetchPriority="high"
                className="w-full h-auto max-h-[75vh] object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
