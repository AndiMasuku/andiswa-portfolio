import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/seo";

const SiteSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Andiswa Masuku",
    url: SITE_URL,
    inLanguage: "en",
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SiteSchema;
