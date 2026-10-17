import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { prefetchRoute } from "@/lib/prefetch";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <Helmet>
        <title>404 – Page Not Found | Andiswa Masuku</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="text-center space-y-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-9xl text-primary"
        >
          404
        </motion.h1>
        <div className="space-y-2">
          <p className="label-spec text-muted-foreground">PAGE NOT FOUND</p>
          <p className="text-xl text-primary/80">The requested content is unavailable.</p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/"
            onMouseEnter={() => prefetchRoute("/")}
            onTouchStart={() => prefetchRoute("/")}
            onFocus={() => prefetchRoute("/")}
            className="btn-brutal inline-block mt-8"
          >
            RETURN HOME
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
