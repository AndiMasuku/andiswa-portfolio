import { Helmet } from "react-helmet-async";

const PersonSchema = () => {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Andiswa Masuku",
        "url": "https://andiswa.vercel.app",
        "jobTitle": "Biological Sciences Researcher",
        "alumniOf": [
            {
                "@type": "CollegeOrUniversity",
                "name": "University of the Witwatersrand"
            },
            {
                "@type": "CollegeOrUniversity",
                "name": "University of KwaZulu-Natal"
            }
        ],
        "knowsAbout": [
            "Biological Sciences",
            "Data Analytics",
            "Marine Conservation",
            "Movement Ecology",
            "Spatial Analysis",
            "Sustainable Food Security",
            "R Programming"
        ],
        "sameAs": [
            "https://www.linkedin.com/in/andiswa-masuku"
        ],
        "description": "Andiswa Masuku is a dedicated Biological Sciences Researcher specializing in data-driven research, spatial analysis, and sustainable food security."
    };

    return (
        <Helmet>
            <script type="application/ld+json">
                {JSON.stringify(schema)}
            </script>
        </Helmet>
    );
};

export default PersonSchema;
