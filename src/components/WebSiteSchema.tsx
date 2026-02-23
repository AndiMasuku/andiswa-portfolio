import { Helmet } from "react-helmet-async";
import { SITE_URL } from "@/lib/seo";

const WebSiteSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Andiswa Masuku Portfolio",
        "url": SITE_URL,
        "description": "Professional portfolio of Andiswa Masuku — Biological Sciences Researcher specializing in data analytics, spatial analysis, marine ecology, and sustainable food security.",
        "author": {
            "@type": "Person",
            "name": "Andiswa Masuku"
        }
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default WebSiteSchema;
